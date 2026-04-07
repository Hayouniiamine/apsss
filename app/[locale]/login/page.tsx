"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Mail, Lock, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function LoginPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication logic
    const mockUsers = [
      { email: "admin@ecoleavicenne.tn", password: "admin123", role: "admin" },
      { email: "teacher@ecoleavicenne.tn", password: "teacher123", role: "teacher" },
      { email: "parent@email.com", password: "parent123", role: "parent" },
      { email: "student@ecoleavicenne.tn", password: "student123", role: "student" },
    ];

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Store user info in localStorage (in real app, use secure cookies/JWT)
      localStorage.setItem("user", JSON.stringify(user));
      router.push(`/${locale}/dashboard`);
    } else {
      setError(t("invalidCredentials"));
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex flex-col">
      {/* Header */}
      <header className="w-full p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-primary-100 bg-white flex items-center justify-center">
              <Image src="/images/avicenne/logo.png" alt="Avicenne logo" width={40} height={40} className="object-contain" priority />
            </div>
            <span className="font-bold text-xl text-gray-900">
              {locale === "ar" ? "مدرسة ابن سينا الخاصة" : "Ecole Privee Avicenne"}
            </span>
          </Link>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {t("login")}
              </h1>
              <p className="text-gray-600 text-sm">
                {locale === "ar" 
                  ? "أدخل بياناتك للوصول إلى حسابك" 
                  : "Entrez vos identifiants pour accéder à votre compte"}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("email")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder={locale === "ar" ? "بريدك@مثال.com" : "votre@email.com"}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  {locale === "ar" ? "تذكرني" : "Se souvenir de moi"}
                </label>
                <Link 
                  href="#" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {t("forgotPassword")}
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full py-3 px-4 bg-primary-600 text-white font-medium rounded-lg",
                  "hover:bg-primary-700 focus:ring-4 focus:ring-primary-500/20",
                  "transition-all duration-200 flex items-center justify-center gap-2",
                  isLoading && "opacity-70 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  t("submit")
                )}
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center mb-3">
                {locale === "ar" ? "حسابات تجريبية:" : "Comptes de démonstration:"}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { email: "admin@ecoleavicenne.tn", pass: "admin123" },
                  { email: "teacher@ecoleavicenne.tn", pass: "teacher123" },
                  { email: "parent@email.com", pass: "parent123" },
                  { email: "student@ecoleavicenne.tn", pass: "student123" },
                ].map((acc, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setEmail(acc.email);
                      setPassword(acc.pass);
                    }}
                    className="p-2 bg-gray-50 rounded text-gray-600 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="font-medium">{acc.email}</div>
                    <div className="text-gray-400">{acc.pass}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
