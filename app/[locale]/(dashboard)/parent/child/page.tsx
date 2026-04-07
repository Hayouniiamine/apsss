"use client";

import { useParams } from "next/navigation";
import { TrendingUp, Calendar, BookOpen, Award, Clock } from "lucide-react";
import { formatDate, getGradeColor } from "@/lib/utils";
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

  // Mock child data - in real app, fetch based on parent's children
  const child = {
    name: "محمد علي",
    class: "الصف الأول أ",
    age: 7,
    studentId: "6"
  };

  const childGrades = mockGrades.filter(g => g.studentId === child.studentId);
  const childAttendance = mockAttendance.filter(a => a.studentId === child.studentId);
  const recentActivities = mockActivities.slice(0, 3);
  const childRemarks = getStudentRemarksForParent(child.studentId, "4");
  const paymentHistory = getStudentPayments(child.studentId);

  const averageGrade = childGrades.length > 0
    ? (childGrades.reduce((acc, g) => acc + (g.score / g.maxScore) * 20, 0) / childGrades.length).toFixed(1)
    : "0";

  const attendanceRate = childAttendance.length > 0
    ? Math.round((childAttendance.filter(a => a.status === "present").length / childAttendance.length) * 100)
    : 0;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{locale === "ar" ? "تفاصيل الطفل" : "Détails de l'enfant"}</h1>
        <p className="page-description">
          {locale === "ar" ? "متابعة التقدم الدراسي والأنشطة" : "Suivi des progrès scolaires et activités"}
        </p>
      </div>

      {/* Child Profile Card */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-3xl">
            👦
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{child.name}</h2>
            <p className="text-gray-600">{child.class}</p>
            <div className="flex gap-4 mt-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                <BookOpen className="w-4 h-4" />
                {locale === "ar" ? "4 مواد" : "4 matières"}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                <Award className="w-4 h-4" />
                {locale === "ar" ? "ممتاز" : "Excellent"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{locale === "ar" ? "المعدل العام" : "Moyenne générale"}</p>
              <p className="text-xl font-bold text-gray-900">{averageGrade}/20</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{locale === "ar" ? "نسبة الحضور" : "Taux de présence"}</p>
              <p className="text-xl font-bold text-gray-900">{attendanceRate}%</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{locale === "ar" ? "عدد المواد" : "Nombre de matières"}</p>
              <p className="text-xl font-bold text-gray-900">{childGrades.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{locale === "ar" ? "الأنشطة" : "Activités"}</p>
              <p className="text-xl font-bold text-gray-900">{recentActivities.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Grades Section */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {locale === "ar" ? "الدرجات الحالية" : "Notes actuelles"}
          </h3>
          <div className="space-y-3">
            {childGrades.map((grade) => {
              const course = mockCourses.find(c => c.id === grade.courseId);
              const percentage = (grade.score / grade.maxScore) * 100;
              return (
                <div key={grade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{course?.title}</p>
                    <p className="text-sm text-gray-500">{formatDate(grade.date, locale)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          percentage >= 80 ? "bg-emerald-500" :
                          percentage >= 60 ? "bg-amber-500" : "bg-red-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="font-bold text-gray-900">
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
            {locale === "ar" ? "سجل الحضور اليومي" : "Daily Attendance"}
          </h3>
          <div className="space-y-3">
            {childAttendance.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    record.status === "present" ? "bg-emerald-500" :
                    record.status === "absent" ? "bg-red-500" :
                    record.status === "late" ? "bg-amber-500" : "bg-blue-500"
                  }`} />
                  <span className="text-gray-700">{formatDate(record.date, locale)}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  record.status === "present" ? "bg-emerald-100 text-emerald-700" :
                  record.status === "absent" ? "bg-red-100 text-red-700" :
                  record.status === "late" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {record.status === "present" ? (locale === "ar" ? "حاضر" : "Présent") :
                   record.status === "absent" ? (locale === "ar" ? "غائب" : "Absent") :
                   record.status === "late" ? (locale === "ar" ? "متأخر" : "En retard") :
                   (locale === "ar" ? "مستأذن" : "Excusé")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {locale === "ar" ? "ملاحظات المعلم (خاصة بولي الأمر)" : "Teacher Remarks (Parent-only)"}
          </h3>
          <div className="space-y-3">
            {childRemarks.map((remark) => (
              <div key={remark.id} className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                <p className="text-sm text-gray-800">{remark.message}</p>
                <p className="mt-1 text-xs text-gray-500">{formatDate(remark.createdAt, locale)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {locale === "ar" ? "حالة دفع الرسوم الشهرية" : "Monthly Fee Payment Status"}
          </h3>
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="font-medium text-gray-900">{payment.month}</p>
                  <p className="text-xs text-gray-500">{payment.amount} TND</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  payment.status === "paid"
                    ? "bg-emerald-100 text-emerald-700"
                    : payment.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {payment.status === "paid"
                    ? locale === "ar" ? "مدفوع" : "Paid"
                    : payment.status === "pending"
                    ? locale === "ar" ? "قيد الانتظار" : "Pending"
                    : locale === "ar" ? "متأخر" : "Overdue"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {locale === "ar" ? "أحدث الأنشطة" : "Dernières activités"}
        </h3>
        <div className="grid gap-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="card p-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    {activity.authorName} • {formatDate(activity.createdAt, locale)}
                  </p>
                  <p className="text-gray-600 line-clamp-2">{activity.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
