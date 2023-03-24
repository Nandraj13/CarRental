using React.Entities;

namespace React.Services
{
    public interface IAddVehicle
    {
        Task<bool> AddNewVehicleAsync(Vehicle vehicle);
    }
}
