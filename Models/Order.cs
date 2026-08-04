namespace AtelierPascaleWebsite.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public ICollection<ItemInOrder> OrderItems { get; set; } = new List<ItemInOrder>();

    }
}
