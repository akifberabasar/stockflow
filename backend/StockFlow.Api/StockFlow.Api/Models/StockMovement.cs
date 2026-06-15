namespace StockFlow.Api.Models
{
    public enum MovementType { In = 1, Out = 2 }

    public class StockMovement
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public MovementType Type { get; set; }
        public int Quantity { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}