namespace AtelierPascaleWebsite.Models.DTOs
{
    public class ItemsInOrderResponseDTO
    {
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int Quantity { get; set; }
        public decimal PriceAtPurchase { get; set; }
    }
}
