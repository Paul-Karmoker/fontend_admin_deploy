"use client";

import React, { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Users,
  LayoutDashboard,
  Globe,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLoginMutation } from "@/lib/redux/api/authApi";
import { useAuth } from "@/lib/hooks/useAuth";
import { useDispatch } from "react-redux";
import { checkAuthState } from "@/lib/redux/slices/authSlice";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const dispatch = useDispatch();

  // Check auth state on component mount
  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  useAuth(false);

  const router = useRouter();
  const [login, { isLoading, error }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.email || !formData.password) {
      setFormError("Please enter both email and password");
      return;
    }

    try {
      await login(formData).unwrap();
      router.push("/dashboard");
    } catch (err: any) {
      setFormError(
        err.data?.message || "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white text-zinc-950 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Left Panel - Enterprise Branding (Clean White/Zinc Theme) */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-50 p-16 flex-col justify-between relative border-r border-zinc-200 overflow-hidden">
        {/* Subtle Technical Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `linear-gradient(#e4e4e7 1px, transparent 1px), linear-gradient(90deg, #e4e4e7 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="mb-2">
                <Image
                  src="/Logo.gif"
                  alt="Logo"
                  width={130}
                  height={45}
                  priority
                  className="mix-blend-multiply"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-zinc-300"></span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">
                  Enterprise v2.0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full mb-8 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
              System Operational
            </span>
          </div>

          <h1 className="text-6xl font-bold tracking-tighter leading-[0.95] text-zinc-900 mb-8">
            The Central <br />
            <span className="text-zinc-400">Control Hub.</span>
          </h1>

          <p className="text-lg text-zinc-600 mb-12 leading-relaxed border-l-4 border-zinc-900 pl-6">
            Secure enterprise-grade access for organizational management,
            real-time analytics, and infrastructure oversight.
          </p>

          {/* Data Points Grid */}
          <div className="grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 shadow-xl shadow-zinc-200/50">
            {[
              { icon: BarChart3, label: "Analytics", desc: "Live Metrics" },
              { icon: Users, label: "Identity", desc: "Access Control" },
              { icon: ShieldCheck, label: "Security", desc: "ISO Certified" },
              { icon: Globe, label: "Network", desc: "Global Edge" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 hover:bg-zinc-50 transition-colors"
              >
                <item.icon className="w-6 h-6 text-zinc-900 mb-3" />
                <h3 className="font-bold text-xs text-zinc-900 uppercase tracking-widest">
                  {item.label}
                </h3>
                <p className="text-[10px] text-zinc-400 uppercase mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex justify-between items-end">
          <div className="font-mono text-[10px] text-zinc-400 space-y-1">
            <p>LOC: TERMINAL_01</p>
            <p>SSL: ACTIVE_ENCRYPTED</p>
          </div>
          <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">
            © 2026 Admin Dashboard Inc.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form (High Contrast White) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile View Header */}
          <div className="lg:hidden flex flex-col items-center mb-12">
            <Image
              src="/Logo.gif"
              alt="Logo"
              width={120}
              height={40}
              className="mb-4"
            />
            <div className="h-px w-12 bg-zinc-200"></div>
          </div>

          <div className="space-y-10">
            <div className="space-y-3">
              <h2 className="text-4xl font-black tracking-tight text-zinc-900 uppercase">
                Authenticate
              </h2>
              <p className="text-zinc-500 font-medium">
                Enter your administrative credentials to bridge the connection.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {(formError || error) && (
                <Alert
                  variant="destructive"
                  className="rounded-none border-red-100 bg-red-50 text-red-900 shadow-none py-4"
                >
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="ml-2 font-bold text-xs uppercase tracking-wide">
                    {formError ||
                      (error as any)?.data?.message ||
                      "Access Denied"}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400"
                  >
                    Corporate Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@enterprise.com"
                      className="pl-11 h-14 rounded-none border-zinc-200 bg-white focus:border-zinc-950 focus:ring-0 transition-all placeholder:text-zinc-300 text-zinc-900 font-medium"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400"
                    >
                      Access Token
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-[10px] font-bold text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest"
                    >
                      Reset Key?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-11 pr-12 h-14 rounded-none border-zinc-200 bg-white focus:border-zinc-950 focus:ring-0 transition-all placeholder:text-zinc-300 text-zinc-900"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-14 w-12 flex items-center justify-center text-zinc-300 hover:text-zinc-900 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 rounded-none bg-zinc-900 hover:bg-black text-white font-bold tracking-[0.3em] uppercase transition-all shadow-lg shadow-zinc-200 hover:shadow-zinc-300 active:scale-[0.99] disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <Zap className="h-4 w-4 animate-pulse fill-white" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Establish Connection <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="pt-10 flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-zinc-300">
                <div className="h-px w-8 bg-zinc-200"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Secure Entry Point
                </span>
                <div className="h-px w-8 bg-zinc-200"></div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 border border-zinc-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50">
                  <ShieldCheck className="w-5 h-5 text-zinc-400" />
                </div>
                {/* Placeholder for other security icons */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
