"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Calendar,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Megaphone,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

interface User {
  email: string;
  role: "admin" | "teacher" | "parent" | "student";
}

const navItems = {
  admin: [
    { icon: LayoutDashboard, label: "dashboard", href: "/dashboard" },
    { icon: Megaphone, label: "activities", href: "/admin/announcements" },
    { icon: GraduationCap, label: "students", href: "/admin/students" },
  ],
  teacher: [
    { icon: LayoutDashboard, label: "dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "courses", href: "/teacher/courses" },
    { icon: GraduationCap, label: "grades", href: "/teacher/grades" },
  ],
  parent: [
    { icon: LayoutDashboard, label: "dashboard", href: "/dashboard" },
    { icon: GraduationCap, label: "myChildren", href: "/parent/child" },
  ],
  student: [
    { icon: LayoutDashboard, label: "dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "courses", href: "/student/courses" },
  ],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push(`/${locale}/login`);
    }
    setIsLoading(false);
  }, [router, locale]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push(`/${locale}/login`);
  };

  const getNavItems = () => {
    if (!user) return [];
    return navItems[user.role] || [];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const isRTL = locale === "ar";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-primary-100 bg-white flex items-center justify-center">
              <Image src="/images/avicenne/logo.png" alt="Avicenne logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="font-bold text-lg">{locale === "ar" ? "مدرسة ابن سينا" : "Avicenne"}</span>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className={cn(
              "absolute top-16 bottom-0 w-64 bg-white shadow-xl",
              isRTL ? "right-0" : "left-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="p-4 space-y-1">
              {getNavItems().map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    pathname.includes(item.href)
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{t(item.label)}</span>
                </Link>
              ))}
              <hr className="my-4" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>{t("logout")}</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside
          className={cn(
            "hidden lg:flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300",
            isSidebarOpen ? "w-64" : "w-20"
          )}
        >
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-primary-100 bg-white flex items-center justify-center flex-shrink-0">
                <Image src="/images/avicenne/logo.png" alt="Avicenne logo" width={40} height={40} className="object-contain" />
              </div>
              {isSidebarOpen && (
                <span className="font-bold text-lg text-gray-900 truncate">
                  {locale === "ar" ? "مدرسة ابن سينا الخاصة" : "Ecole Privee Avicenne"}
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {getNavItems().map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  pathname.includes(item.href)
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50",
                  !isSidebarOpen && "justify-center"
                )}
                title={t(item.label)}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span>{t(item.label)}</span>}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-100 space-y-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-50 text-gray-600"
            >
              {isSidebarOpen ? (
                isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />
              ) : (
                isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full",
                !isSidebarOpen && "justify-center"
              )}
              title={t("logout")}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span>{t("logout")}</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Top Bar */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-900 capitalize">
                  {user.role}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <LanguageSwitcher currentLocale={locale} />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 font-medium text-sm">
                      {user.email[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.email.split("@")[0]}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
