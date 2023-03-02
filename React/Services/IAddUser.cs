using React.Entities;

namespace React.Services
{
    public interface IAddUser
    {
        Task AddNewUserAsync(NewUser newUser);
    }
}