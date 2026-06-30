namespace AtelierPascaleWebsite.Models
{
    public class LoginResponse
    {
        public string Email { get; set; } = string.Empty;
        public string AccessToken { get; set; } = string.Empty;

        public int ExpiresIn { get; set; } 
    }
}
