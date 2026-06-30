using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AtelierPascaleWebsite.Models;
using AtelierPascaleWebsite.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;


namespace AtelierPascaleWebsite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public AuthenticationController(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Email and password are required.");
            }

            var passwordHasher = new PasswordHasher<User>();

            var userAccount = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (userAccount == null || passwordHasher.VerifyHashedPassword(userAccount, userAccount.PasswordHash, request.Password) != PasswordVerificationResult.Success)
            {
                return Unauthorized("Invalid email or password.");
            }

            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var key = _configuration["Jwt:Key"];
            var tokenValidityInMinutes = _configuration.GetValue<int>("Jwt:Token:TokenValidityInMinutes");
            var tokenExpiryTimeStamp = DateTime.UtcNow.AddMinutes(tokenValidityInMinutes);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userAccount.Id.ToString()),
                new Claim(ClaimTypes.Email, userAccount.Email), 
                new Claim(ClaimTypes.Role, userAccount.Role)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = issuer,
                Audience = audience,
                Subject = new ClaimsIdentity(claims),
                Expires = tokenExpiryTimeStamp,
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(securityToken);

            return Ok(new LoginResponse
            {
                Email = userAccount.Email,
                AccessToken = accessToken,
                ExpiresIn = tokenValidityInMinutes

            });
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] User request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Email and password are required.");
            }
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existingUser != null)
            {
                return Conflict("A user with this email already exists.");
            }
            var passwordHasher = new PasswordHasher<User>();
            var hashedPassword = passwordHasher.HashPassword(null, request.Password);
            var newUser = new User
            {
                Email = request.Email,
                PasswordHash = hashedPassword,
                Role = "User" // Default role
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok("User registered successfully.");
        }


    }
