# NEXENCE — Haute Parfumerie & Luxury Fragrances

An international luxury fragrance e-commerce web application inspired by prestigious perfume houses, featuring cinematic GSAP scroll-triggered 6-bottle animations, real physical packaging photography, 3D cursor-tracking flacons, and a full-stack shopping and admin experience.

---

## 💎 Official Brand Identity

- **Company**: NEXENCE
- **Industry**: Luxury perfumes and fragrances
- **Main Message**: *"Experience luxury redefined through fragrances crafted from ingredients sourced across the globe."*
- **Brand Monogram**: Interlocking **NE** luxury monogram visible on official perfume packaging
- **Official Contact**: `info@nexence.in`
- **Color Palette**:
  - **Cream (`#F4EDE0`)**: Primary background across all pages
  - **Navy (`#14213D`)**: Typography, sticky navigation, headers, dark editorial accents
  - **Coral (`#FF6B5B`)**: Interactive buttons, badges, highlights, and CTAs
  - **Gold (`#C5A059`)**: Monogram framing, luxury details, and olfactory accents

---

## 🌸 The Six Official Perfumes

Every perfume in the collection is supplied in **100 ml / 3.4 fl. oz.** Eau de Parfum concentration, with authentic product photography showcasing both the outer packaging box and the luxury glass bottle:

1. **NexWorld Infinity — 100 ml / 3.4 fl. oz.** (AED 129)
   - *Brand*: NE
   - *Bottle*: Transparent turquoise/blue glass flacon with black NE monogram
   - *Cap*: Silver metallic cap
   - *Packaging*: Bright blue box with dark typography
   - *Olfactory Family*: Boundless ocean horizon & crisp marine breeze
   - *Notice*: The authentic product name **NexWorld Infinity** is preserved exactly as printed on the physical bottle and box.

2. **Zoya — 100 ml / 3.4 fl. oz.** (AED 139)
   - *Brand*: NE / Nexence Collection
   - *Bottle*: Transparent pink glass flacon with gold NE monogram
   - *Cap*: Large spherical pink cap
   - *Packaging*: Light cream/pink box with gold details
   - *Olfactory Family*: Radiant blush floras & soft vanilla

3. **Nexdesire — 100 ml / 3.4 fl. oz.** (AED 141)
   - *Brand*: NE
   - *Bottle*: Deep purple glass flacon with gold NE monogram
   - *Cap*: Metallic gold cylindrical cap
   - *Packaging*: Purple box with gold details
   - *Olfactory Family*: Amethyst night floras & sensual velvet

4. **Nexaura — 100 ml / 3.4 fl. oz.** (AED 151)
   - *Brand*: NE
   - *Bottle*: Dark black/navy glass flacon with gold NE monogram
   - *Cap*: Black ribbed cap
   - *Packaging*: Dark navy box with gold typography
   - *Olfactory Family*: Midnight enigma, smoky woods & modern leather

5. **Oud Al Ashhar — 100 ml / 3.4 fl. oz.** (AED 155)
   - *Brand*: NE
   - *Bottle*: Amber/brown transparent glass with gold Arabic script & gold NE monogram
   - *Cap*: Metallic gold cylindrical cap
   - *Packaging*: Dark brown/black box with gold typography
   - *Olfactory Family*: Sunlit amber & noble warm woods

6. **Oud Alhind — 100 ml / 3.4 fl. oz.** (AED 165)
   - *Brand*: NE
   - *Bottle*: Deep transparent red glass flacon with gold NE monogram & gold Arabic script
   - *Cap*: Decorative textured gold pyramid cap
   - *Packaging*: Burgundy/red box with gold typography
   - *Olfactory Family*: Imperial ancient Assam agarwood & saffron

---

## 🎬 Cinematic Scroll Animations

- **Hero Experience**: Sophisticated cream backdrop with floating particles, glowing light orbs, and official headline *"ESSENCE OF THE WORLD"*.
- **Scroll-Triggered 6-Bottle Spread**: Pinned GSAP ScrollTrigger timeline orchestrating all 6 flacons floating upwards from a compact group, separating horizontally across the screen with independent 3D tilt, tracking floor drop shadows, and progressive revealing cards.
- **Interactive Storytelling**: Detailed focus sections for every individual flacon with real box+bottle photography, notes breakdown, volume indicators, and instant cart actions.

---

## 🚀 How to Run the Website

### Option 1: Standard Next.js Development (Recommended)

In your terminal from the project folder:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

### Option 2: Full-Stack Express Server (Node.js + Express)

```bash
npm run server
```
This runs the custom Express server (`server.js`) with integrated Next.js handling. If port 3000 is occupied, it automatically falls back to 3001, 3002, etc.

---

### Option 3: Production Build & Start

```bash
npm run build
npm start
```

---

## 🛡️ Admin Dashboard Access

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Official Admin Account**:
  - **Email**: `admin@nexence.in`
  - **Password**: `adminpassword123`
- *Tip*: In the Sign-in modal, click the **"Fill Admin Account"** button for instant one-click login.

### Admin Capabilities:
- Real-time revenue counters, dispatch status tracking, and inventory health.
- **Product Management**: Edit prices, update stock, modify olfactory notes pyramids (Top, Heart, Base), and add new perfumes.
- **Order Management**: Track customer orders (`NX-2026-XXXX`) with statuses (*Processing*, *Velvet Boxing*, *Shipped*, *Delivered*).
- **Inventory Management**: Real-time stock counters with instant updates.

---

## 💳 Payment Gateway & Checkout

- **Razorpay Integration**: Configured in `app/api/payment/razorpay-order` and `app/api/payment/verify`.
- **Instant Test Mode**: Works 100% out-of-the-box without requiring live keys. Placing an order triggers a simulated luxury authorization modal, festive confetti, and instant redirect to real-time order tracking (`/orders/[orderNumber]`).
- To connect your live Razorpay merchant account, supply keys in `.env.local`:
  ```env
  RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
  RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
  ```

---

## 🗄️ Database & Storage

- Resilient JSON datastore located at `data/store.json` (auto-migrated and synchronized).
- Contact submissions are stored under `messages` in `data/store.json` and validated through `POST /api/contact`.
- Official customer concierge: `info@nexence.in`.
