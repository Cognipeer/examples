# Cognipeer .NET Core Example

Bu proje, Cognipeer ile entegrasyon için hazırlanmış bir .NET Core Web API örneğidir. Modern API tasarım prensiplerini kullanarak kullanıcı yönetimi işlemlerini gerçekleştiren bir REST API sunar.

## 🚀 Özellikler

- **RESTful API**: Tam CRUD operasyonları ile kullanıcı yönetimi
- **Modern .NET 9**: En güncel .NET sürümü ile geliştirilmiş
- **OpenAPI/Swagger**: Otomatik API dokümantasyonu
- **CORS Desteği**: Cross-origin istekler için yapılandırılmış
- **Hata Yönetimi**: Tutarlı hata yanıtları
- **Async/Await**: Asenkron operasyonlar
- **Dependency Injection**: Modern DI container kullanımı

## 📋 Gereksinimler

- .NET 9.0 SDK veya üzeri
- Visual Studio 2022 veya VS Code
- PowerShell veya Command Prompt

## 🛠️ Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd cognipeer-dotnet-example
```

2. Bağımlılıkları yükleyin:
```bash
dotnet restore
```

3. Projeyi çalıştırın:
```bash
dotnet run
```

4. Tarayıcınızda aşağıdaki adresleri ziyaret edin:
   - API: https://localhost:7001
   - Swagger UI: https://localhost:7001/swagger

## 📚 API Endpoints

### Kullanıcı İşlemleri

| HTTP Method | Endpoint | Açıklama |
|-------------|----------|----------|
| GET | `/api/users` | Tüm aktif kullanıcıları listele |
| GET | `/api/users/{id}` | Belirli bir kullanıcıyı getir |
| POST | `/api/users` | Yeni kullanıcı oluştur |
| PUT | `/api/users/{id}` | Kullanıcı bilgilerini güncelle |
| DELETE | `/api/users/{id}` | Kullanıcıyı sil (soft delete) |

### Örnek İstekler

#### Kullanıcı Oluşturma
```bash
curl -X POST "https://localhost:7001/api/users" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Ahmet Yılmaz",
       "email": "ahmet@example.com"
     }'
```

#### Kullanıcıları Listeleme
```bash
curl -X GET "https://localhost:7001/api/users"
```

#### Kullanıcı Güncelleme
```bash
curl -X PUT "https://localhost:7001/api/users/1" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Ahmet Yılmaz Güncellendi",
       "email": "ahmet.yilmaz@example.com"
     }'
```

## 🏗️ Proje Yapısı

```
cognipeer-dotnet-example/
├── Controllers/          # API Controller'ları
│   └── UsersController.cs
├── Models/              # Veri modelleri
│   ├── User.cs
│   └── ApiResponse.cs
├── Services/            # İş mantığı servisleri
│   └── UserService.cs
├── Properties/          # Proje özellikleri
├── Program.cs           # Uygulama giriş noktası
├── appsettings.json     # Uygulama ayarları
└── README.md           # Bu dosya
```

## 🔧 Geliştirme

### Yeni Endpoint Ekleme

1. `Models/` klasöründe gerekli model sınıflarını oluşturun
2. `Services/` klasöründe iş mantığını implement edin
3. `Controllers/` klasöründe controller oluşturun
4. `Program.cs` dosyasında servisi register edin

### Test Etme

```bash
# Projeyi test modunda çalıştır
dotnet test

# Belirli testleri çalıştır
dotnet test --filter "Category=Integration"
```

## 🌐 Cognipeer Entegrasyonu

Bu API, Cognipeer ile entegrasyon için hazırlanmıştır. Aşağıdaki özellikler Cognipeer entegrasyonu için optimize edilmiştir:

- **Tutarlı API Yanıtları**: `ApiResponse<T>` wrapper'ı ile standart yanıt formatı
- **Hata Yönetimi**: Detaylı hata mesajları ve HTTP status kodları
- **CORS Desteği**: Frontend uygulamalarından erişim için yapılandırılmış
- **Async Operasyonlar**: Yüksek performans için asenkron işlemler

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için issue açabilir veya doğrudan iletişime geçebilirsiniz. 