using Microsoft.EntityFrameworkCore;
using StockFlow.Api.Data;
using StockFlow.Api.Models;

namespace StockFlow.Api.Endpoints
{
    public static class ProductEndpoints
    {
        public static void MapProductEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/api/products");

            // Tüm ürünler (kategori + tedarikçi adıyla birlikte)
            group.MapGet("/", async (AppDbContext db) =>
                await db.Products
                    .Include(p => p.Category)
                    .Include(p => p.Supplier)
                    .Select(p => new
                    {
                        p.Id,
                        p.Sku,
                        p.Name,
                        p.UnitPrice,
                        p.QuantityInStock,
                        p.ReorderLevel,
                        CategoryName = p.Category!.Name,
                        SupplierName = p.Supplier!.Name
                    })
                    .ToListAsync());

            // Tek ürün
            group.MapGet("/{id:int}", async (int id, AppDbContext db) =>
                await db.Products.FindAsync(id) is Product p
                    ? Results.Ok(p)
                    : Results.NotFound());

            // Yeni ürün ekle
            group.MapPost("/", async (ProductCreateDto dto, AppDbContext db) =>
            {
                var product = new Product
                {
                    Sku = dto.Sku,
                    Name = dto.Name,
                    UnitPrice = dto.UnitPrice,
                    QuantityInStock = dto.QuantityInStock,
                    ReorderLevel = dto.ReorderLevel,
                    CategoryId = dto.CategoryId,
                    SupplierId = dto.SupplierId
                };
                db.Products.Add(product);
                await db.SaveChangesAsync();
                return Results.Created($"/api/products/{product.Id}", product);
            });

            // Ürün güncelle
            group.MapPut("/{id:int}", async (int id, Product input, AppDbContext db) =>
            {
                var p = await db.Products.FindAsync(id);
                if (p is null) return Results.NotFound();

                p.Sku = input.Sku;
                p.Name = input.Name;
                p.UnitPrice = input.UnitPrice;
                p.QuantityInStock = input.QuantityInStock;
                p.ReorderLevel = input.ReorderLevel;
                p.CategoryId = input.CategoryId;
                p.SupplierId = input.SupplierId;

                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            // Ürün sil
            group.MapDelete("/{id:int}", async (int id, AppDbContext db) =>
            {
                var p = await db.Products.FindAsync(id);
                if (p is null) return Results.NotFound();

                db.Products.Remove(p);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            // Düşük stoktaki ürünler
            group.MapGet("/low-stock", async (AppDbContext db) =>
                await db.Products
                    .Where(p => p.QuantityInStock <= p.ReorderLevel)
                    .ToListAsync());
        }
    }

    public record ProductCreateDto(
        string Sku,
        string Name,
        decimal UnitPrice,
        int QuantityInStock,
        int ReorderLevel,
        int CategoryId,
        int SupplierId
    );
}