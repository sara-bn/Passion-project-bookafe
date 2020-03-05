using Bookafe.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bookafe.Data
{

    public class List
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string bookTitle { get; set; }
        public bool IsComplete { get; set; }
        public string userEmail { get; set; }

        public virtual WebUser WebUser { get; set; }
    }

    public class WebUser
    {
        [Key]
        [Display(Name = "User Name")]
        public string UserName { get; set; }

        public virtual ICollection<List> Lists { get; set; }

    }
        public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        public DbSet<List> Lists { get; set; }
        public DbSet<WebUser> WebUsers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // required.
            base.OnModelCreating(modelBuilder);

            //-------------------------------------------------------
            // *** Define composite primary keys here. ***

            // This is sample syntax for defining a primary key.
            // modelBuilder.Entity<ProductSupplier>()
            //             .HasKey(ps => new { ps.ProductID, ps.SupplierID });

            //-------------------------------------------------------
            // *** Define composite foreign keys here. ***
            modelBuilder.Entity<List>()
                .HasOne(c => c.WebUser)
                .WithMany(c => c.Lists)
                .HasForeignKey(fk => new { fk.userEmail })
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete
        }
    }

}