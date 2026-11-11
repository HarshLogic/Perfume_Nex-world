# NEXWORLD — Haute Parfumerie & Luxury Fragrances

An international luxury fragrance e-commerce web application inspired by prestigious perfume houses, featuring cinematic GSAP scroll-triggered bottle animations, 3D cursor-tracking flacons, and a full-stack shopping and admin experience.

---

## 💎 Official Brand Identity

- **Company**: NEXWORLD
- **Brand Monogram**: Interlocking **NE** luxury crest
- **Color Palette**:
  - **Navy (`#14213D`)**: Typography, sticky navigation, headers, dark editorial accents
  - **Cream (`#F4EDE0`)**: Primary background for all pages
  - **Coral (`#FF6B5B`)**: Interactive buttons, badges, highlights, and CTAs

---

## 🌸 The Signature Trilogy

1. **Zego (Eau de Parfum — 100ml / ₹4,999)**
   - *Theme*: Blush pink glass flacon with soft rounded pink cap and matching packaging box.
   - *Personality*: Radiant modern grace, delicate floral warmth, romantic allure.
2. **NexWorld Infinity (Eau de Parfum — 100ml / ₹5,499)**
   - *Theme*: Crystalline turquoise-blue rectangular flacon with silver chrome monolithic cap.
   - *Personality*: Boundless ocean horizon, crisp marine notes, magnetic leadership.
3. **Oud Alhind (Extrait de Parfum — 100ml / ₹6,299)**
   - *Theme*: Deep ruby-red rectangular flacon with 24K gold-plated cap and rich burgundy packaging.
   - *Personality*: Imperial ancient Assam oud, royal saffron, and golden amber.

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
This starts the custom Express server with Next.js integrated. If port 3000 is occupied, it automatically retries on port 3001, 3002, etc.

---

### Option 3: Production Build & Start

```bash
npm run build
npm start
```

---

## 🛡️ Admin Dashboard Access

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Demo Admin Account**:
  - **Email**: `admin@nexworld.com`
  - **Password**: `adminpassword123`
- *Tip*: On the Sign-in modal, you can also click the **"Fill Admin Account"** button for instant access.

### Admin Capabilities:
- View real-time revenue, order counters, active flacons, and low-stock alerts.
- **Product Management**: Add new fragrances, edit prices, update images, edit olfactory notes (Top, Heart, Base), and delete products.
- **Order Management**: Inspect client shipping addresses and update dispatch statuses (*Processing*, *Velvet Boxing*, *Shipped*, *Delivered*).
- **Inventory Management**: Real-time stock adjusters (+5, -1) with live persistence.

---

## 💳 Payment Gateway & Checkout

- **Razorpay Integration**: Configured in `app/api/payment/razorpay-order` and `app/api/payment/verify`.
- **Instant Test Mode**: Works 100% out-of-the-box without requiring live keys. Placing an order triggers a simulated luxury authorization modal and confetti celebration with immediate live tracking (`/orders/[orderNumber]`).
- To connect your live Razorpay account, add your keys to `.env.local`:
  ```env
  RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
  RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
  ```

---

## 🗄️ Database

- Default resilient store in `data/store.json` (zero configuration required).
- Optional MongoDB URI:
  ```env
  MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/nexworld
  ```
# Perfume_Nex-world
