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
  title: "Nexence | Luxury Perfumes & Fragrances",
  description:
    "Discover Nexence, a luxury perfume collection inspired by the essence of the world. Explore sophisticated fragrances crafted for unforgettable experiences.",
  keywords:
    "Nexence, luxury perfumes, fragrances, Zoya, Nexdesire, Oud Al Ashhar, NexWorld Infinity, Oud Alhind, Nexaura, haute parfumerie",
  openGraph: {
    title: "Nexence | Luxury Perfumes & Fragrances",
    description:
      "Discover Nexence, a luxury perfume collection inspired by the essence of the world. Explore sophisticated fragrances crafted for unforgettable experiences.",
    url: "https://nexence.in",
    siteName: "NEXENCE",
    images: [
      {
        url: "/images/studio/zoya.jpg",
        width: 1200,
        height: 630,
        alt: "Nexence Luxury Perfume Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/brand/ne-monogram.svg",
    apple: "/brand/ne-monogram.svg",
  },
};

export default function RootLayout({ children }) {
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
