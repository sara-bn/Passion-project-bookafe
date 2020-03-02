//using System;
//using System.Collections.Generic;
//using System.IdentityModel.Tokens.Jwt;
//using System.Linq;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;
//using Bookafe.Data;
//using Bookafe.ViewModels;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.IdentityModel.Tokens;
//using Newtonsoft.Json.Linq;

//namespace Bookafe.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class LoginController : Controller
//    {
//        private readonly SignInManager<IdentityUser> _signInManager;
//        private IConfiguration _config;
//        private IServiceProvider _serviceProvider;
//        private ApplicationDbContext _context;

//        public LoginController(SignInManager<IdentityUser> signInManager,
//                                IConfiguration config,
//                                IServiceProvider serviceProvider,
//                                ApplicationDbContext context)
//        {
//            _signInManager = signInManager;
//            _config = config;
//            _serviceProvider = serviceProvider;
//            _context = context;
//        }

//        [HttpPost]
//        public async Task<JsonResult> OnPostAsync([FromBody]LoginVM loginVM)
//        {
//            dynamic jsonResponse = new JObject();
//            if (ModelState.IsValid)
//            {
//                var result = await
//                            _signInManager.PasswordSignInAsync(loginVM.Email.ToUpper(),
//                            loginVM.Password, loginVM.RememberMe, lockoutOnFailure: true);
//                if (result.Succeeded)
//                {
//                    var UserManager = _serviceProvider
//                        .GetRequiredService<UserManager<IdentityUser>>();
//                    var user = await UserManager.FindByEmailAsync(loginVM.Email);

//                    if (user != null)
//                    {
//                        var tokenString = GenerateJSONWebToken(user);
//                        jsonResponse.token = tokenString;
//                        jsonResponse.status = "OK";
//                        return Json(jsonResponse);
//                    }
//                }
//                else if (result.IsLockedOut)
//                {
//                    jsonResponse.token = "";
//                    jsonResponse.status = "Locked Out";
//                    return Json(jsonResponse);
//                }
//            }
//            jsonResponse.token = "";
//            jsonResponse.status = "Invalid Login";
//            return Json(jsonResponse);
//        }

//        string GenerateJSONWebToken(IdentityUser user)
//        {
//            var securityKey
//                = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
//            var credentials
//                = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
//            var claims = new List<Claim> {
//                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
//                new Claim(JwtRegisteredClaimNames.Jti,
//                            Guid.NewGuid().ToString()),
//                new Claim(ClaimTypes.NameIdentifier, user.Id)
//            };


//            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
//    _config["Jwt:Issuer"],
//    claims,
//    expires: DateTime.Now.AddMinutes(120),
//    signingCredentials: credentials);
//            return new JwtSecurityTokenHandler().WriteToken(token);

//        }
//    }
//}
