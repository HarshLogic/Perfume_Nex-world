import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SearchProvider } from "@/context/SearchContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/modals/CartDrawer";
import SearchModal from "@/components/modals/SearchModal";
import AuthModal from "@/components/modals/AuthModal";
import ToastNotification from "@/components/ui/ToastNotification";
import { getProducts } from "@/lib/dataStore";

export const metadata = {
  title: "NEXWORLD | Haute Parfumerie & Luxury Fragrances",
  description:
    "Discover NexWorld luxury perfumes. An international haute parfumerie featuring the iconic Zego, NexWorld Infinity, and Oud Alhind trilogy.",
  keywords: "NexWorld, luxury perfume, haute parfumerie, Zego, Infinity, Oud Alhind, fragrance, luxury extrait",
  icons: {
    icon: "/brand/ne-monogram.svg",
    apple: "/brand/ne-monogram.svg",
  },
};

export default function RootLayout({ children }) {
  // Pass initial product list to search modal
  const products = getProducts();

  return (
    <html lang="en">
      <body className="bg-[#F4EDE0] text-[#14213D] min-h-screen flex flex-col font-sans selection:bg-[#14213D] selection:text-[#F4EDE0]">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <SearchProvider>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
                <SearchModal products={products} />
                <AuthModal />
                <ToastNotification />
              </SearchProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
