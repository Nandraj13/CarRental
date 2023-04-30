using System.ComponentModel.DataAnnotations;

namespace React.Entities
{
    public class PasswordDto
    {
        [Required]
        public string Password { get; set; }
    }
}
