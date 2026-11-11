"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Eye,
  X,
  Droplets,
  Layers,
  ArrowRight,
} from "lucide-react";
import NeLogo from "@/components/brand/NeLogo";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview"); // overview | products | orders | inventory
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    subtitle: "Eau de Parfum",
    price: "",
    originalPrice: "",
    stock: "25",
    category: "Signature Luxury",
    size: "100ml / 3.4 FL. OZ.",
    image: "/images/zego.png",
    description: "",
    notesTop: "[Editable Top Notes]",
    notesHeart: "[Editable Heart Notes]",
    notesBase: "[Editable Base Notes]",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, ordRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
      ]);
      const prodData = await prodRes.json();
      const ordData = await ordRes.json();

      if (prodData.products) setProducts(prodData.products);
      if (ordData.orders) setOrders(ordData.orders);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Total revenue & stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const lowStockCount = products.filter((p) => (p.stock || 0) < 20).length;

  // Open Edit Product
  const handleEditClick = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      subtitle: prod.subtitle || "Eau de Parfum",
      price: prod.price,
      originalPrice: prod.originalPrice || "",
      stock: prod.stock || 0,
      category: prod.category || "Signature Luxury",
      size: prod.size || "100ml / 3.4 FL. OZ.",
      image: prod.image || "/images/zego.png",
      description: prod.description || "",
      notesTop: typeof prod.notes === "object" ? prod.notes.top : prod.notes,
      notesHeart: typeof prod.notes === "object" ? prod.notes.heart : "",
      notesBase: typeof prod.notes === "object" ? prod.notes.base : "",
    });
    setIsProductModalOpen(true);
  };

  // Open Add Product
  const handleAddClick = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      subtitle: "Eau de Parfum",
      price: "",
      originalPrice: "",
      stock: "30",
      category: "Signature Luxury",
      size: "100ml / 3.4 FL. OZ.",
      image: "/images/zego.png",
      description: "",
      notesTop: "[Editable Top Notes]",
      notesHeart: "[Editable Heart Notes]",
      notesBase: "[Editable Base Notes]",
    });
    setIsProductModalOpen(true);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const payload = {
      name: productForm.name,
      subtitle: productForm.subtitle,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : null,
      stock: Number(productForm.stock),
      category: productForm.category,
      size: productForm.size,
      image: productForm.image,
      bottleImage: productForm.image,
      description: productForm.description,
      notes: {
        top: productForm.notesTop,
        heart: productForm.notesHeart,
        base: productForm.notesBase,
      },
    };

    try {
      if (editingProduct) {
        // PUT update
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setIsProductModalOpen(false);
          fetchData();
        }
      } else {
        // POST create
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setIsProductModalOpen(false);
          fetchData();
        }
      }
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you wish to delete this fragrance from catalog?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Quick Stock Adjust
  const handleStockAdjust = async (prod, delta) => {
    const newStock = Math.max(0, (prod.stock || 0) + delta);
    try {
      await fetch(`/api/products/${prod.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === prod.id ? { ...p, stock: newStock } : p))
      );
    } catch (err) {
      console.error("Stock adjust error:", err);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F4EDE0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#14213D]/10 gap-4">
          <div className="flex items-center gap-3">
            <NeLogo variant="navy" size="md" showWordmark={false} />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FF6B5B] block">
                ATELIER CURATOR CONSOLE
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#14213D]">
                NEXWORLD CONTROL CENTER
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2.5 rounded-full bg-white border border-[#14213D]/15 text-[#14213D] hover:text-[#FF6B5B] transition-colors shadow-sm"
              aria-label="Refresh data"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleAddClick}
              className="btn-luxury-coral px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow"
            >
              <Plus size={16} />
              <span>ADD NEW FRAGRANCE</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 my-8 border-b border-[#14213D]/10 pb-4">
          {[
            { id: "overview", label: "Executive Overview" },
            { id: "products", label: `Catalog (${products.length})` },
            { id: "orders", label: `Orders (${orders.length})` },
            { id: "inventory", label: "Inventory Levels" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? "bg-[#14213D] text-[#F4EDE0] shadow-sm"
                  : "text-[#14213D]/65 hover:text-[#14213D] hover:bg-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* 4 Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-[#14213D]/10 shadow-sm space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block">
                  GROSS REVENUE
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#14213D]">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </h3>
                <span className="text-xs text-emerald-600 font-medium block">
                  ↑ 100% Real-time Transactions
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-[#14213D]/10 shadow-sm space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block">
                  TOTAL CLIENT ORDERS
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#14213D]">
                  {orders.length}
                </h3>
                <span className="text-xs text-[#14213D]/60 block font-sans">
                  Active dispatches & fulfilled
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-[#14213D]/10 shadow-sm space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block">
                  ACTIVE FLACONS
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#14213D]">
                  {products.length}
                </h3>
                <span className="text-xs text-[#FF6B5B] font-medium block">
                  Signature Trilogy + Editions
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-[#14213D]/10 shadow-sm space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block">
                  INVENTORY HEALTH
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#14213D]">
                  {totalStock} units
                </h3>
                <span className="text-xs text-[#C5A059] font-medium block">
                  {lowStockCount} flacon(s) below threshold
                </span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="p-8 rounded-3xl bg-white/85 border border-[#14213D]/10 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#14213D]">
                  RECENT DISPATCH ORDERS
                </h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs uppercase tracking-wider font-semibold text-[#FF6B5B] hover:underline"
                >
                  VIEW ALL ORDERS →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#14213D]/10 text-[#14213D]/50 uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Order Number</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Items</th>
                      <th className="pb-3">Total</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#14213D]/5">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="hover:bg-white/50 transition-colors">
                        <td className="py-3 font-mono font-bold text-[#14213D]">
                          {o.orderNumber}
                        </td>
                        <td className="py-3 font-medium text-[#14213D]">
                          {o.customer?.name}
                        </td>
                        <td className="py-3 text-[#14213D]/70">
                          {o.items?.map((i) => i.name).join(", ")}
                        </td>
                        <td className="py-3 font-serif font-bold text-[#14213D]">
                          ₹{o.total?.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B5B]/10 text-[#FF6B5B] font-bold text-[10px] uppercase">
                            {o.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PRODUCTS ================= */}
        {activeTab === "products" && (
          <div className="p-8 rounded-3xl bg-white/85 border border-[#14213D]/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#14213D]">
                FRAGRANCE CATALOG MANAGEMENT
              </h3>
              <button
                onClick={handleAddClick}
                className="btn-luxury-coral px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Plus size={14} />
                <span>NEW FLACON</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#14213D]/10 text-[#14213D]/50 uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Flacon</th>
                    <th className="pb-3">Fragrance Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Stock Units</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#14213D]/5">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/50 transition-colors">
                      <td className="py-3">
                        <div className="relative w-12 h-14 rounded-lg bg-[#FAF7F2] p-1 flex items-center justify-center">
                          <Image
                            src={p.bottleImage || p.image}
                            alt={p.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="font-serif font-bold text-sm text-[#14213D] block">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-[#FF6B5B] uppercase font-semibold">
                          {p.subtitle || "Eau de Parfum"}
                        </span>
                      </td>
                      <td className="py-3 text-[#14213D]/70">{p.category}</td>
                      <td className="py-3 font-serif font-bold text-sm text-[#14213D]">
                        ₹{Number(p.price).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3">
                        <span
                          className={`font-bold ${
                            p.stock < 20 ? "text-red-600" : "text-[#14213D]"
                          }`}
                        >
                          {p.stock} in atelier
                        </span>
                      </td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          onClick={() => handleEditClick(p)}
                          className="p-2 rounded-full hover:bg-[#14213D]/10 text-[#14213D] transition-colors"
                          aria-label="Edit product"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 rounded-full hover:bg-red-50 text-red-600 transition-colors"
                          aria-label="Delete product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDERS ================= */}
        {activeTab === "orders" && (
          <div className="p-8 rounded-3xl bg-white/85 border border-[#14213D]/10 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#14213D]">
              CLIENT DISPATCH MANAGEMENT ({orders.length})
            </h3>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#14213D]/10 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#14213D]/10 pb-3">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#14213D] block">
                        {ord.orderNumber}
                      </span>
                      <span className="text-[10px] text-[#14213D]/50 font-sans">
                        Placed: {new Date(ord.createdAt).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Status updater dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#14213D]/60 font-semibold">
                        Dispatch Status:
                      </span>
                      <select
                        value={ord.orderStatus || "Processing"}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                        className="px-3 py-1.5 rounded-full text-xs font-bold uppercase bg-white border border-[#14213D]/20 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Velvet Boxing">Velvet Boxing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Info & Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#14213D]/80">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block mb-1">
                        CLIENT & SHIPPING RESIDENCE
                      </span>
                      <p className="font-bold text-[#14213D]">{ord.customer?.name}</p>
                      <p>{ord.customer?.email} • {ord.customer?.phone}</p>
                      <p className="text-[#14213D]/70 mt-1">
                        {ord.customer?.address}, {ord.customer?.city}, {ord.customer?.state} - {ord.customer?.pincode}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block mb-1">
                        ITEMS ACQUIRED & TOTAL
                      </span>
                      <p className="font-medium text-[#14213D]">
                        {ord.items?.map((i) => `${i.name} (Qty ${i.quantity})`).join(", ")}
                      </p>
                      <p className="font-serif font-bold text-base text-[#14213D] mt-2">
                        Total: ₹{ord.total?.toLocaleString("en-IN")}
                      </p>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase">
                        Payment: {ord.paymentMethod} (Cleared)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: INVENTORY ================= */}
        {activeTab === "inventory" && (
          <div className="p-8 rounded-3xl bg-white/85 border border-[#14213D]/10 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#14213D]">
              ATELIER STOCK & RESERVE LEVELS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#14213D]/10 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-14 h-16 rounded-xl bg-white p-1 shrink-0 flex items-center justify-center">
                      <Image
                        src={prod.bottleImage || prod.image}
                        alt={prod.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#14213D]">
                        {prod.name}
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider text-[#FF6B5B] font-bold">
                        ₹{Number(prod.price).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#14213D]/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#14213D]/50 uppercase font-bold block">
                        UNITS IN ATELIER
                      </span>
                      <span className="font-serif font-bold text-2xl text-[#14213D]">
                        {prod.stock || 0}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleStockAdjust(prod, -1)}
                        className="px-3 py-1 rounded-full bg-white border border-[#14213D]/20 text-xs font-bold hover:bg-[#14213D] hover:text-white transition-colors"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => handleStockAdjust(prod, 5)}
                        className="px-3 py-1 rounded-full bg-[#14213D] text-[#F4EDE0] text-xs font-bold hover:bg-[#FF6B5B] transition-colors"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsProductModalOpen(false)}
            className="fixed inset-0 bg-[#14213D]/70 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#14213D]/10 overflow-hidden z-10 p-8 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-5 right-5 text-[#14213D]/50 hover:text-[#14213D] p-1"
            >
              <X size={20} />
            </button>

            <h3 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#14213D] mb-6">
              {editingProduct ? `EDIT ${editingProduct.name}` : "ADD NEW FRAGRANCE"}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    Fragrance Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#14213D]/15 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    Subtitle / Concentration
                  </label>
                  <input
                    type="text"
                    value={productForm.subtitle}
                    onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#14213D]/15 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#14213D]/15 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    Original / MRP Price (₹)
                  </label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) =>
                      setProductForm({ ...productForm, originalPrice: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#14213D]/15 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    Stock Units *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#14213D]/15 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                  Product Image URL / Asset Path
                </label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="/images/zego.png"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#14213D]/15 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                  Editorial Description
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#14213D]/15 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                />
              </div>

              {/* Fragrance Notes (Editable Fields) */}
              <div className="p-4 rounded-2xl bg-white border border-[#14213D]/10 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF6B5B] block">
                  FRAGRANCE NOTES STRUCTURE (EDITABLE FIELDS)
                </span>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#14213D]/60 mb-0.5">
                    Top Notes
                  </label>
                  <input
                    type="text"
                    value={productForm.notesTop}
                    onChange={(e) => setProductForm({ ...productForm, notesTop: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#14213D]/10 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#14213D]/60 mb-0.5">
                    Heart Notes
                  </label>
                  <input
                    type="text"
                    value={productForm.notesHeart}
                    onChange={(e) => setProductForm({ ...productForm, notesHeart: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#14213D]/10 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#14213D]/60 mb-0.5">
                    Base Notes
                  </label>
                  <input
                    type="text"
                    value={productForm.notesBase}
                    onChange={(e) => setProductForm({ ...productForm, notesBase: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#14213D]/10 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#14213D]/20 text-[#14213D] font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-luxury-coral px-6 py-2.5 rounded-full font-semibold uppercase tracking-wider shadow"
                >
                  {editingProduct ? "UPDATE FRAGRANCE" : "PUBLISH TO CATALOG"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
