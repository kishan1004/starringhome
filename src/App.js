import "./App.css";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
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
import CursorBlur from "./components/CursorBlur";
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
import UserOrderDetail from "./components/pages/UserOrderDetail";
import AdminCouponPage from "./components/adminpanel/AdminCouponPage";
import RefundPolicyPage from "./components/pages/RefundPolicyPage";
import ReturnExchangePage from "./components/adminpanel/ReturnExchangePage";
import AddCouponPage from "./components/adminpanel/AddCouponPage";
import AdminComboProductsPage from "./components/adminpanel/AdminComboProductsPage";
import AddComboPage from "./components/adminpanel/AddComboPage";
import AdminContactForm from "./components/adminpanel/AdminContactForm";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const queryClient = new QueryClient();

  const navigate = useNavigate();

  const toggleSidebar = () => {
    if (!isLargeScreen) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated when the app loads
    const storedAuthState = localStorage.getItem("authToken");
    setIsAuthenticated(!!storedAuthState);

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
      setIsAuthenticated(false); // Update state on logout
      navigate("/admin/login");
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <div className="App bg-[#FAFAFA] ">
        {!window.location.pathname.startsWith("/admin") && <CursorBlur />}
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
          {/* <Route
            path="/payment-confirmation/:orderId"
            element={
              <>
                <Topbar />
                <PaymentConfirmation />
              </>
            }
          /> */}
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
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/userorderdetail" element={<UserOrderDetail />} />

          <Route
            path="/shopping-cart"
            element={
              <>
                <Topbar />
                <ShoppingCart />
              </>
            }
          />
          <Route path="/otp-login/:type" element={<OTPLogin />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />

          <Route
            path="/admin/*"
            element={
              isAuthenticated || localStorage.getItem("authToken") ? (
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
                        <Route
                          path="product/:productId"
                          element={<ProductUpload />}
                        />
                        <Route path="orders" element={<Orders />} />
                        <Route
                          path="orderdetail/:orderId"
                          element={<OrderDetail />}
                        />
                        <Route path="coupons" element={<AdminCouponPage />} />
                        <Route path="add-coupon" element={<AddCouponPage />} />
                        <Route
                          path="comboproducts"
                          element={<AdminComboProductsPage />}
                        />
                        <Route path="add-combo" element={<AddComboPage />} />

                        <Route
                          path="returns"
                          element={<ReturnExchangePage />}
                        />
                        <Route path="testimonials" element={<Testimonials />} />
                        <Route path="settings" element={<Settings />} />
                        <Route
                          path="user-management"
                          element={<UserManagement />}
                        />
                        <Route path="inventory" element={<Inventory />} />
                        <Route
                          path="admincontactform"
                          element={<AdminContactForm />}
                        />
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
    </QueryClientProvider>
  );
}

export default App;
