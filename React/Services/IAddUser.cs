using React.Entities;

namespace React.Services
{
    public interface IAddUser
    {
        Task<bool> AddNewUserAsync(NewUser newUser);
        Task<NewUser> GetUserByEmail(string email);
        Task<bool> UpdateUserByEmail(string email, NewUser user);
        Task<bool> CheckUser(string email);
    }
}