namespace Extensions;

public static class MiddlewareExtensions
{
    public static void ConfigureDevelopmentMiddleware(this WebApplication app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API v1"));
    }

    public static void ConfigureCommonMiddleware(this WebApplication app)
    {
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();
    }
}