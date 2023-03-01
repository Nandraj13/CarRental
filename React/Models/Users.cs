using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace React.Models
{
    public class Users
    {
        [JsonIgnore]
       public  int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string contact { get; set; }

    }
}
