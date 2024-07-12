using Microsoft.EntityFrameworkCore;

namespace Models;

// InMemory
//public class TodoContext : DbContext
//{
//    public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

//    public DbSet<TodoItem> TodoItems { get; set; }
//}

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
    {
    }

    public DbSet<TodoItem> TodoItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configuration for the model (e.g., entity relationships) can be placed here
        modelBuilder.Entity<TodoItem>().ToContainer("todos");
        modelBuilder.Entity<TodoItem>().HasPartitionKey(t => t.Id);
    }
}
