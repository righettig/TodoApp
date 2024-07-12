using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Models;
using Services;

namespace Extensions;

public static class ServiceExtensions
{
    public static void ConfigureServices(this IServiceCollection services, WebApplicationBuilder builder)
    {
        // Register the in-memory database context
        //services.AddDbContext<TodoContext>(opt =>
        //    opt.UseInMemoryDatabase("TodoList"));

        // Configure Cosmos DB
        services.AddDbContext<TodoContext>(options =>
            options.UseCosmos(
                builder.Configuration[AppKeys.Endpoint],
                builder.Configuration[AppKeys.PrimaryKey],
                builder.Configuration[AppKeys.DatabaseName]
            ));

        // Register application services
        services.AddSingleton<IGuidProvider, GuidProvider>();
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

        // Add controllers
        services.AddControllers();
    }

    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Version = "v1" });
        });
    }
}