namespace Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow() => DateTime.UtcNow;
}