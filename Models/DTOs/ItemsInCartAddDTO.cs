namespace AtelierPascaleWebsite.Models.DTOs
{
    public class ItemsInCartAddDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; } = 1;
        public int ShoppingCartId { get; set; }
    }
}
