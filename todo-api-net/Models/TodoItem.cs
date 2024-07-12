using Newtonsoft.Json;

namespace Models;

public class TodoItem
{
    [JsonProperty(PropertyName = "id")]
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
}
