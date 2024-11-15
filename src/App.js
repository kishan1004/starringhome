import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import NewArrivalsSection from "./components/NewArrivalsSection";
import TrendingSection from "./components/TrendingSection";
import BannerSection from "./components/BannerSection";
import FeatureSection from "./components/FeatureSection";
import FooterSection from "./components/FooterSection";
import AllProductsPage from "./components/pages/AllProductsPage";
import ScrollToTop from "./components/ScrollToTop";
import Favourites from "./components/pages/Favourites";
import ProductPage from "./components/pages/ProductPage";
import SizeChart from "./components/pages/SizeChart";
import Topbar from "./components/pages/Topbar";
import ShoppingCart from "./components/pages/ShoppingCart";
import CheckoutPage from "./components/pages/CheckoutPage";

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true, // Opt-in for state update transition
        v7_relativeSplatPath: true, // Handle splat routes behavior change
      }}
    >
      <ScrollToTop />
      <div className="App bg-[#FAFAFA]">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <NewArrivalsSection />
                <TrendingSection />
                <BannerSection />
                <FeatureSection />
                <FooterSection />
              </>
            }
          />
          <Route
            path="/all-products"
            element={
              <>
                <Topbar />
                <AllProductsPage />
              </>
            }
          />
          <Route
            path="/one-product"
            element={
              <>
                <Topbar />
                <ProductPage />
              </>
            }
          />
          <Route
            path="/shopping-cart"
            element={
              <>
                <Topbar />
                <ShoppingCart />
              </>
            }
          />
          <Route path="/Favourites" element={<Favourites />} />
          <Route path="/SizeChart" element={<SizeChart />} />
          <Route path="/Checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
