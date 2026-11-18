import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "store.json");

// Official initial seed data with the six official Nexence perfumes
const defaultData = {
  products: [
    {
      id: "zoya",
      name: "Zoya",
      brand: "NE / Nexence",
      subtitle: "Eau de Parfum",
      price: 139,
      originalPrice: 169,
      stock: 38,
      category: "Floral & Luminous",
      themeColor: "#F4D7DA",
      accentColor: "#FF6B5B",
      bgGradient: "from-[#FBF3F4] via-[#F4D7DA] to-[#F4EDE0]",
      badge: "The Pink Flacon",
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/zoya.jpg",
      bottleImage: "/images/studio/zoya-bottle.png",
      realPhoto: "/images/products/zoya-real.jpg",
      rating: 4.9,
      reviewsCount: 142,
      description:
        "An ode to radiant grace and modern charm. Zoya features transparent pink crystal glass crowned by a sculptural spherical pink cap and embossed with the radiant gold NE monogram.",
      notes: {
        top: "[Editable Top Notes — e.g. Pink Pepper, Italian Mandarin, White Peach]",
        heart: "[Editable Heart Notes — e.g. Centifolia Rose, Peony Petals, Delicate Jasmine]",
        base: "[Editable Base Notes — e.g. Madagascar Vanilla, Cashmere Musks, White Amber]",
      },
      details: [
        "Transparent pink glass with large spherical pink cap",
        "Embossed with authentic gold NE monogram",
        "Matching light cream/pink presentation box with gold details",
        "Hand-poured 100 ml / 3.4 fl. oz. concentration",
      ],
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "nexdesire",
      name: "Nexdesire",
      brand: "NE",
      subtitle: "Eau de Parfum",
      price: 141,
      originalPrice: 175,
      stock: 32,
      category: "Sensual Oriental",
      themeColor: "#E2D4F0",
      accentColor: "#6B2D8A",
      bgGradient: "from-[#F7F2FB] via-[#E2D4F0] to-[#F4EDE0]",
      badge: "The Amethyst Flacon",
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/nexdesire.jpg",
      bottleImage: "/images/studio/nexdesire-bottle.png",
      realPhoto: "/images/products/nexdesire-real.jpg",
      rating: 4.95,
      reviewsCount: 168,
      description:
        "An intoxicating aura of passion and mystery. Nexdesire is captured within deep amethyst purple glass adorned with a polished metallic gold cylindrical cap and signature gold NE crest.",
      notes: {
        top: "[Editable Top Notes — e.g. Blackcurrant, Violet Leaves, Bergamot]",
        heart: "[Editable Heart Notes — e.g. Midnight Orchid, Damask Plum, Iris Butter]",
        base: "[Editable Base Notes — e.g. Amber Crystals, Tonka Bean, Smoked Vanilla]",
      },
      details: [
        "Deep purple glass with metallic gold cylindrical cap",
        "Embossed with authentic gold NE monogram",
        "Matching purple luxury box with gold details",
        "100 ml / 3.4 fl. oz. Eau de Parfum",
      ],
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "oud-alashhar",
      name: "Oud Al Ashhar",
      brand: "NE",
      subtitle: "Eau de Parfum",
      price: 155,
      originalPrice: 189,
      stock: 25,
      category: "Prestige Woody Oud",
      themeColor: "#E8DAC8",
      accentColor: "#9E6B38",
      bgGradient: "from-[#F9F5F0] via-[#E8DAC8] to-[#F4EDE0]",
      badge: "The Amber Flacon",
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/oud-alashhar.jpg",
      bottleImage: "/images/studio/oud-alashhar-bottle.png",
      realPhoto: "/images/products/oud-alashhar-real.jpg",
      rating: 5.0,
      reviewsCount: 184,
      description:
        "A distinguished testament to oriental heritage and warmth. Oud Al Ashhar glows in warm amber glass crowned by a gold cylindrical cap, projecting noble woods and golden resins.",
      notes: {
        top: "[Editable Top Notes — e.g. Golden Cardamom, Nutmeg, Saffron]",
        heart: "[Editable Heart Notes — e.g. Aged Agarwood, Cedarwood Atlas, Labdanum]",
        base: "[Editable Base Notes — e.g. Royal Ambergris, Leather Accord, Sandalwood]",
      },
      details: [
        "Amber/brown transparent glass with metallic gold cylindrical cap",
        "Embossed with authentic gold NE monogram",
        "Dark brown/black box with gold typography",
        "100 ml / 3.4 fl. oz. Eau de Parfum",
      ],
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "infinity",
      name: "NexWorld Infinity",
      brand: "NE",
      subtitle: "Eau de Parfum",
      price: 129,
      originalPrice: 159,
      stock: 28,
      category: "Aquatic & Fresh Woody",
      themeColor: "#C7E6ED",
      accentColor: "#2A7B88",
      bgGradient: "from-[#EFF8FA] via-[#C7E6ED] to-[#F4EDE0]",
      badge: "Bestseller Flacon",
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/infinity.jpg",
      bottleImage: "/images/studio/infinity-bottle.png",
      realPhoto: "/images/products/infinity-real.jpg",
      rating: 5.0,
      reviewsCount: 215,
      description:
        "An endless horizon of magnetic ocean freshness. NexWorld Infinity evokes boundless seas through crystalline turquoise glass adorned with a polished silver metallic cap and crisp architectural profile.",
      notes: {
        top: "[Editable Top Notes — e.g. Sea Salt, Frosted Bergamot, Crisp Marine Accord]",
        heart: "[Editable Heart Notes — e.g. Blue Sage, Crushed Cedar Needle, Cardamom]",
        base: "[Editable Base Notes — e.g. Driftwood, Mineral Ambergris, Smoked Vetiver]",
      },
      details: [
        "Transparent turquoise/blue glass with silver metallic flared cap",
        "Black NE monogram as printed on original bottle",
        "Bright blue presentation box with dark typography",
        "Preserved authentic product branding: NexWorld Infinity",
      ],
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "oud-alhind",
      name: "Oud Alhind",
      brand: "NE",
      subtitle: "Eau de Parfum",
      price: 165,
      originalPrice: 199,
      stock: 19,
      category: "Imperial Oriental Oud",
      themeColor: "#E8C2C8",
      accentColor: "#801B2A",
      bgGradient: "from-[#FAF0F2] via-[#E8C2C8] to-[#F4EDE0]",
      badge: "Prestige Reserve",
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/oud-alhind.jpg",
      bottleImage: "/images/studio/oud-alhind-bottle.png",
      realPhoto: "/images/products/oud-alhind-real.jpg",
      rating: 4.95,
      reviewsCount: 265,
      description:
        "The sovereign majesty of pure Indian oud distilled into liquid ruby. Crowned with an ornate textured gold cap, Oud Alhind radiates timeless royal luxury and mesmerizing warmth.",
      notes: {
        top: "[Editable Top Notes — e.g. Saffron Stigmas, Royal Incense, Taif Rose]",
        heart: "[Editable Heart Notes — e.g. Vintage Assam Oud, Leather Accord, Nutmeg]",
        base: "[Editable Base Notes — e.g. Golden Amber, Sandalwood Mysore, Dark Patchouli]",
      },
      details: [
        "Deep transparent red glass with decorative textured gold pyramid cap",
        "Embossed with authentic gold NE monogram",
        "Burgundy/red luxury box with gold typography",
        "100 ml / 3.4 fl. oz. Eau de Parfum",
      ],
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "nexaura",
      name: "Nexaura",
      brand: "NE",
      subtitle: "Eau de Parfum",
      price: 151,
      originalPrice: 185,
      stock: 22,
      category: "Nocturne Intense",
      themeColor: "#CAD0DC",
      accentColor: "#182848",
      bgGradient: "from-[#F0F2F6] via-[#CAD0DC] to-[#F4EDE0]",
      badge: "The Midnight Flacon",
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/nexaura.jpg",
      bottleImage: "/images/studio/nexaura-bottle.png",
      realPhoto: "/images/products/nexaura-real.jpg",
      rating: 4.9,
      reviewsCount: 154,
      description:
        "The magnetic power of the midnight hour. Nexaura is enveloped in dark midnight glass with a tactile ribbed black cap and gleaming gold NE crest, exuding commanding authority and modern sophistication.",
      notes: {
        top: "[Editable Top Notes — e.g. Smoked Citrus, Black Pepper, Italian Cypress]",
        heart: "[Editable Heart Notes — e.g. Midnight Cedar, Dark Rum Accord, Incense]",
        base: "[Editable Base Notes — e.g. Dark Vetiver, Indonesian Patchouli, Black Amber]",
      },
      details: [
        "Dark black/navy glass with black ribbed cylindrical cap",
        "Embossed with authentic gold NE monogram",
        "Dark navy luxury box with gold typography",
        "100 ml / 3.4 fl. oz. Eau de Parfum",
      ],
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
  ],
  orders: [
    {
      id: "ord_1001",
      orderNumber: "NX-2026-9812",
      customer: {
        name: "Aarav Sharma",
        email: "aarav@example.com",
        phone: "+971 50 123 4567",
        address: "Boulevard Plaza, Downtown",
        city: "Dubai",
        state: "Dubai",
        pincode: "00000",
      },
      items: [
        {
          productId: "oud-alhind",
          name: "Oud Alhind",
          price: 165,
          quantity: 1,
          size: "100 ml / 3.4 fl. oz.",
          image: "/images/studio/oud-alhind.jpg",
        },
      ],
      subtotal: 165,
      tax: 0,
      shipping: 0,
      total: 165,
      paymentMethod: "Card / Online Payment (AED)",
      paymentStatus: "Paid",
      orderStatus: "Shipped",
      trackingNumber: "NX-TRK-7729104",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
  ],
  users: [
    {
      id: "usr_admin",
      name: "Nexence Curator",
      email: "admin@nexence.in",
      password: "adminpassword123",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
  ],
  subscribers: [
    { email: "collector@luxuryfragrance.com", subscribedAt: new Date().toISOString() },
  ],
  messages: [],
};

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function readStore() {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) {
      writeStore(defaultData);
      return defaultData;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    
    // Auto-migrate if older 3-product store, old INR pricing, or old image paths exist
    if (
      !data.products ||
      data.products.length < 6 ||
      data.products.some(
        (p) =>
          p.id === "zego" ||
          p.price > 500 ||
          p.name === "Oud Alashhar" ||
          (p.image && !p.image.startsWith("/images/studio/"))
      )
    ) {
      data.products = defaultData.products;
      if (data.orders && data.orders.length === 1 && (data.orders[0].total > 500 || !data.orders[0].items?.[0]?.image?.startsWith("/images/studio/"))) {
        data.orders = defaultData.orders;
      }
      writeStore(data);
    }
    return data;
  } catch (err) {
    console.error("Error reading store:", err);
    return defaultData;
  }
}

export function writeStore(data) {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing store:", err);
    return false;
  }
}

// Helper methods for Product Operations
export function getProducts() {
  const data = readStore();
  return data.products || defaultData.products;
}

export function getProductById(id) {
  const products = getProducts();
  return products.find((p) => p.id === id || p._id === id);
}

export function updateProduct(id, updates) {
  const data = readStore();
  const index = data.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  data.products[index] = {
    ...data.products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeStore(data);
  return data.products[index];
}

export function createProduct(productData) {
  const data = readStore();
  const id =
    productData.id ||
    productData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const newProduct = {
    id,
    ...productData,
    createdAt: new Date().toISOString(),
  };
  data.products.push(newProduct);
  writeStore(data);
  return newProduct;
}

export function deleteProduct(id) {
  const data = readStore();
  data.products = data.products.filter((p) => p.id !== id);
  writeStore(data);
  return true;
}

// Helper methods for Orders
export function getOrders() {
  const data = readStore();
  return data.orders || [];
}

export function getOrderById(id) {
  const orders = getOrders();
  return orders.find((o) => o.id === id || o.orderNumber === id);
}

export function createOrder(orderPayload) {
  const data = readStore();
  const id = "ord_" + Date.now();
  const orderNumber =
    "NX-2026-" + Math.floor(1000 + Math.random() * 9000);

  const newOrder = {
    id,
    orderNumber,
    ...orderPayload,
    orderStatus: orderPayload.orderStatus || "Processing",
    paymentStatus: orderPayload.paymentStatus || "Paid",
    createdAt: new Date().toISOString(),
  };

  // Decrement inventory stock
  if (orderPayload.items && Array.isArray(orderPayload.items)) {
    orderPayload.items.forEach((item) => {
      const pIndex = data.products.findIndex((p) => p.id === item.productId);
      if (pIndex !== -1) {
        data.products[pIndex].stock = Math.max(
          0,
          (data.products[pIndex].stock || 0) - (item.quantity || 1)
        );
      }
    });
  }

  data.orders.unshift(newOrder);
  writeStore(data);
  return newOrder;
}

export function updateOrderStatus(id, status) {
  const data = readStore();
  const index = data.orders.findIndex(
    (o) => o.id === id || o.orderNumber === id
  );
  if (index === -1) return null;

  data.orders[index].orderStatus = status;
  data.orders[index].updatedAt = new Date().toISOString();
  writeStore(data);
  return data.orders[index];
}

// Helper methods for Users & Newsletter & Messages
export function findUserByEmail(email) {
  const data = readStore();
  return (data.users || []).find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(userData) {
  const data = readStore();
  const id = "usr_" + Date.now();
  const newUser = {
    id,
    ...userData,
    role: userData.role || "customer",
    createdAt: new Date().toISOString(),
  };
  data.users.push(newUser);
  writeStore(data);
  return newUser;
}

export function addSubscriber(email) {
  const data = readStore();
  if (!data.subscribers) data.subscribers = [];
  const exists = data.subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());
  if (exists) return { message: "Already subscribed to the Nexence private ledger" };
  data.subscribers.push({ email, subscribedAt: new Date().toISOString() });
  writeStore(data);
  return { message: "Welcome to the exclusive world of Nexence Parfums" };
}

export function saveContactMessage(msg) {
  const data = readStore();
  if (!data.messages) data.messages = [];
  const newMsg = {
    id: "msg_" + Date.now(),
    ...msg,
    receivedAt: new Date().toISOString(),
  };
  data.messages.push(newMsg);
  writeStore(data);
  return newMsg;
}
