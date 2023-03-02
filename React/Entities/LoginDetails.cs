using System.ComponentModel.DataAnnotations;

namespace React.Entities
{
    public class LoginDetails
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
