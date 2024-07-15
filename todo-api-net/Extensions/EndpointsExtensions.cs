using Models;
using Repositories;
using Services;

namespace Extensions;

// This is only needed when using the minimal API approach
public static class EndpointsExtensions
{
    public static void MapTodoItemsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("api/TodoItems", async (ITodoItemRepository repository) =>
        {
            var todoItems = await repository.GetAllAsync();
            return Results.Ok(todoItems);
        });

        endpoints.MapGet("api/TodoItems/{id}", async (string id, ITodoItemRepository repository) =>
        {
            var todoItem = await repository.GetByIdAsync(id);
            return todoItem is not null ? Results.Ok(todoItem) : Results.NotFound();
        });

        endpoints.MapPost("api/TodoItems", async (AddTodoItemDTO todoItemDTO, ITodoItemRepository repository, IGuidProvider guidProvider, IDateTimeProvider dateTimeProvider) =>
        {
            var todoItem = new TodoItem
            {
                Id = guidProvider.NewGuid().ToString(),
                Title = todoItemDTO.Title,
                Description = todoItemDTO.Description,
                CreatedAt = dateTimeProvider.UtcNow()
            };

            await repository.AddAsync(todoItem);
            return Results.Created($"/api/TodoItems/{todoItem.Id}", todoItem);
        });

        endpoints.MapPut("api/TodoItems/{id}", async (string id, TodoItem todoItem, ITodoItemRepository repository, IDateTimeProvider dateTimeProvider) =>
        {
            if (id != todoItem.Id)
            {
                return Results.BadRequest();
            }

            todoItem.ModifiedAt = dateTimeProvider.UtcNow();

            try
            {
                await repository.UpdateAsync(todoItem);
                return Results.NoContent();
            }
            catch (Exception)
            {
                if (!await repository.ExistsAsync(id))
                {
                    return Results.NotFound();
                }
                throw;
            }
        });

        endpoints.MapDelete("api/TodoItems/{id}", async (string id, ITodoItemRepository repository) =>
        {
            if (!await repository.ExistsAsync(id))
            {
                return Results.NotFound();
            }

            await repository.DeleteAsync(id);
            return Results.NoContent();
        });
    }
}