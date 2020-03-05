using Microsoft.EntityFrameworkCore.Migrations;

namespace Bookafe.Data.Migrations
{
    public partial class addcustomusertableagain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_customUsers",
                table: "customUsers");

            migrationBuilder.RenameTable(
                name: "customUsers",
                newName: "CustomUsers");

            migrationBuilder.AlterColumn<string>(
                name: "userEmail",
                table: "Lists",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomUsers",
                table: "CustomUsers",
                column: "UserName");

            migrationBuilder.CreateIndex(
                name: "IX_Lists_userEmail",
                table: "Lists",
                column: "userEmail");

            migrationBuilder.AddForeignKey(
                name: "FK_Lists_CustomUsers_userEmail",
                table: "Lists",
                column: "userEmail",
                principalTable: "CustomUsers",
                principalColumn: "UserName",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lists_CustomUsers_userEmail",
                table: "Lists");

            migrationBuilder.DropIndex(
                name: "IX_Lists_userEmail",
                table: "Lists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomUsers",
                table: "CustomUsers");

            migrationBuilder.RenameTable(
                name: "CustomUsers",
                newName: "customUsers");

            migrationBuilder.AlterColumn<string>(
                name: "userEmail",
                table: "Lists",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_customUsers",
                table: "customUsers",
                column: "UserName");
        }
    }
}
