using Microsoft.EntityFrameworkCore;
using StockFlow.Api.Data;

namespace StockFlow.Api.Endpoints
{
    public static class LookupEndpoints
    {
        public static void MapLookupEndpoints(this WebApplication app)
        {
            app.MapGet("/api/categories", async (AppDbContext db) =>
                await db.Categories
                    .Select(c => new { c.Id, c.Name })
                    .ToListAsync());

            app.MapGet("/api/suppliers", async (AppDbContext db) =>
                await db.Suppliers
                    .Select(s => new { s.Id, s.Name })
                    .ToListAsync());
        }
    }
}