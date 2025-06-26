using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Cognipeer.DotNetExample.Models;
using Cognipeer.DotNetExample.Services;

namespace Cognipeer.DotNetExample.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoodController : ControllerBase
    {
        // Global variables - BAD!
        public static List<string> global_data = new List<string>();
        public static int counter = 0;
        
        // No dependency injection - BAD!
        private UserService userService = new UserService();
        
        // Hardcoded connection string - BAD!
        private string connString = "Server=localhost;Database=test;User Id=sa;Password=123456;";
        
        // Synchronous operations in async context - BAD!
        [HttpGet("getusers")]
        public ActionResult getusers()
        {
            try
            {
                // Blocking call in async context - BAD!
                var users = userService.GetAllUsersAsync().Result;
                
                // Magic numbers - BAD!
                if (users.Count > 100)
                {
                    return BadRequest("too many users");
                }
                
                // Inconsistent naming - BAD!
                var result = new { data = users, count = users.Count, timestamp = DateTime.Now };
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Swallowing exceptions - BAD!
                return StatusCode(500, "error");
            }
        }
        
        // No input validation - BAD!
        [HttpPost("createuser")]
        public ActionResult createuser([FromBody] object request)
        {
            // No validation at all - BAD!
            var user = new User();
            
            // Using dynamic - BAD!
            dynamic req = request;
            user.Name = req.name;
            user.Email = req.email;
            
            // Direct database access in controller - BAD!
            using (var conn = new SqlConnection(connString))
            {
                conn.Open();
                var cmd = new SqlCommand($"INSERT INTO Users (Name, Email) VALUES ('{user.Name}', '{user.Email}')", conn);
                cmd.ExecuteNonQuery();
            }
            
            // Inconsistent response format - BAD!
            return Ok(new { success = true, user = user });
        }
        
        // Mixed concerns - BAD!
        [HttpGet("complexoperation")]
        public ActionResult complexoperation(int id, string name, bool active)
        {
            // Business logic in controller - BAD!
            if (id <= 0)
            {
                return BadRequest("invalid id");
            }
            
            // Hardcoded business rules - BAD!
            if (name.Length < 3)
            {
                return BadRequest("name too short");
            }
            
            // Side effects - BAD!
            global_data.Add(name);
            counter++;
            
            // Complex nested logic - BAD!
            var result = new Dictionary<string, object>();
            if (active)
            {
                if (counter > 10)
                {
                    result["status"] = "overloaded";
                    result["data"] = null;
                }
                else
                {
                    result["status"] = "ok";
                    result["data"] = new { id, name, active, counter };
                }
            }
            else
            {
                result["status"] = "inactive";
                result["data"] = new { id, name, active };
            }
            
            // Thread.Sleep in web request - BAD!
            Thread.Sleep(1000);
            
            return Ok(result);
        }
        
        // No error handling - BAD!
        [HttpDelete("deleteuser/{id}")]
        public ActionResult deleteuser(int id)
        {
            // No null checks - BAD!
            var user = userService.GetUserByIdAsync(id).Result;
            
            // Direct property access without validation - BAD!
            user.IsActive = false;
            
            // No confirmation - BAD!
            return Ok("deleted");
        }
        
        // Security vulnerabilities - BAD!
        [HttpPost("unsafe")]
        public ActionResult unsafe([FromBody] string sql)
        {
            // SQL Injection vulnerability - BAD!
            using (var conn = new SqlConnection(connString))
            {
                conn.Open();
                var cmd = new SqlCommand(sql, conn);
                var result = cmd.ExecuteScalar();
                return Ok(result);
            }
        }
        
        // Memory leaks - BAD!
        [HttpGet("memoryleak")]
        public ActionResult memoryleak()
        {
            // Creating objects without disposal - BAD!
            for (int i = 0; i < 1000; i++)
            {
                var conn = new SqlConnection(connString);
                conn.Open();
                // Never closing connection - BAD!
            }
            
            return Ok("done");
        }
        
        // Inconsistent async/await - BAD!
        [HttpGet("mixedasync")]
        public async Task<ActionResult> mixedasync()
        {
            // Mixing sync and async - BAD!
            var users = userService.GetAllUsersAsync().Result;
            
            await Task.Delay(100);
            
            // Blocking in async method - BAD!
            Thread.Sleep(50);
            
            return Ok(users);
        }
        
        // No authorization - BAD!
        [HttpPost("admin")]
        public ActionResult admin()
        {
            // No authentication check - BAD!
            return Ok("admin access granted");
        }
        
        // XSS vulnerability - BAD!
        [HttpPost("xss")]
        public ActionResult xss([FromBody] string input)
        {
            // No HTML encoding - BAD!
            return Content($"<script>alert('{input}')</script>", "text/html");
        }
        
        // Race condition - BAD!
        [HttpPost("race")]
        public ActionResult race()
        {
            // Shared state without synchronization - BAD!
            counter++;
            var current = counter;
            
            // Simulate race condition
            Thread.Sleep(100);
            
            if (current != counter)
            {
                return Ok("race condition detected");
            }
            
            return Ok(current);
        }
    }
} 