using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories;

public class TodoItemRepository : ITodoItemRepository
{
    private readonly TodoContext _context;

    public TodoItemRepository(TodoContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TodoItem>> GetAllAsync()
    {
        return await _context.TodoItems.ToListAsync();
    }

    public async Task<TodoItem> GetByIdAsync(string id)
    {
        return await _context.TodoItems.FindAsync(id);
    }

    public async Task AddAsync(TodoItem todoItem)
    {
        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TodoItem todoItem)
    {
        _context.Entry(todoItem).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(string id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem != null)
        {
            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(string id)
    {
        return await _context.TodoItems.CountAsync(e => e.Id == id) > 0;
    }
}
