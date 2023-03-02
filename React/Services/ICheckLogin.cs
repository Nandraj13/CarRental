using React.Entities;

namespace React.Services
{
    public interface ICheckLogin
    {
        Task<bool> CheckForLogin(LoginDetails loginDetails);
    }
}