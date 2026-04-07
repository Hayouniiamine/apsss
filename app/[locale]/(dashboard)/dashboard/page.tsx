"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { mockStats, mockActivities } from "@/lib/mock-data";
import type { User } from "@/types";

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  trend?: string;
  color: string;
}

function StatCard({ icon: Icon, title, value, trend, color }: StatCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {trend}
            </p>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", color)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity, locale }: { activity: typeof mockActivities[0]; locale: string }) {
  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">
            {activity.authorRole === "teacher" ? "👨‍🏫" : activity.authorRole === "admin" ? "🏫" : "👤"}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-gray-900">{activity.title}</h4>
              <p className="text-sm text-gray-500">
                {activity.authorName} • {formatDate(activity.createdAt, locale)}
              </p>
            </div>
          </div>
          <p className="text-gray-600 mt-2 line-clamp-2">{activity.content}</p>
          {activity.images.length > 0 && (
            <div className="flex gap-2 mt-3">
              {activity.images.slice(0, 3).map((img, i) => (
                <div key={i} className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                  📷
                </div>
              ))}
              {activity.images.length > 3 && (
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                  +{activity.images.length - 3}
                </div>
              )}
            </div>
          )}
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <button className="flex items-center gap-1 hover:text-primary-600">
              <span>❤️</span> {activity.likes}
            </button>
            <button className="flex items-center gap-1 hover:text-primary-600">
              <span>💬</span> {activity.comments.length}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const renderAdminDashboard = () => (
    <>
      <div className="page-header">
        <h1 className="page-title">{t("dashboard.welcome")}، {user.email.split("@")[0]}</h1>
        <p className="page-description">
          {locale === "ar" ? "نظرة عامة على المدرسة" : "Aperçu de l'école"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard
          icon={Users}
          title={t("dashboard.stats.students")}
          value={mockStats.totalStudents}
          trend="+5%"
          color="bg-blue-500"
        />
        <StatCard
          icon={GraduationCap}
          title={t("dashboard.stats.teachers")}
          value={mockStats.totalTeachers}
          color="bg-emerald-500"
        />
        <StatCard
          icon={Users}
          title={t("dashboard.stats.parents")}
          value={mockStats.totalParents}
          color="bg-violet-500"
        />
        <StatCard
          icon={BookOpen}
          title={t("dashboard.stats.classes")}
          value={mockStats.totalClasses}
          color="bg-amber-500"
        />
        <StatCard
          icon={TrendingUp}
          title={t("dashboard.stats.averageGrade")}
          value={mockStats.averageGrade}
          trend="+2%"
          color="bg-rose-500"
        />
        <StatCard
          icon={Clock}
          title={t("dashboard.stats.attendance")}
          value={`${mockStats.attendanceRate}%`}
          color="bg-cyan-500"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t("dashboard.recentActivities")}
            </h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              {t("common.viewAll")}
              {isRTL ? <ChevronLeft className="w-4 h-4 inline mr-1" /> : <ChevronRight className="w-4 h-4 inline ml-1" />}
            </button>
          </div>
          <div className="space-y-4">
            {mockActivities.slice(0, 3).map((activity) => (
              <ActivityCard key={activity.id} activity={activity} locale={locale} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t("dashboard.quickActions")}
          </h2>
          <div className="card p-4 space-y-3">
            {[
              { label: locale === "ar" ? "إضافة معلم" : "Ajouter un enseignant", icon: "+" },
              { label: locale === "ar" ? "إضافة طالب" : "Ajouter un élève", icon: "+" },
              { label: locale === "ar" ? "إنشاء فصل" : "Créer une classe", icon: "+" },
              { label: locale === "ar" ? "نشر إعلان" : "Publier une annonce", icon: "📢" },
            ].map((action, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                  {action.icon}
                </span>
                <span className="font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderTeacherDashboard = () => (
    <>
      <div className="page-header">
        <h1 className="page-title">{t("dashboard.welcome")}، {user.email.split("@")[0]}</h1>
        <p className="page-description">
          {locale === "ar" ? "إدارة الفصول والدرجات" : "Gestion des classes et notes"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={BookOpen}
          title={locale === "ar" ? "فصولي" : "Mes classes"}
          value={2}
          color="bg-blue-500"
        />
        <StatCard
          icon={Users}
          title={locale === "ar" ? "طلابي" : "Mes élèves"}
          value={49}
          color="bg-emerald-500"
        />
        <StatCard
          icon={GraduationCap}
          title={locale === "ar" ? "التقييمات" : "Évaluations"}
          value={12}
          color="bg-violet-500"
        />
        <StatCard
          icon={Calendar}
          title={locale === "ar" ? "الأنشطة" : "Activités"}
          value={5}
          color="bg-amber-500"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t("dashboard.recentActivities")}
            </h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              {t("common.viewAll")}
            </button>
          </div>
          <div className="space-y-4">
            {mockActivities.filter(a => a.authorRole === "teacher").map((activity) => (
              <ActivityCard key={activity.id} activity={activity} locale={locale} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t("dashboard.quickActions")}
          </h2>
          <div className="card p-4 space-y-3">
            {[
              { label: locale === "ar" ? "إضافة درجة" : "Ajouter une note", icon: "📝" },
              { label: locale === "ar" ? "نشر نشاط" : "Publier une activité", icon: "📸" },
              { label: locale === "ar" ? "تسجيل حضور" : "Marquer présence", icon: "✓" },
            ].map((action, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-xl">{action.icon}</span>
                <span className="font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderParentDashboard = () => (
    <>
      <div className="page-header">
        <h1 className="page-title">{t("dashboard.welcome")}، {user.email.split("@")[0]}</h1>
        <p className="page-description">
          {locale === "ar" ? "متابعة تقدم أبنائكم" : "Suivi des progrès de vos enfants"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={Users}
          title={locale === "ar" ? "أبنائي" : "Mes enfants"}
          value={2}
          color="bg-blue-500"
        />
        <StatCard
          icon={TrendingUp}
          title={locale === "ar" ? "المعدل العام" : "Moyenne générale"}
          value="16.5/20"
          trend="+0.5"
          color="bg-emerald-500"
        />
        <StatCard
          icon={Clock}
          title={locale === "ar" ? "نسبة الحضور" : "Taux de présence"}
          value="94%"
          color="bg-violet-500"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t("dashboard.recentActivities")}
            </h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              {t("common.viewAll")}
            </button>
          </div>
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} locale={locale} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === "ar" ? "أبنائي" : "Mes enfants"}
          </h2>
          <div className="space-y-4">
            {[
              { name: "محمد علي", grade: "الصف الأول أ", avg: "17.5", status: "good" },
              { name: "أحمد خالد", grade: "الصف الأول أ", avg: "15.5", status: "average" },
            ].map((child, i) => (
              <div key={i} className="card p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-xl">👦</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{child.name}</h4>
                    <p className="text-sm text-gray-500">{child.grade}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-600">{child.avg}</div>
                    <div className="text-xs text-gray-500">/20</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderStudentDashboard = () => (
    <>
      <div className="page-header">
        <h1 className="page-title">{t("dashboard.welcome")}، {user.email.split("@")[0]}</h1>
        <p className="page-description">
          {locale === "ar" ? "تقدمك الدراسي" : "Vos progrès scolaires"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={BookOpen}
          title={locale === "ar" ? "دوراتي" : "Mes cours"}
          value={4}
          color="bg-blue-500"
        />
        <StatCard
          icon={TrendingUp}
          title={locale === "ar" ? "معدلي" : "Ma moyenne"}
          value="16.5/20"
          color="bg-emerald-500"
        />
        <StatCard
          icon={Clock}
          title={locale === "ar" ? "حضوري" : "Ma présence"}
          value="95%"
          color="bg-violet-500"
        />
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {locale === "ar" ? "درجاتي الأخيرة" : "Mes dernières notes"}
        </h2>
        <div className="space-y-3">
          {[
            { subject: "الرياضيات", score: 18, max: 20, date: "2025-01-15" },
            { subject: "اللغة العربية", score: 16, max: 20, date: "2025-01-14" },
            { subject: "العلوم", score: 19, max: 20, date: "2025-01-13" },
          ].map((grade, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{grade.subject}</div>
                <div className="text-sm text-gray-500">{formatDate(grade.date, locale)}</div>
              </div>
              <div className="text-lg font-bold text-primary-600">
                {grade.score}/{grade.max}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  switch (user.role) {
    case "admin":
      return renderAdminDashboard();
    case "teacher":
      return renderTeacherDashboard();
    case "parent":
      return renderParentDashboard();
    case "student":
      return renderStudentDashboard();
    default:
      return null;
  }
}
