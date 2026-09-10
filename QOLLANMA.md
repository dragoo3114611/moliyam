# Moliyam — GitHub orqali Windows ilova (.exe) yasash

Bu papkani GitHub'ga yuklaysiz, GitHub o'zi Windows serverida ilovani yig'ib beradi
va tayyor `.exe` faylni sizga yuklab olish uchun chiqaradi. Kompyuteringizga
Node.js yoki boshqa dastur o'rnatish shart emas.

---

## 1-qadam. GitHub'da repozitoriy ochish

1. https://github.com saytiga kiring (akkaunt bo'lmasa — ro'yxatdan o'ting).
2. O'ng yuqoridagi **+** → **New repository**.
3. **Repository name**: `moliyam`
4. **Private** ni tanlang (kod boshqalarga ko'rinmaydi — tavsiya qilaman).
5. Pastdagi **Create repository** tugmasi.

---

## 2-qadam. Fayllarni yuklash

Bo'sh repozitoriy sahifasida **uploading an existing file** havolasini bosing
(yoki **Add file → Upload files**).

Shu papkadagi hamma narsani sudrab tashlang:

```
index.html          ← ilovaning o'zi
main.js
package.json
icon.ico
.gitignore
QOLLANMA.md
README.md
.github/workflows/build-windows.yml   ← eng muhimi
```

> **Diqqat:** brauzer orqali yuklaganda `.github` papkasi ba'zan tushib qoladi.
> Yuklab bo'lgach repozitoriyda `.github/workflows/build-windows.yml` bor-yo'qligini
> tekshiring. Yo'q bo'lsa: **Add file → Create new file**, nom joyiga
> `.github/workflows/build-windows.yml` deb yozing va shu faylning matnini
> ichiga nusxalab qo'ying.

Pastda **Commit changes** tugmasini bosing.

---

## 3-qadam. Yig'ilishni kutish

1. Repozitoriyning yuqorisidagi **Actions** bo'limiga o'ting.
2. "Windows EXE yasash" nomli ish o'zi ishga tushgan bo'ladi (sariq nuqta).
3. 3–6 daqiqa kuting. Yashil ✔ paydo bo'lsa — tayyor.

Agar ishga tushmasa: **Actions** → chapdan "Windows EXE yasash" → o'ngdan
**Run workflow** → **Run workflow**.

---

## 4-qadam. EXE'ni yuklab olish

Yashil ✔ bo'lgan ishni bosing → sahifaning eng pastida **Artifacts** bo'limi →
**Moliyam-Windows** ni bosing. ZIP tushadi, ichida ikkita fayl:

| Fayl | Nima qiladi |
|------|-------------|
| `Moliyam-1.0.0-nsis.exe` | O'rnatuvchi. Ishga tushirsangiz Program Files'ga o'rnatadi, ish stoliga yorliq qo'yadi. |
| `Moliyam-1.0.0-portable.exe` | O'rnatishsiz. Fleshkadan ham ishlaydi, ikki marta bosdingiz — ochildi. |

> Windows "Windows protected your PC" degan ko'k oyna chiqarishi mumkin —
> bu imzo (code signing sertifikati) sotib olinmaganligi uchun.
> **More info → Run anyway** deysiz. Sertifikat yiliga ~$200 turadi, shaxsiy
> foydalanish uchun shart emas.

---

## 5-qadam (ixtiyoriy). Release yasash

Har safar Actions ichiga kirib yuklab o'tirmaslik uchun teg qo'ying —
EXE avtomatik **Releases** sahifasiga chiqadi va doimiy havola bo'ladi:

Repozitoriyda **Releases** → **Create a new release** → **Choose a tag** →
`v1.0.0` deb yozib **Create new tag** → **Publish release**.

Bir necha daqiqadan keyin shu release ichida `.exe` fayllar paydo bo'ladi.

---

## Ilovani yangilash (eng muhimi)

Ilovada o'zgarish qilganingizda **faqat `index.html` ni almashtirasiz**:

1. Repozitoriyda `index.html` faylini bosing.
2. O'ng yuqoridagi qalam ✏️ yonidagi **⋯ → Delete file** → **Commit**.
   (yoki **Add file → Upload files** bilan yangi `index.html` ni tashlang —
   bir xil nomdagi fayl ustiga yoziladi.)
3. `package.json` dagi `"version": "1.0.0"` ni `"1.0.1"` ga o'zgartiring.
4. Actions o'zi yangi EXE yasaydi.

Foydalanuvchi yangi EXE'ni o'rnatsa, eski ma'lumotlari **o'chmaydi** —
ular alohida papkada turadi (pastga qarang).

---

## Ma'lumotlar qayerda saqlanadi?

```
C:\Users\<foydalanuvchi>\AppData\Roaming\Moliyam
```

Ilovadagi menyu: **Yordam → Ma'lumotlar qayerda saqlanadi?** → *Papkani ochish*.

Muhim:
- Brauzerdagi (HTML fayldan ochgandagi) ma'lumotlar bu yerga **o'zi ko'chmaydi**.
  Brauzerda **Zaxira nusxa (JSON)** ni yuklab oling, EXE'da esa **tiklash** qiling.
- Har hafta bir marta JSON zaxira olib, uni Google Drive/Telegramga tashlab qo'ying.
- Windows'ni qayta o'rnatsangiz `AppData\Roaming\Moliyam` papkasini nusxalab qo'ying.

---

## Tez-tez uchraydigan xatolar

**Actions'da "Resource not accessible by integration" / 403**
Settings → Actions → General → *Workflow permissions* → **Read and write permissions**
→ Save. Keyin ishni qayta ishga tushiring.

**Actions'da hech narsa yo'q**
`.github/workflows/build-windows.yml` fayli yuklanmagan yoki papka nomi noto'g'ri.
Nom aynan `.github` (nuqta bilan) bo'lishi kerak.

**"npm install" xatosi**
Odatda internet vaqtinchalik uzilishi. **Re-run all jobs** tugmasini bosing.

**Ilova oq ekran ko'rsatyapti**
`index.html` to'liq yuklanmagan (fayl katta — 288 KB). Qayta yuklang va
repozitoriyda fayl hajmi ~281 KB ekanini tekshiring.

**Antivirus EXE'ni o'chirib yubordi**
Imzosiz Electron ilovalarida bo'ladigan holat. Antivirusga istisno qo'shing yoki
o'rnatuvchi (`nsis`) variantidan foydalaning.
