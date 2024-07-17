using Controllers;
using Microsoft.Azure.Cosmos;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Extensions;

public static class MiddlewareExtensions
{
    public static void ConfigureDevelopmentMiddleware(this WebApplication app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API v1"));
        app.UseDeveloperExceptionPage();
    }

    public static void ConfigureCommonMiddleware(this WebApplication app, bool useMinimalApi = false)
    {
        app.UseCors("AllowAll");
        app.UseHttpsRedirection();

        if (!useMinimalApi) 
        {
            app.UseAuthorization();
            app.MapControllers();
        }

        app.MapHub<TodoItemsHub>("/todoItemsHub");
    }

    public static async Task ConfigureDatabase(this WebApplication app)
    {
        var configuration = app.Configuration;
        var endpointUri = configuration[AppKeys.Endpoint];
        var primaryKey = configuration[AppKeys.PrimaryKey];
        var cosmosClient = new CosmosClient(endpointUri, primaryKey);

        string databaseId = "todoapp";
        string containerId = "todos";

        try
        {
            // Create database and container if they do not exist
            var database = await cosmosClient.CreateDatabaseIfNotExistsAsync(databaseId);
            Console.WriteLine($"Created Database: {database.Database.Id}\n");

            var container = await database.Database.CreateContainerIfNotExistsAsync(containerId, "/Id");
            Console.WriteLine($"Created Container: {container.Container.Id}\n");

            using var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var context = serviceScope.ServiceProvider.GetService<TodoContext>();

            await InitializeDataAsync(container.Container, context);
        }
        catch (CosmosException ex)
        {
            Console.WriteLine($"Cosmos DB Error: {ex.Message}");
        }
    }

    private static async Task InitializeDataAsync(Container container, TodoContext context)
    {
        // Ensure database is created
        await context.Database.EnsureCreatedAsync();

        // Add initial data
        if (await context.TodoItems.CountAsync() == 0)
        {
            var now = DateTime.UtcNow;

            var initialItems = new List<TodoItem>
                {
                    new() { Id = "1", Title = "Buy groceries", Description = "Milk, Bread, Cheese", CreatedAt = now },
                    new() { Id = "2", Title = "Call mom", Description = "Check in with mom", CreatedAt = now },
                    new() { Id = "3", Title = "Complete homework", Description = "Finish math exercises", CreatedAt = now }
                };

            context.TodoItems.AddRange(initialItems);
            await context.SaveChangesAsync();
            Console.WriteLine("Initial data inserted.");
        }
        else
        {
            Console.WriteLine("Initial data already exists.");
        }
    }
}
