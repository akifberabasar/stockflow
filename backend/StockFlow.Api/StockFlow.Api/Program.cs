using Microsoft.EntityFrameworkCore;
using StockFlow.Api.Data;
using StockFlow.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// EF Core + MSSQL bağlantısı
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Frontend'in (Next.js) API'ye erişebilmesi için CORS
builder.Services.AddCors(options =>
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();

app.UseCors("Frontend");

// Basit test endpoint'i — API ayakta mı diye kontrol için
app.MapGet("/", () => "StockFlow API çalışıyor!");
app.MapProductEndpoints();
app.MapLookupEndpoints();
app.Run();