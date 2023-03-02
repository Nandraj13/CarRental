using React.Entities;

namespace React.Services
{
    public interface IAddUser
    {
        Task<bool> AddNewUserAsync(NewUser newUser);
    }
}