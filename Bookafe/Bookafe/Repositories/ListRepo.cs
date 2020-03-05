using Bookafe.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bookafe.Repositories
{
    public class ListRepo
    {
        ApplicationDbContext _context;

        public ListRepo(ApplicationDbContext context)
        {
            this._context = context;
        }

        public bool Create(List list, WebUser webUser)
        {
            List newInvoice = new List
            {
                Id = list.Id,
                bookTitle = list.bookTitle,
                IsComplete = list.IsComplete,
                userEmail = webUser.UserName
            };
            _context.Lists.Add(newInvoice);
            _context.SaveChanges();
            return true;
        }
    }
}
