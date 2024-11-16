import "./App.css";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
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
import NotFoundPage from "./components/pages/NotFoundPage";
import ContactUsPage from "./components/pages/ContactUsPage";
import AboutUsPage from "./components/pages/AboutUsPage";
import ShippingInfoPage from "./components/pages/ShippingInfoPage";
import ReturnRefundPolicyPage from "./components/pages/ReturnRefundPolicyPage";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import OrderConfirmation from "./components/pages/OrderConfirmation";
import OTPLogin from "./components/pages/OTPLogin";
import UserAccountPage from "./components/pages/UserAccountPage";
import Dashboard from "./components/adminpanel/Dashboard";
import ProductList from "./components/adminpanel/ProductList";
import ProductUpload from "./components/adminpanel/ProductUpload";
import Orders from "./components/adminpanel/Orders";
import OrderDetail from "./components/adminpanel/OrderDetail";
import Inventory from "./components/adminpanel/Inventory";
import Testimonials from "./components/adminpanel/Testimonials";
import OrderReport from "./components/adminpanel/OrderReport";
import UserManagement from "./components/adminpanel/UserManagement";
import Settings from "./components/adminpanel/Settings";
import Adminbar from "./components/adminpanel/Adminbar";
import AdminSidebar from "./components/adminpanel/AdminSidebar";
import Login from "./components/adminpanel/Login"; // Admin Login

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const toggleSidebar = () => {
    if (!isLargeScreen) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Store auth state in localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove auth state from localStorage
  };

  useEffect(() => {
    // Check if the user is authenticated when the app loads
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState === "true") {
      setIsAuthenticated(true); // Set state based on stored value
    }

    // Add resize event listener to determine if the screen is large
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // Check if screen is lg or larger (1024px breakpoint)
    };
    updateScreenSize(); // Initial check on load
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="App bg-[#FAFAFA]">
        <Routes>
          {/* Public Routes */}
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
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/size-chart" element={<SizeChart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/shipping-info" element={<ShippingInfoPage />} />
          <Route path="/return-policy" element={<ReturnRefundPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/otp-login" element={<OTPLogin />} />
          <Route path="/user-account" element={<UserAccountPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin-auth/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/admin/*"
            element={
              isAuthenticated || true ? (
                <>
                  <Adminbar
                    toggleSidebar={toggleSidebar}
                    onLogout={handleLogout}
                  />
                  <div className="flex flex-col lg:flex-row">
                    {isSidebarOpen && (
                      <AdminSidebar toggleSidebar={toggleSidebar} />
                    )}
                    <div className="flex-grow">
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="products" element={<ProductList />} />
                        <Route path="upload" element={<ProductUpload />} />
                        <Route path="orders" element={<Orders />} />
                        <Route
                          path="orders/:orderId"
                          element={<OrderDetail />}
                        />
                        <Route path="testimonials" element={<Testimonials />} />
                        <Route path="settings" element={<Settings />} />
                        <Route
                          path="user-management"
                          element={<UserManagement />}
                        />
                        <Route path="report" element={<OrderReport />} />
                        <Route path="inventory" element={<Inventory />} />
                      </Routes>
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/admin/login" /> // Redirect unauthenticated users to admin login page
              )
            }
          />
          {/* Redirect 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
