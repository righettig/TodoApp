using Extensions;

var builder = WebApplication.CreateBuilder(args);

// Configure services using extension methods
builder.Services.ConfigureServices();
builder.Services.ConfigureSwagger();

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.ConfigureDevelopmentMiddleware();
}

app.ConfigureCommonMiddleware();

app.Run();
