namespace Services;

public interface IDateTimeProvider
{
    DateTime UtcNow();
}