namespace AtelierPascaleWebsite.Models.DTOs
{
    public class ItemsInCartDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; } = 0;
        public string ProductImageUrl { get; set; } = string.Empty;

    }
}


