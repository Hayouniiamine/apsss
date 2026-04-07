"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { mockCourses, mockStudents, getStudentHomeworks } from "@/lib/mock-data";

export default function StudentCoursesPage() {
  const params = useParams();
  const locale = params.locale as string;
  const studentId = "6";
  const student = mockStudents.find((s) => s.id === studentId);

  const courses = useMemo(
    () => mockCourses.filter((c) => c.classId === student?.classId),
    [student?.classId]
  );
  const homeworks = useMemo(() => getStudentHomeworks(studentId), [studentId]);

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{locale === "ar" ? "الدروس والواجبات" : "Courses & Homework"}</h1>
        <p className="page-description">
          {locale === "ar" ? "تابع دروسك والواجبات المطلوبة هذا الأسبوع." : "Check your courses and this week's homework."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-3 font-semibold">{locale === "ar" ? "موادي" : "My Courses"}</h2>
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="rounded-lg bg-gray-50 p-3">
                <p className="font-medium">{course.title}</p>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="mb-3 font-semibold">{locale === "ar" ? "واجباتي" : "My Homework"}</h2>
          <div className="space-y-3">
            {homeworks.map((hw) => (
              <div key={hw.id} className="rounded-lg bg-gray-50 p-3">
                <p className="font-medium">{hw.title}</p>
                <p className="text-sm text-gray-600">{hw.instructions}</p>
                <p className="mt-1 text-xs text-primary-700">
                  {locale === "ar" ? "آخر أجل:" : "Due:"} {hw.dueDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
