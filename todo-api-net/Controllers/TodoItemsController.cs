using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Models;
using Repositories;
using Services;

namespace Controllers;

[Route("api/[controller]")]
[ApiController]
public class TodoItemsController : ControllerBase
{
    private readonly ITodoItemRepository _repository;
    private readonly IGuidProvider _guidProvider;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IHubContext<TodoItemsHub> _hubContext;

    public TodoItemsController(
        ITodoItemRepository repository,
        IGuidProvider guidProvider,
        IDateTimeProvider dateTimeProvider,
        IHubContext<TodoItemsHub> hubContext)
    {
        _repository = repository;
        _guidProvider = guidProvider;
        _dateTimeProvider = dateTimeProvider;
        _hubContext = hubContext;
    }

    // GET: api/TodoItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
    {
        var todoItems = await _repository.GetAllAsync();
        return Ok(todoItems);
    }

    // GET: api/TodoItems/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(string id)
    {
        var todoItem = await _repository.GetByIdAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        return Ok(todoItem);
    }

    // POST: api/TodoItems
    [HttpPost]
    public async Task<ActionResult<TodoItem>> PostTodoItem(AddTodoItemDTO todoItemDTO)
    {
        var todoItem = new TodoItem
        {
            Id = _guidProvider.NewGuid().ToString(),
            Title = todoItemDTO.Title,
            Description = todoItemDTO.Description,
            CreatedAt = _dateTimeProvider.UtcNow()
        };

        await _repository.AddAsync(todoItem);

        // Notify all connected clients
        await _hubContext.Clients.All.SendAsync("PostTodoItem", todoItem);

        return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
    }

    // PUT: api/TodoItems/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTodoItem(string id, TodoItem todoItem)
    {
        if (id != todoItem.Id)
        {
            return BadRequest();
        }

        todoItem.ModifiedAt = _dateTimeProvider.UtcNow();

        try
        {
            await _repository.UpdateAsync(todoItem);
        }
        catch (Exception)
        {
            if (!await _repository.ExistsAsync(id))
            {
                return NotFound();
            }
            throw;
        }

        // Notify all connected clients
        await _hubContext.Clients.All.SendAsync("PutTodoItem", todoItem);

        return NoContent();
    }

    // DELETE: api/TodoItems/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(string id)
    {
        if (!await _repository.ExistsAsync(id))
        {
            return NotFound();
        }

        await _repository.DeleteAsync(id);

        // Notify all connected clients
        await _hubContext.Clients.All.SendAsync("DeleteTodoItem", id);

        return NoContent();
    }
}
