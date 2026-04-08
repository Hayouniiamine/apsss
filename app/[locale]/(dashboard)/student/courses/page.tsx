"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { mockCourses, mockStudents, getStudentHomeworks, mockGrades } from "@/lib/mock-data";
import { BookOpen, ClipboardList, Calendar, TrendingUp } from "lucide-react";

export default function StudentCoursesPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const t = (ar: string, fr: string) => (locale === "ar" ? ar : fr);

  const studentId = "6";
  const student = mockStudents.find((s) => s.id === studentId);

  const courses = useMemo(
    () => mockCourses.filter((c) => c.classId === student?.classId),
    [student?.classId]
  );
  const homeworks = useMemo(() => getStudentHomeworks(studentId), []);
  const grades = useMemo(
    () => mockGrades.filter((g) => g.studentId === studentId).slice(0, 6),
    []
  );

  const avgGrade =
    grades.length > 0
      ? (grades.reduce((acc, g) => acc + (g.score / g.maxScore) * 20, 0) / grades.length).toFixed(1)
      : "–";

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">{t("الدروس والواجبات", "Cours et devoirs")}</h1>
        <p className="page-description">
          {t("تابع دروسك والواجبات المطلوبة.", "Suivez vos cours et les devoirs à rendre.")}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-primary-600">{courses.length}</p>
          <p className="text-xs text-gray-500 mt-1">{t("مادة", "Matières")}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{homeworks.length}</p>
          <p className="text-xs text-gray-500 mt-1">{t("واجب", "Devoirs")}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{avgGrade}</p>
          <p className="text-xs text-gray-500 mt-1">{t("معدل /20", "Moyenne /20")}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Courses */}
        <div className="card p-5">
          <h2 className="mb-4 font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-600" />
            {t("موادي", "Mes matières")}
          </h2>
          <div className="space-y-3">
            {courses.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">
                {t("لا توجد مواد", "Aucune matière")}
              </p>
            )}
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-start gap-3 rounded-xl bg-gray-50 hover:bg-primary-50 border border-transparent hover:border-primary-100 p-4 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{course.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
                  {course.subject && (
                    <span className="mt-1 inline-block text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                      {course.subject}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Homeworks */}
        <div className="card p-5">
          <h2 className="mb-4 font-bold text-gray-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-amber-600" />
            {t("واجباتي", "Mes devoirs")}
          </h2>
          <div className="space-y-3">
            {homeworks.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">
                {t("لا توجد واجبات", "Aucun devoir")}
              </p>
            )}
            {homeworks.map((hw) => {
              const isOverdue = new Date(hw.dueDate) < new Date();
              return (
                <div
                  key={hw.id}
                  className={`flex items-start gap-3 rounded-xl p-4 border transition-all ${
                    isOverdue
                      ? "bg-red-50 border-red-100"
                      : "bg-amber-50 border-amber-100"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isOverdue ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"
                  }`}>
                    <ClipboardList className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{hw.title}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{hw.instructions}</p>
                    <span className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${
                      isOverdue ? "text-red-600" : "text-amber-700"
                    }`}>
                      <Calendar className="w-3 h-3" />
                      {t("آخر أجل:", "Date limite :")} {hw.dueDate}
                      {isOverdue && (
                        <span className="mr-1 rtl:mr-0 rtl:ml-1">
                          ({t("منتهي", "Expiré")})
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Grades */}
      <div className="card p-5">
        <h2 className="mb-4 font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          {t("درجاتي الأخيرة", "Mes dernières notes")}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {grades.map((grade) => {
            const course = mockCourses.find((c) => c.id === grade.courseId);
            const pct = (grade.score / grade.maxScore) * 100;
            return (
              <div
                key={grade.id}
                className={`rounded-xl p-4 border ${
                  pct >= 80
                    ? "bg-emerald-50 border-emerald-100"
                    : pct >= 60
                    ? "bg-blue-50 border-blue-100"
                    : "bg-red-50 border-red-100"
                }`}
              >
                <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                  {course?.title ?? t("مادة", "Matière")}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{grade.date}</p>
                <div className="flex items-end justify-between mt-2">
                  <div className="w-full me-3">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <progress
                        className="w-full h-full rounded-full"
                        value={pct}
                        max={100}
                        aria-label={`${pct.toFixed(0)}%`}
                      />
                    </div>
                  </div>
                  <span className={`text-lg font-bold flex-shrink-0 ${
                    pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-blue-600" : "text-red-600"
                  }`}>
                    {grade.score}
                    <span className="text-xs text-gray-400">/{grade.maxScore}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
