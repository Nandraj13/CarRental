using React.Entities;

namespace React.Services
{
    public interface IManageVehicle
    {
        Task<bool> AddNewVehicleAsync(Vehicle vehicle);
        Task<List<Vehicle>> GetVehicleByUserEmailAsync(string UserEmail);
    }
}
