//using Bookafe.Data;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace Bookafe.Repositories
//{
//    public class CustomUserRepo
//    {
//        ApplicationDbContext _context;

//        public CustomUserRepo(ApplicationDbContext context)
//        {
//            this._context = context;
//        }

//        public CustomUser GetUser(string userName)
//        {
//            CustomUser customUser = this._context.customUsers
//                                        .Where(u => u.UserName == userName)
//                                        .FirstOrDefault();
//            if (customUser == null)
//            {
//                customUser = new CustomUser();
//                customUser.UserName = userName;
//            }
//            return customUser;
//        }
//    }
//}
