using Bookafe.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookafe.Repositories
{
    public class WebUserRepo
    {
        ApplicationDbContext _context;

        public WebUserRepo(ApplicationDbContext context)
        {
            this._context = context;
        }

        public WebUser GetUser(string userName)
        {
            WebUser customUser = this._context.WebUsers
                                        .Where(u => u.UserName == userName)
                                        .FirstOrDefault();
            if (customUser == null)
            {
                customUser = new WebUser();
                customUser.UserName = userName;
            }
            return customUser;
        }
    }
}
