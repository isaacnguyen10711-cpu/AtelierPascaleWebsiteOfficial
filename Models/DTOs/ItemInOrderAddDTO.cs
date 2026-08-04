namespace AtelierPascaleWebsite.Models.DTOs
{
    public class ItemInOrderAddDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int Quantity { get; set; }
        public decimal PriceAtPurchase { get; set; }
    }
}
