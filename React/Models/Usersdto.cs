using System.ComponentModel.DataAnnotations;

namespace React.Models
{
    public class Usersdto
    {
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string contact { get; set; }
    }
}
