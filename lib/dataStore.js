import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "store.json");

// Default initial seed data with the three official NexWorld perfumes
const defaultData = {
  products: [
    {
      id: "zego",
      name: "Zego",
      brand: "NexWorld",
      subtitle: "Eau de Parfum",
      price: 4999,
      originalPrice: 6500,
      stock: 42,
      category: "Floral & Sensual",
      themeColor: "#F4D7DA",
      accentColor: "#FF6B5B",
      bgGradient: "from-[#FBF3F4] via-[#F4D7DA] to-[#F4EDE0]",
      badge: "Signature Collection",
      size: "100ml / 3.4 FL. OZ.",
      image: "/images/zego.png",
      bottleImage: "/images/zego-bottle.png",
      rating: 4.9,
      reviewsCount: 142,
      description:
        "An ode to luminous modern grace and alluring warmth. NexWorld Zego captivates from the first mist, encased in an exquisite soft pink glass flacon with a matching rounded sculpted cap.",
      notes: {
        top: "[Editable Top Notes — e.g. Pink Pepper, Bergamot, Italian Mandarin]",
        heart: "[Editable Heart Notes — e.g. Damask Rose, Peony, White Peach]",
        base: "[Editable Base Notes — e.g. Madagascar Vanilla, Cashmere Wood, White Musk]",
      },
      details: [
        "Hand-poured luxury concentrate",
        "8-12 hours lasting sillage",
        "Matching blush pink presentation casket",
        "Cruelty-free & ethically sourced",
      ],
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "infinity",
      name: "NexWorld Infinity",
      brand: "NexWorld",
      subtitle: "Eau de Parfum",
      price: 5499,
      originalPrice: 7200,
      stock: 28,
      category: "Aquatic & Woody",
      themeColor: "#C7E6ED",
      accentColor: "#2A7B88",
      bgGradient: "from-[#EFF8FA] via-[#C7E6ED] to-[#F4EDE0]",
      badge: "Bestseller",
      size: "100ml / 3.4 FL. OZ.",
      image: "/images/infinity.png",
      bottleImage: "/images/infinity-bottle.png",
      rating: 5.0,
      reviewsCount: 198,
      description:
        "Boundless depth meets magnetic elegance. NexWorld Infinity evokes the boundless ocean horizon through a crystalline turquoise flacon crowned with a silver chrome monolithic cap.",
      notes: {
        top: "[Editable Top Notes — e.g. Sea Salt, Frosted Bergamot, Crisp Marine Accord]",
        heart: "[Editable Heart Notes — e.g. Blue Sage, Crushed Cedar Needle, Cardamom]",
        base: "[Editable Base Notes — e.g. Driftwood, Mineral Ambergris, Smoked Vetiver]",
      },
      details: [
        "Artisanal marine & woody harmony",
        "10-14 hours commanding projection",
        "Heavy crystal flacon with silver cap",
        "Sustainably harvested botanical essences",
      ],
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "oud-alhind",
      name: "Oud Alhind",
      brand: "NexWorld",
      subtitle: "Extrait de Parfum",
      price: 6299,
      originalPrice: 8500,
      stock: 19,
      category: "Imperial Oriental Oud",
      themeColor: "#E8C2C8",
      accentColor: "#801B2A",
      bgGradient: "from-[#FAF0F2] via-[#E8C2C8] to-[#F4EDE0]",
      badge: "Prestige Reserve",
      size: "100ml / 3.4 FL. OZ.",
      image: "/images/oud-alhind.png",
      bottleImage: "/images/oud-bottle.png",
      rating: 4.95,
      reviewsCount: 265,
      description:
        "The sovereign soul of ancient Assam oud distilled into pure liquid gold. Crowned with an opulent gold cap, the deep ruby flacon radiates mystery, royalty, and unforgettable allure.",
      notes: {
        top: "[Editable Top Notes — e.g. Saffron Stigmas, Royal Incense, Taif Rose]",
        heart: "[Editable Heart Notes — e.g. Aged Assam Oud, Leather Accord, Nutmeg]",
        base: "[Editable Base Notes — e.g. Golden Amber, Royal Sandalwood, Dark Patchouli]",
      },
      details: [
        "Pure Extrait de Parfum concentration (30% oil)",
        "16+ hours timeless regal sillage",
        "Deep ruby glass with 24K gold-plated cap",
        "Rare wild-harvested vintage oud wood",
      ],
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
  ],
  orders: [
    {
      id: "ord_1001",
      orderNumber: "NW-2026-9812",
      customer: {
        name: "Aarav Sharma",
        email: "aarav@example.com",
        phone: "+91 98765 43210",
        address: "42 Altamount Road, Cumballa Hill",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400026",
      },
      items: [
        {
          productId: "oud-alhind",
          name: "Oud Alhind",
          price: 6299,
          quantity: 1,
          size: "100ml / 3.4 FL. OZ.",
          image: "/images/oud-alhind.png",
        },
      ],
      subtotal: 6299,
      tax: 0,
      shipping: 0,
      total: 6299,
      paymentMethod: "Razorpay (UPI / NetBanking)",
      paymentStatus: "Paid",
      orderStatus: "Shipped",
      trackingNumber: "NW-TRK-7729104",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
  ],
  users: [
    {
      id: "usr_admin",
      name: "NexWorld Curator",
      email: "admin@nexworld.com",
      password: "adminpassword123", // For test / demo
      role: "admin",
      createdAt: new Date().toISOString(),
    },
  ],
  subscribers: [
    { email: "collector@luxuryfragrance.com", subscribedAt: new Date().toISOString() },
  ],
};

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
  }
}

export function readStore() {
  try {
    ensureDataDir();
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
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
  return data.products || [];
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
    "NW-2026-" + Math.floor(1000 + Math.random() * 9000);

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

// Helper methods for Users & Newsletter
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
  if (exists) return { message: "Already subscribed to the NexWorld private ledger" };
  data.subscribers.push({ email, subscribedAt: new Date().toISOString() });
  writeStore(data);
  return { message: "Welcome to the exclusive world of NexWorld Parfums" };
}
