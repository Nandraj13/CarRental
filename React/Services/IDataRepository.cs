using MongoDB.Bson;

namespace React.Services
{
    public interface IDataRepository<T>
    {
        Task<bool> AddAsync(T entity);
        Task DeleteAsync(ObjectId id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetNotApprovedAsync();
        Task<T> GetByIdAsync(ObjectId id);
        Task UpdateAsync(ObjectId id, T entity);
        Task<IEnumerable<T>> GetAllByIdAsync(ObjectId id);
        Task<IEnumerable<T>> GetAllByEmailAsync(string mail);
        Task<T> GetByEailAsync(string mail);

    }
}