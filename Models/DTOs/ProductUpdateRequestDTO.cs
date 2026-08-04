namespace AtelierPascaleWebsite.Models.DTOs
{
    public class ProductUpdateRequestDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int categoryId { get; set; }
    }
}
