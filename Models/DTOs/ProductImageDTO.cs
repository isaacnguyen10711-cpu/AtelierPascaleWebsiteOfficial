namespace AtelierPascaleWebsite.Models.DTOs
{
    public class ProductImageDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; } 
        public string ImageUrl { get; set; } = string.Empty;
    }
}
