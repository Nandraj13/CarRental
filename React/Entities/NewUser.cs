using System.ComponentModel.DataAnnotations;

namespace React.Entities
{
    public class NewUser
    {
        public object _id;
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        [Required] public string UserName { get; set; }

        [Required] public string Contact { get; set; }

    }
}
