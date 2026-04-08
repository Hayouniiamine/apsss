"use client";

import { useParams } from "next/navigation";
import { TrendingUp, Calendar, BookOpen, Award, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  mockGrades,
  mockAttendance,
  mockActivities,
  mockCourses,
  getStudentPayments,
  getStudentRemarksForParent,
} from "@/lib/mock-data";

export default function ParentChildPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const t = (ar: string, fr: string) => (locale === "ar" ? ar : fr);

  // Mock child data - in real app, fetch based on parent's children
  const child = {
    name: "محمد علي",
    class: t("القسم الأول أ", "Classe 1ère A"),
    age: 7,
    studentId: "6",
  };

  const childGrades = mockGrades.filter((g) => g.studentId === child.studentId);
  const childAttendance = mockAttendance.filter((a) => a.studentId === child.studentId);
  const recentActivities = mockActivities.slice(0, 3);
  const childRemarks = getStudentRemarksForParent(child.studentId, "4");
  const paymentHistory = getStudentPayments(child.studentId);

  const averageGrade =
    childGrades.length > 0
      ? (
          childGrades.reduce((acc, g) => acc + (g.score / g.maxScore) * 20, 0) /
          childGrades.length
        ).toFixed(1)
      : "0";

  const attendanceRate =
    childAttendance.length > 0
      ? Math.round(
          (childAttendance.filter((a) => a.status === "present").length /
            childAttendance.length) *
            100
        )
      : 0;

  const paidCount = paymentHistory.filter((p) => p.status === "paid").length;

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">{t("تفاصيل الطفل", "Détails de l'enfant")}</h1>
        <p className="page-description">
          {t("متابعة التقدم الدراسي والأنشطة", "Suivi des progrès scolaires et activités")}
        </p>
      </div>

      {/* Child Profile Card */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-3xl flex-shrink-0">
            👦
          </div>
          <div className="flex-1 text-center sm:text-start">
            <h2 className="text-2xl font-bold text-gray-900">{child.name}</h2>
            <p className="text-gray-500 mt-0.5">{child.class}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                {childGrades.length} {t("مادة", "matières")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                {t("ممتاز", "Excellent")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                {paidCount}/{paymentHistory.length} {t("رسوم مدفوعة", "paiements")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{t("المعدل العام", "Moyenne générale")}</p>
              <p className="text-xl font-bold text-gray-900">{averageGrade}/20</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{t("نسبة الحضور", "Taux de présence")}</p>
              <p className="text-xl font-bold text-gray-900">{attendanceRate}%</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{t("عدد المواد", "Nombre de matières")}</p>
              <p className="text-xl font-bold text-gray-900">{childGrades.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{t("الأنشطة", "Activités")}</p>
              <p className="text-xl font-bold text-gray-900">{recentActivities.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Grades Section */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {t("الدرجات الحالية", "Notes actuelles")}
          </h3>
          <div className="space-y-3">
            {childGrades.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">
                {t("لا توجد درجات بعد", "Aucune note disponible")}
              </p>
            )}
            {childGrades.map((grade) => {
              const course = mockCourses.find((c) => c.id === grade.courseId);
              const percentage = (grade.score / grade.maxScore) * 100;
              return (
                <div
                  key={grade.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{course?.title ?? t("مادة", "Matière")}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(grade.date, locale)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          percentage >= 80
                            ? "bg-emerald-500"
                            : percentage >= 60
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className={`font-bold text-sm ${
                      percentage >= 80 ? "text-emerald-600" : percentage >= 60 ? "text-amber-600" : "text-red-600"
                    }`}>
                      {grade.score}/{grade.maxScore}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attendance Section */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {t("سجل الحضور", "Registre de présence")}
          </h3>
          <div className="space-y-3">
            {childAttendance.map((record) => {
              const statusConfig = {
                present: {
                  dot: "bg-emerald-500",
                  badge: "bg-emerald-100 text-emerald-700",
                  label: t("حاضر", "Présent"),
                },
                absent: {
                  dot: "bg-red-500",
                  badge: "bg-red-100 text-red-700",
                  label: t("غائب", "Absent"),
                },
                late: {
                  dot: "bg-amber-500",
                  badge: "bg-amber-100 text-amber-700",
                  label: t("متأخر", "En retard"),
                },
                excused: {
                  dot: "bg-blue-500",
                  badge: "bg-blue-100 text-blue-700",
                  label: t("مستأذن", "Excusé"),
                },
              };
              const cfg = statusConfig[record.status as keyof typeof statusConfig] ?? statusConfig.present;
              return (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    <span className="text-sm text-gray-700">{formatDate(record.date, locale)}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.badge}`}>
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Remarks */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {t("ملاحظات المعلم", "Remarques de l'enseignant")}
          </h3>
          <div className="space-y-3">
            {childRemarks.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">
                {t("لا توجد ملاحظات", "Aucune remarque")}
              </p>
            )}
            {childRemarks.map((remark) => (
              <div
                key={remark.id}
                className="rounded-xl bg-amber-50 border border-amber-100 p-4"
              >
                <p className="text-sm text-gray-800">{remark.message}</p>
                <p className="mt-1.5 text-xs text-gray-400">{formatDate(remark.createdAt, locale)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payments */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {t("حالة الرسوم الشهرية", "État des frais mensuels")}
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className={`flex items-center justify-between rounded-xl p-3 ${
                  payment.status === "paid"
                    ? "bg-emerald-50 border border-emerald-100"
                    : payment.status === "pending"
                    ? "bg-amber-50 border border-amber-100"
                    : "bg-red-50 border border-red-100"
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{payment.month}</p>
                  <p className="text-xs text-gray-500">{payment.amount} TND</p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                    payment.status === "paid"
                      ? "bg-emerald-100 text-emerald-700"
                      : payment.status === "pending"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {payment.status === "paid" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  {payment.status === "paid"
                    ? t("مدفوع", "Payé")
                    : payment.status === "pending"
                    ? t("قيد الانتظار", "En attente")
                    : t("متأخر", "En retard")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {t("أحدث الأنشطة", "Dernières activités")}
        </h3>
        <div className="grid gap-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="card p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">
                    {activity.authorRole === "teacher" ? "👨‍🏫" : "🏫"}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-400 mb-1.5">
                    {activity.authorName} • {formatDate(activity.createdAt, locale)}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">{activity.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
