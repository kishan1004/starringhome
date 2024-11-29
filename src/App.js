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
import OrderConfirmation from "./components/pages/OrderConfirmation";
import UserLogin from "./components/pages/UserLogin";
import UserAccountPage from "./components/pages/UserAccountPage";
import Dashboard from "./components/adminpanel/Dashboard";
import ProductList from "./components/adminpanel/ProductList";
import ProductUpload from "./components/adminpanel/ProductUpload";
import Orders from "./components/adminpanel/Orders";
import OrderDetail from "./components/adminpanel/OrderDetail";
import Inventory from "./components/adminpanel/Inventory";
import Testimonials from "./components/adminpanel/Testimonials";
// import OrderReport from "./components/adminpanel/OrderReport";
import UserManagement from "./components/adminpanel/UserManagement";
import Settings from "./components/adminpanel/Settings";
import Adminbar from "./components/adminpanel/Adminbar";
import AdminSidebar from "./components/adminpanel/AdminSidebar";
import Login from "./components/adminpanel/Login"; // Admin Login
import PaymentConfirmation from "./components/pages/PaymentConfirmation";
import OTPLogin from "./components/pages/OTPLogin";
import { QueryClient, QueryClientProvider } from "react-query";
import { userLogout } from "./api/admin";
import YourAddresses from "./components/pages/YourAddresses";
import AddAddress from "./components/pages/AddAddress";
import LoginAndSecurity from "./components/pages/LoginAndSecurity";
import ChangePassword from "./components/pages/ChangePassword";
import YourOrders from "./components/pages/YourOrders";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const queryClient = new QueryClient();

  const toggleSidebar = () => {
    if (!isLargeScreen) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated when the app loads
    const storedAuthState = localStorage.getItem("authToken");
    // console.log(' storedAuthState :',  storedAuthState);
    

    if (storedAuthState) {
      console.log("Verified")
      setIsAuthenticated(true); 
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

  const handleLogout = () => {
    //API: logout api handled
    userLogout().then((res) => {
      localStorage.removeItem("authToken");
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <div className="App bg-[#FAFAFA] ">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection id="hero" />
                  <NewArrivalsSection id="new-arrivals" />
                  <TrendingSection id="trending" />
                  <BannerSection id="banner" />
                  <FeatureSection id="features" />
                  <FooterSection id="footer" />
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
              path="/payment-confirmation"
              element={
                <>
                  <Topbar />
                  <PaymentConfirmation />
                </>
              }
            />
            <Route
              path="/favourites"
              element={
                <>
                  <Topbar />
                  <Favourites />
                </>
              }
            />
            <Route path="/size-chart" element={<SizeChart />} />
            <Route
              path="/checkout"
              element={
                <>
                  <Topbar />
                  <CheckoutPage />
                </>
              }
            />

            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/user-account" element={<UserAccountPage />} />
            <Route path="/addresses" element={<YourAddresses />} />
            <Route path="/add-address/:id" element={<AddAddress />} />
            <Route path="/login-security" element={<LoginAndSecurity />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/your-orders" element={<YourOrders />} />

            <Route
              path="/shopping-cart"
              element={
                <>
                  <Topbar />
                  <ShoppingCart />
                </>
              }
            />
            <Route path="/otp-login" element={<OTPLogin />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />

            <Route
              path="/admin/*"
              element={
                isAuthenticated ? (
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
                          <Route path="product/:productId" element={<ProductUpload />} />
                          <Route path="orders" element={<Orders />} />
                          <Route path="orderdetail/:orderId" element={<OrderDetail />} />
                          <Route
                            path="testimonials"
                            element={<Testimonials />}
                          />
                          <Route path="settings" element={<Settings />} />
                          <Route
                            path="user-management"
                            element={<UserManagement />}
                          />
                          {/* <Route path="report" element={<OrderReport />} /> */}
                          <Route path="inventory" element={<Inventory />} />
                        </Routes>
                      </div>
                    </div>
                  </>
                ) : (
                  <Navigate to="/admin/login" /> 
                )
              }
            />
            {/* Redirect 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
