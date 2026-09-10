# Moliyam

Shaxsiy moliya nazorati — kirim/chiqim, hisoblar, qarzlar, magazin, kredit,
byudjet, maqsadlar, hisobotlar. To'liq oflayn ishlaydi, ma'lumotlar faqat
foydalanuvchi kompyuterida saqlanadi.

## Windows ilovasini olish

Yig'ish GitHub Actions'da avtomatik bajariladi:
**Actions → Windows EXE yasash → Artifacts → Moliyam-Windows**

Yoki **Releases** sahifasidan tayyor `.exe` ni yuklab oling.

Batafsil qadam-baqadam qo'llanma: [QOLLANMA.md](QOLLANMA.md)

## Papka tarkibi

| Fayl | Vazifasi |
|------|----------|
| `index.html` | Ilovaning o'zi — bitta faylli, tashqi kutubxonasiz |
| `main.js` | Electron oynasi (contextIsolation + sandbox yoqilgan) |
| `package.json` | electron-builder sozlamalari (nsis + portable) |
| `icon.ico` | Ilova belgisi |
| `.github/workflows/build-windows.yml` | Avtomatik yig'ish |

## Lokal ishga tushirish (ixtiyoriy)

Node.js 20+ o'rnatilgan bo'lsa:

```bash
npm install
npm start        # ilovani ochish
npm run dist     # dist/ papkasida EXE yasash (faqat Windows'da)
```

## Ma'lumotlar

`C:\Users\<siz>\AppData\Roaming\Moliyam`

Ilova ichidagi **Zaxira nusxa (JSON)** funksiyasidan muntazam foydalaning.
