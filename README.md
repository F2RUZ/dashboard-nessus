Dashboard-Nessus
Ilg'or Tizim Boshqaruvi Paneli (Next.js 14 + RTK Query + FSD Architecture)

Dashboard-Nessus — bu Next.js 14 (App Router) asosida yaratilgan, Redux Toolkit Query (RTK Query) bilan to‘liq integratsiyalashgan, Feature-Sliced Design (FSD) arxitekturasiga ega, zamonaviy va to‘liq responsiv boshqaruv paneli (Dashboard) ilovasidir.

Loyiha yuqori scalability, modularity va maintainability talablariga mos ravishda ishlab chiqilgan.

✨ Asosiy Texnologiyalar Steki
Texnologiya	Maqsadi
Next.js 14	Server Components, App Router, zamonaviy render strategiyalari
MUI Joy UI	Figma darajasidagi zamonaviy UI komponentlar
Redux Toolkit / RTK Query	Global state boshqaruvi + caching & invalidation
Feature-Sliced Design (FSD)	Kodni qatlamlarga bo‘lib boshqarish va kengaytirish
Recharts	Interaktiv grafiklar va analitika diagrammalari
🏗️ Arxitektura: Feature-Sliced Design (FSD)

Loyiha to‘liq FSD me’morchiligida qurilgan. Bu yirik jamoaviy loyihalarda ishlashni osonlashtiradi va kodni boshqarishni samarali qiladi.

FSD Qatlamlari:
Qatlam	Vazifa	Joylashuvi
app/	Ilovani ishga tushirish, provayderlar, layoutlar	src/app
shared/	Reusable funksiyalar, UI, hooks, utils	src/shared
entities/	Ma’lumot modullari (User, Product va boshqalar)	src/entities
features/	Foydalanuvchi bajaradigan funktsiyalar (login, profile, settings)	src/features
widgets/	Murakkab UI bloklar (Sidebar, Header, Profile-Card)	src/widgets
⚙️ O‘rnatish va Ishga Tushirish
Talablar

Node.js v18+

npm yoki yarn

🔧 1. Loyihani klonlash
git clone [LOYIHA_URL]
cd dashboard-nessus

📦 2. Bog‘liqliklarni o‘rnatish
npm install
# yoki
yarn install

🔐 3. Muhit sozlamalari (.env.local)

Loyihaning ildizida .env.local yarating:

NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1


Profil va sozlamalar ma'lumotlari LocalStorage orqali saqlanadi.

▶️ 4. Loyihani ishga tushirish
npm run dev
# yoki
yarn dev


Keyin brauzerda oching:

👉 http://localhost:3000

📈 Analitika: Asosiy Ko‘rsatkichlar (KPI)

feature/analytics bo‘limi Recharts asosida qurilgan bo‘lib, tizimning sog‘lig‘i va o‘sish dinamikasini ko‘rsatadi.

🔹 1. Oyma-oy foydalanuvchi o‘sishi (Line Chart)

Yangi ro‘yxatdan o‘tgan foydalanuvchilar vs faol foydalanuvchilar.

🔹 2. Auditoriya taqsimoti (Pie Chart)

Jinslar bo‘yicha demografik taqsimot.

✅ Loyiha Xususiyatlari
1. Ilg‘or Ma’lumot Boshqaruvi

RTK Query Caching

Optimistic Updates

Auto-refetching & invalidation

2. Modern UI/UX

To‘liq responsiv dizayn

Mobil qurilmalarda Drawer Sidebar

Dark / Light Mode orqali oson theming

Snackbar orqali toast xabarlari

📁 Loyihaning Minimal Strukturasi
src/
 ├── app/
 ├── shared/
 ├── entities/
 ├── features/
 ├── widgets/
 └── pages/

🧑‍💻 Muallif

Dashboard-Nessus — zamonaviy dashboard arxitekturasining real joriy etilishi.
Loyiha kengaytiriladigan, barqaror va yuqori samaradorlikka ega boshqaruv panelini yaratish uchun mo‘ljallangan.