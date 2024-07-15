using Models;

namespace Repositories;

public interface ITodoItemRepository
{
    Task<IEnumerable<TodoItem>> GetAllAsync();
    Task<TodoItem> GetByIdAsync(string id);
    Task AddAsync(TodoItem todoItem);
    Task UpdateAsync(TodoItem todoItem);
    Task DeleteAsync(string id);
    Task<bool> ExistsAsync(string id);
}
