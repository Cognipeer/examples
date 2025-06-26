using Microsoft.AspNetCore.Mvc;
using Cognipeer.DotNetExample.Models;
using Cognipeer.DotNetExample.Services;

namespace Cognipeer.DotNetExample.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    /// <summary>
    /// Get all active users
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<User>>>> GetUsers()
    {
        try
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(ApiResponse<List<User>>.SuccessResponse(users, "Users retrieved successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<List<User>>.ErrorResponse("An error occurred while retrieving users", new List<string> { ex.Message }));
        }
    }

    /// <summary>
    /// Get a specific user by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<User>>> GetUser(int id)
    {
        try
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound(ApiResponse<User>.ErrorResponse($"User with ID {id} not found"));
            }

            return Ok(ApiResponse<User>.SuccessResponse(user, "User retrieved successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<User>.ErrorResponse("An error occurred while retrieving the user", new List<string> { ex.Message }));
        }
    }

    /// <summary>
    /// Create a new user
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ApiResponse<User>>> CreateUser(CreateUserRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.Name))
            {
                return BadRequest(ApiResponse<User>.ErrorResponse("Name is required"));
            }

            if (string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(ApiResponse<User>.ErrorResponse("Email is required"));
            }

            var user = await _userService.CreateUserAsync(request);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, ApiResponse<User>.SuccessResponse(user, "User created successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<User>.ErrorResponse("An error occurred while creating the user", new List<string> { ex.Message }));
        }
    }

    /// <summary>
    /// Update an existing user
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<User>>> UpdateUser(int id, UpdateUserRequest request)
    {
        try
        {
            var user = await _userService.UpdateUserAsync(id, request);
            if (user == null)
            {
                return NotFound(ApiResponse<User>.ErrorResponse($"User with ID {id} not found"));
            }

            return Ok(ApiResponse<User>.SuccessResponse(user, "User updated successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<User>.ErrorResponse("An error occurred while updating the user", new List<string> { ex.Message }));
        }
    }

    /// <summary>
    /// Delete a user (soft delete)
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<bool>>> DeleteUser(int id)
    {
        try
        {
            var success = await _userService.DeleteUserAsync(id);
            if (!success)
            {
                return NotFound(ApiResponse<bool>.ErrorResponse($"User with ID {id} not found"));
            }

            return Ok(ApiResponse<bool>.SuccessResponse(true, "User deleted successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<bool>.ErrorResponse("An error occurred while deleting the user", new List<string> { ex.Message }));
        }
    }
} 