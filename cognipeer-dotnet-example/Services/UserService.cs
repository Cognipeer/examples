using Cognipeer.DotNetExample.Models;

namespace Cognipeer.DotNetExample.Services;

public interface IUserService
{
    Task<List<User>> GetAllUsersAsync();
    Task<User?> GetUserByIdAsync(int id);
    Task<User> CreateUserAsync(CreateUserRequest request);
    Task<User?> UpdateUserAsync(int id, UpdateUserRequest request);
    Task<bool> DeleteUserAsync(int id);
}

public class UserService : IUserService
{
    private readonly List<User> _users = new();
    private int _nextId = 1;

    public UserService()
    {
        // Add some sample data
        _users.Add(new User { Id = _nextId++, Name = "John Doe", Email = "john@example.com" });
        _users.Add(new User { Id = _nextId++, Name = "Jane Smith", Email = "jane@example.com" });
        _users.Add(new User { Id = _nextId++, Name = "Bob Johnson", Email = "bob@example.com" });
    }

    public async Task<List<User>> GetAllUsersAsync()
    {
        await Task.Delay(100); // Simulate async operation
        return _users.Where(u => u.IsActive).ToList();
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        await Task.Delay(50); // Simulate async operation
        return _users.FirstOrDefault(u => u.Id == id && u.IsActive);
    }

    public async Task<User> CreateUserAsync(CreateUserRequest request)
    {
        await Task.Delay(100); // Simulate async operation
        
        var user = new User
        {
            Id = _nextId++,
            Name = request.Name,
            Email = request.Email,
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };

        _users.Add(user);
        return user;
    }

    public async Task<User?> UpdateUserAsync(int id, UpdateUserRequest request)
    {
        await Task.Delay(100); // Simulate async operation
        
        var user = _users.FirstOrDefault(u => u.Id == id && u.IsActive);
        if (user == null)
            return null;

        if (request.Name != null)
            user.Name = request.Name;
        
        if (request.Email != null)
            user.Email = request.Email;
        
        if (request.IsActive.HasValue)
            user.IsActive = request.IsActive.Value;

        return user;
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        await Task.Delay(100); // Simulate async operation
        
        var user = _users.FirstOrDefault(u => u.Id == id && u.IsActive);
        if (user == null)
            return false;

        user.IsActive = false;
        return true;
    }
} 