"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  Truck,
  Phone,
  ArrowRight,
  ChevronRight,
  Clock,
  ShieldCheck,
  Eye,
  EyeOff,
  LogOut,
  MapPin,
  Package,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  Edit2,
  Save,
  RotateCcw,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function AccountPage() {
  const { user, loading: authLoading, login, register, updateProfile, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();

  // Active form tab for logged out users: "login" | "register"
  const [authTab, setAuthTab] = useState<"login" | "register">("login");

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regCity, setRegCity] = useState("Dhaka");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  // Logged-in Dashboard state
  const [dashboardTab, setDashboardTab] = useState<"orders" | "address" | "profile">("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Address edit state
  const [editingAddress, setEditingAddress] = useState(false);
  const [addrForm, setAddrForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Dhaka",
  });
  const [addrSaving, setAddrSaving] = useState(false);
  const [addrSuccess, setAddrSuccess] = useState<string | null>(null);

  // Load user orders when logged in
  useEffect(() => {
    if (!user) return;

    setAddrForm({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "Dhaka",
    });

    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        const query = user.id ? `customerId=${user.id}` : user.phone ? `phone=${encodeURIComponent(user.phone)}` : `email=${encodeURIComponent(user.email)}`;
        const res = await fetch(`/api/auth/orders?${query}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch customer orders", err);
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginIdentifier.trim()) {
      setLoginError("Please enter your Mobile Phone or Email.");
      return;
    }
    if (!loginPassword) {
      setLoginError("Please enter your password.");
      return;
    }

    setLoginLoading(true);
    const result = await login(loginIdentifier.trim(), loginPassword);
    setLoginLoading(false);

    if (!result.success) {
      setLoginError(result.error || "Login failed. Please verify your credentials.");
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regName.trim()) {
      setRegError("Please enter your full name.");
      return;
    }
    if (!regPhone.trim()) {
      setRegError("Please enter your mobile phone number.");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("Password must be at least 6 characters long.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError("Passwords do not match.");
      return;
    }

    setRegLoading(true);
    const result = await register({
      name: regName.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim(),
      password: regPassword,
      address: regAddress.trim(),
      city: regCity,
    });
    setRegLoading(false);

    if (!result.success) {
      setRegError(result.error || "Registration failed. Please try again.");
    }
  };

  // Handle Address Save
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddrSaving(true);
    setAddrSuccess(null);

    const result = await updateProfile({
      name: addrForm.name.trim(),
      phone: addrForm.phone.trim(),
      address: addrForm.address.trim(),
      city: addrForm.city,
    });

    setAddrSaving(false);
    if (result.success) {
      setAddrSuccess("Delivery address updated successfully!");
      setEditingAddress(false);
      setTimeout(() => setAddrSuccess(null), 4000);
    }
  };

  if (authLoading) {
    return (
      <div className="bg-gray-50 flex-1 py-8 sm:py-12 animate-pulse">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-4">
            <div className="h-8 w-48 bg-gray-200 rounded-xl" />
            <div className="h-4 w-72 bg-gray-100 rounded" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="h-12 bg-gray-100 rounded-xl" />
              <div className="h-12 bg-gray-100 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 1. Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">My Account</span>
        </nav>

        {/* 2. LOGGED OUT: Login / Register Form */}
        {!user && (
          <div className="max-w-xl mx-auto">
            {/* Tab Switcher */}
            <div className="flex bg-gray-200/80 p-1.5 rounded-2xl mb-6 shadow-2xs">
              <button
                type="button"
                onClick={() => setAuthTab("login")}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  authTab === "login"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthTab("register")}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  authTab === "register"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Register
              </button>
            </div>

            {/* A. SIGN IN TAB */}
            {authTab === "login" && (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-9 shadow-xs animate-in fade-in duration-200">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-emerald-50 text-brand-green rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xs">
                    <User className="w-7 h-7 stroke-[1.8]" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-gray-950 mb-1">
                    Sign in to Your Account
                  </h1>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Access your order history, live status & saved delivery addresses.
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Phone / Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Mobile Number or Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="e.g. 017XXXXXXXX or your email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-gray-700">
                        Password <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        tabIndex={-1}
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {loginError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2.5 text-xs font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-green hover:bg-brand-green-hover text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-75"
                  >
                    {loginLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Sign In</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2 text-xs text-gray-500">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthTab("register")}
                      className="font-bold text-brand-green hover:underline cursor-pointer"
                    >
                      Register Now
                    </button>
                  </div>
                </form>

                {/* Alternative Quick Track Order */}
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    Looking to track an order without logging in?
                  </p>
                  <Link
                    href="/track-order"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:underline"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Go to Quick Track Order</span>
                  </Link>
                </div>
              </div>
            )}

            {/* B. REGISTER TAB */}
            {authTab === "register" && (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-9 shadow-xs animate-in fade-in duration-200">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-emerald-50 text-brand-green rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xs">
                    <User className="w-7 h-7 stroke-[1.8]" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-gray-950 mb-1">
                    Create New Account
                  </h1>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Enjoy faster checkouts and track all your orders in one place.
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                      />
                    </div>
                  </div>

                  {/* Password & Confirm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showRegPassword ? "text" : "password"}
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
                        >
                          {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={showRegPassword ? "text" : "password"}
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Re-type password"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                      />
                    </div>
                  </div>

                  {/* Default Delivery Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Delivery Address (Optional)
                    </label>
                    <input
                      type="text"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder="e.g. House #12, Road #4, Sector #11, Uttara"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                    />
                  </div>

                  {/* Error Message */}
                  {regError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2.5 text-xs font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                      <span>{regError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={regLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-green hover:bg-brand-green-hover text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-75"
                  >
                    {regLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Complete Registration</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2 text-xs text-gray-500">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthTab("login")}
                      className="font-bold text-brand-green hover:underline cursor-pointer"
                    >
                      Sign In here
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 3. LOGGED IN: Customer Dashboard */}
        {user && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-brand-green border border-emerald-200/80 flex items-center justify-center shrink-0 font-black text-2xl shadow-2xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-xl sm:text-2xl font-black text-gray-950">
                        Welcome, {user.name}!
                      </h1>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-brand-green text-[11px] font-bold border border-emerald-200/80">
                        Verified Customer
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-3 flex-wrap">
                      {user.phone && <span>📞 {user.phone}</span>}
                      {user.email && !user.email.includes("@sadervubon.customer") && <span>✉️ {user.email}</span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={logout}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-gray-700 text-xs font-bold transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-t border-gray-100 mt-6 pt-5 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setDashboardTab("orders")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                    dashboardTab === "orders"
                      ? "bg-brand-green text-white shadow-xs"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>My Orders ({orders.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDashboardTab("address")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                    dashboardTab === "address"
                      ? "bg-brand-green text-white shadow-xs"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Saved Delivery Address</span>
                </button>

                <Link
                  href="/wishlist"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition whitespace-nowrap"
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>My Wishlist ({totalWishlistItems})</span>
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-green" />
                  <span>Cart ({totalItems})</span>
                </Link>
              </div>
            </div>

            {/* TAB CONTENT: ORDERS */}
            {dashboardTab === "orders" && (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-black text-gray-950">
                      Order History
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      View all your recent purchases and live delivery status
                    </p>
                  </div>

                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:underline"
                  >
                    <span>Shop More Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {ordersLoading ? (
                  <div className="py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green mx-auto mb-3" />
                    <p className="text-xs text-gray-500 font-semibold">Loading your orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-brand-green flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-8 h-8 stroke-[1.8]" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">
                      No Orders Yet!
                    </h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                      Explore pure honey, jaggery, mustard oil and authentic organic delicacies.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold shadow-md transition"
                    >
                      <span>Explore Shop</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-2xl border border-gray-200/90 p-5 hover:border-brand-green/50 transition-all bg-gray-50/50"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-gray-200/60">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-black text-gray-900 text-sm">
                                Order #{order.id}
                              </span>
                              <span
                                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                  order.status === "completed"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : order.status === "processing"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {order.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>
                                {new Date(order.dateCreated).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="text-xs text-gray-500 block leading-tight">Total Amount</span>
                              <strong className="text-base font-black text-gray-950">৳{order.total}</strong>
                            </div>

                            <Link
                              href={`/track-order?id=${order.id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-300 hover:border-brand-green text-gray-800 hover:text-brand-green text-xs font-bold transition shadow-2xs"
                            >
                              <Truck className="w-3.5 h-3.5 text-brand-green" />
                              <span>Track</span>
                            </Link>
                          </div>
                        </div>

                        {/* Items preview */}
                        {order.items && order.items.length > 0 && (
                          <div className="text-xs text-gray-600 space-y-1">
                            {order.items.slice(0, 3).map((item: any, idx: number) => (
                              <div key={idx} className="flex justify-between">
                                <span className="line-clamp-1">{item.name} × {item.quantity}</span>
                                <span className="font-bold text-gray-900">৳{item.total}</span>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <p className="text-[11px] text-gray-400 italic">
                                + {order.items.length - 3} more items
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: SAVED ADDRESS */}
            {dashboardTab === "address" && (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-black text-gray-950">
                      Saved Delivery Address
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      This address will be automatically pre-filled at checkout for faster ordering.
                    </p>
                  </div>

                  {!editingAddress && (
                    <button
                      type="button"
                      onClick={() => setEditingAddress(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-brand-green border border-emerald-200/80 text-xs font-bold hover:bg-emerald-100 transition cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Address</span>
                    </button>
                  )}
                </div>

                {addrSuccess && (
                  <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{addrSuccess}</span>
                  </div>
                )}

                {editingAddress ? (
                  <form onSubmit={handleSaveAddress} className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Receiver Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={addrForm.name}
                        onChange={(e) => setAddrForm({ ...addrForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Mobile Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={addrForm.phone}
                          onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">
                          Delivery City / District
                        </label>
                        <input
                          type="text"
                          required
                          value={addrForm.city}
                          onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Full Street Address
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={addrForm.address}
                        onChange={(e) => setAddrForm({ ...addrForm, address: e.target.value })}
                        placeholder="House/Apartment #, Road #, Area/Thana"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={addrSaving}
                        className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold flex items-center gap-2 shadow-xs transition"
                      >
                        {addrSaving ? (
                          <span>Saving...</span>
                        ) : (
                          <>
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Address</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingAddress(false)}
                        className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 max-w-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">
                          {user.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          📞 {user.phone || "No phone added yet"}
                        </p>
                        <p className="text-xs text-gray-700 font-medium mt-2 leading-relaxed">
                          {user.address ? (
                            <>
                              {user.address}
                              {user.city ? `, ${user.city}` : ""}
                            </>
                          ) : (
                            <span className="italic text-gray-400">
                              No address saved yet. Click &quot;Edit Address&quot; above to set your default shipping address.
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
