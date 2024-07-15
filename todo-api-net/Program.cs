#region Controller-based API

using Extensions;

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

#endregion

#region Minimal API

//using Extensions;

//var builder = WebApplication.CreateBuilder(args);

//// Configure services using extension methods
//builder.Services.ConfigureServices(builder, useMinimalApi: true);
//builder.Services.ConfigureSwagger();

//var app = builder.Build();

//// Configure middleware & init database
//if (app.Environment.IsDevelopment())
//{
//    app.ConfigureDevelopmentMiddleware();

//    await app.ConfigureDatabase();
//}

//app.ConfigureCommonMiddleware(useMinimalApi: true);

//// Register endpoints
//app.MapTodoItemsEndpoints();

//app.Run();

#endregion