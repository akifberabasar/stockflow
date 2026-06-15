using Microsoft.EntityFrameworkCore;
using StockFlow.Api.Models;

namespace StockFlow.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Supplier> Suppliers => Set<Supplier>();
        public DbSet<StockMovement> StockMovements => Set<StockMovement>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // SKU benzersiz olsun (aynı stok kodundan iki ürün olamaz)
            modelBuilder.Entity<Product>()
                .HasIndex(p => p.Sku)
                .IsUnique();

            // Fiyat hassasiyeti (18 basamak, 2 ondalık)
            modelBuilder.Entity<Product>()
                .Property(p => p.UnitPrice)
                .HasPrecision(18, 2);

            // Tedarikçi silinince ürünleri silme (kısıtla)
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Supplier)
                .WithMany(s => s.Products)
                .OnDelete(DeleteBehavior.Restrict);

            // --- Başlangıç verisi (Seed Data) ---

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Elektronik", Description = "Elektronik ürünler" },
                new Category { Id = 2, Name = "Ofis", Description = "Ofis malzemeleri" },
                new Category { Id = 3, Name = "Mobilya", Description = "Ofis mobilyaları" }
            );

            modelBuilder.Entity<Supplier>().HasData(
                new Supplier { Id = 1, Name = "TeknoTed A.Ş.", ContactEmail = "info@teknoted.com", Phone = "0212 555 0101" },
                new Supplier { Id = 2, Name = "Kırtasiye Dünyası", ContactEmail = "satis@kirtasiyedunyasi.com", Phone = "0216 555 0202" },
                new Supplier { Id = 3, Name = "Konfor Mobilya", ContactEmail = "info@konformobilya.com", Phone = "0312 555 0303" }
            );

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Sku = "ELK-001", Name = "Kablosuz Mouse", UnitPrice = 249.90m, QuantityInStock = 120, ReorderLevel = 30, CategoryId = 1, SupplierId = 1, CreatedAt = new DateTime(2025, 1, 1) },
                new Product { Id = 2, Sku = "ELK-002", Name = "Mekanik Klavye", UnitPrice = 899.00m, QuantityInStock = 14, ReorderLevel = 20, CategoryId = 1, SupplierId = 1, CreatedAt = new DateTime(2025, 1, 1) },
                new Product { Id = 3, Sku = "OFS-001", Name = "A4 Fotokopi Kağıdı (500'lü)", UnitPrice = 89.50m, QuantityInStock = 340, ReorderLevel = 50, CategoryId = 2, SupplierId = 2, CreatedAt = new DateTime(2025, 1, 1) },
                new Product { Id = 4, Sku = "OFS-002", Name = "Toplantı Kalemi (12'li)", UnitPrice = 45.00m, QuantityInStock = 8, ReorderLevel = 25, CategoryId = 2, SupplierId = 2, CreatedAt = new DateTime(2025, 1, 1) },
                new Product { Id = 5, Sku = "MOB-001", Name = "Ergonomik Ofis Sandalyesi", UnitPrice = 3450.00m, QuantityInStock = 22, ReorderLevel = 10, CategoryId = 3, SupplierId = 3, CreatedAt = new DateTime(2025, 1, 1) },
                new Product { Id = 6, Sku = "MOB-002", Name = "Ayarlanabilir Masa", UnitPrice = 5200.00m, QuantityInStock = 5, ReorderLevel = 8, CategoryId = 3, SupplierId = 3, CreatedAt = new DateTime(2025, 1, 1) }
            );
        }
    }
}