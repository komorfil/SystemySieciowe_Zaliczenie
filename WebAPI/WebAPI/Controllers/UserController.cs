using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class UserController : ApiController
    {
        private readonly IConfiguration _config;
        private readonly UserContext _context;

        public UserController(IConfiguration config, UserContext context)
        {
            _config = config;
            _context = context;
        }

        public UserController() { }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/User/CreateUser")]
        public IHttpActionResult Create(User user)
        {
            if (user == null)
            {
                return BadRequest("Invalid user data.");
            }

            if (string.IsNullOrEmpty(user.Email))
            {
                return BadRequest("Email is required.");
            }

            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return Ok("Already exists");
            }

            user.MemberSince = DateTime.Now;
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok("Success");
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/User/LoginUser")]
        public IHttpActionResult Login(Login user)
        {
            var userAvailable = _context.Users.FirstOrDefault(u => u.Email == user.Email && u.Pwd == user.Pwd);
            if (userAvailable != null)
            {
                return Ok("Success");
            }
            return Ok("Failure");
        }
    }
}