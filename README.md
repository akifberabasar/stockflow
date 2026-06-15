# 📦 StockFlow — Kurumsal Envanter Yönetim Sistemi

Modern bir full-stack stok/envanter yönetim uygulaması. Ürünleri, kategorileri ve tedarikçileri yönetir; stok seviyelerini takip eder ve düşük stok uyarıları gösterir. Gerçek bir şirketin kullanabileceği şekilde tasarlandı.

## 🛠️ Teknoloji Yığını

**Backend**
- .NET 8 Minimal API (C#)
- Entity Framework Core 8 (Code-First)
- MSSQL (SQL Server Express)

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v4

**Mimari:** Monorepo (tek repoda `frontend` + `backend`)

## ✨ Özellikler

- Ürün listeleme (responsive: masaüstünde tablo, mobilde kart görünümü)
- Canlı arama (ürün adı ve SKU'ya göre anlık filtreleme)
- Ürün ekleme, düzenleme ve silme (tam CRUD)
- Dinamik kategori ve tedarikçi seçimi (API'den çekilir)
- Düşük stok uyarıları (kritik eşik altındaki ürünler işaretlenir)
- Özet panel (toplam ürün, toplam stok değeri, düşük stok sayısı)
- Veritabanı seed verisi (ilk kurulumda örnek ürünler)

## 📁 Proje Yapısı

```
stockflow/
├── backend/
│   └── StockFlow.Api/
│       └── StockFlow.Api/
│           ├── Models/        # Entity sınıfları (Product, Category, Supplier, StockMovement)
│           ├── Data/          # AppDbContext + seed verisi
│           ├── Endpoints/     # Minimal API endpoint grupları
│           ├── Migrations/    # EF Core migration'ları
│           └── Program.cs
└── frontend/
    └── src/
        ├── app/               # App Router sayfaları (panel, ürünler, ürün formu)
        ├── lib/               # API client + ProductContext
        └── types/             # TypeScript tip tanımları
```

## 🚀 Kurulum

### Önkoşullar
- .NET 8 SDK
- Node.js 20+
- SQL Server Express + SSMS

### Backend

```bash
cd backend/StockFlow.Api/StockFlow.Api
```

`appsettings.json` içindeki bağlantı dizesini kendi SQL Server örneğine göre düzenle:

```json
"ConnectionStrings": {
  "Default": "Server=localhost\\SQLEXPRESS;Database=StockFlowDB;Trusted_Connection=True;TrustServerCertificate=True"
}
```

Veritabanını oluştur ve API'yi başlat:

```bash
dotnet ef database update
dotnet run
```

API varsayılan olarak `https://localhost:7246` üzerinde çalışır.

### Frontend

```bash
cd frontend
npm install
```

`frontend` kök dizininde `.env.local` dosyası oluştur:

```
NEXT_PUBLIC_API_URL=https://localhost:7246/api
```

Geliştirme sunucusunu başlat:

```bash
npm run dev
```

Uygulama `http://localhost:3000` üzerinde açılır.

> **Not:** Backend ve frontend aynı anda çalışıyor olmalıdır.

## 🔌 API Endpoint'leri

| Metot | Adres | Açıklama |
|-------|-------|----------|
| GET | `/api/products` | Tüm ürünler |
| GET | `/api/products/{id}` | Tek ürün |
| GET | `/api/products/low-stock` | Düşük stoktaki ürünler |
| POST | `/api/products` | Yeni ürün ekle |
| PUT | `/api/products/{id}` | Ürün güncelle |
| DELETE | `/api/products/{id}` | Ürün sil |
| GET | `/api/categories` | Kategori listesi |
| GET | `/api/suppliers` | Tedarikçi listesi |

## 🗺️ Yol Haritası

- [ ] JWT tabanlı kimlik doğrulama + rol bazlı yetkilendirme
- [ ] Stok hareketi kaydı (giriş/çıkış geçmişi)
- [ ] Grafiklerle raporlama
- [ ] Sayfalama (pagination)
- [ ] Docker ile dağıtım

## 📄 Lisans

MIT
