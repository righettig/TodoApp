using Extensions;
using Models;

var builder = WebApplication.CreateBuilder(args);

// Configure services using extension methods
builder.Services.ConfigureServices(builder);
builder.Services.ConfigureSwagger();

var app = builder.Build();

// Configure middleware & init database
if (app.Environment.IsDevelopment())
{
    app.ConfigureDevelopmentMiddleware();

    await app.ConfigureDatabase();
}

app.ConfigureCommonMiddleware();

app.Run();
