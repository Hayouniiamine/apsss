"use client";

import { FormEvent, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { mockClasses, mockCourses, mockHomeworks, mockRemarks, mockStudents } from "@/lib/mock-data";

export default function TeacherCoursesPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [homeworkTitle, setHomeworkTitle] = useState("");
  const [homeworkDue, setHomeworkDue] = useState("");
  const [remarkStudentId, setRemarkStudentId] = useState("6");
  const [remarkMessage, setRemarkMessage] = useState("");

  const teacherId = "2";
  const teacherClassIds = useMemo(
    () => mockClasses.filter((c) => c.teacherId === teacherId).map((c) => c.id),
    [teacherId]
  );

  const teacherCourses = useMemo(
    () => mockCourses.filter((c) => c.teacherId === teacherId),
    [teacherId]
  );

  const teacherHomeworks = useMemo(
    () => mockHomeworks.filter((h) => teacherClassIds.includes(h.classId)),
    [teacherClassIds]
  );

  const teacherRemarks = useMemo(
    () => mockRemarks.filter((r) => r.teacherId === teacherId),
    [teacherId]
  );

  const onCreateCourse = (e: FormEvent) => {
    e.preventDefault();
    setCourseTitle("");
    setCourseDesc("");
  };

  const onCreateHomework = (e: FormEvent) => {
    e.preventDefault();
    setHomeworkTitle("");
    setHomeworkDue("");
  };

  const onCreateRemark = (e: FormEvent) => {
    e.preventDefault();
    setRemarkMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{locale === "ar" ? "إدارة الدروس والواجبات" : "Courses & Homework"}</h1>
        <p className="page-description">
          {locale === "ar"
            ? "أنشئ الدروس، أضف الواجبات، وسجل ملاحظات خاصة يراها ولي الأمر فقط."
            : "Create courses, assign homework, and add parent-only student remarks."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={onCreateCourse} className="card p-5 space-y-3">
          <h2 className="font-semibold">{locale === "ar" ? "إضافة درس" : "Create Course"}</h2>
          <input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required className="input-field px-3 py-2" placeholder={locale === "ar" ? "عنوان الدرس" : "Course title"} />
          <textarea value={courseDesc} onChange={(e) => setCourseDesc(e.target.value)} required className="input-field px-3 py-2" rows={3} placeholder={locale === "ar" ? "وصف الدرس" : "Course description"} />
          <button type="submit" className="btn-primary w-full">{locale === "ar" ? "حفظ" : "Save"}</button>
        </form>

        <form onSubmit={onCreateHomework} className="card p-5 space-y-3">
          <h2 className="font-semibold">{locale === "ar" ? "إضافة واجب" : "Create Homework"}</h2>
          <input value={homeworkTitle} onChange={(e) => setHomeworkTitle(e.target.value)} required className="input-field px-3 py-2" placeholder={locale === "ar" ? "عنوان الواجب" : "Homework title"} />
          <input type="date" value={homeworkDue} onChange={(e) => setHomeworkDue(e.target.value)} required className="input-field px-3 py-2" />
          <button type="submit" className="btn-primary w-full">{locale === "ar" ? "نشر الواجب" : "Publish"}</button>
        </form>

        <form onSubmit={onCreateRemark} className="card p-5 space-y-3">
          <h2 className="font-semibold">{locale === "ar" ? "ملاحظة خاصة لولي الأمر" : "Parent-only Remark"}</h2>
          <select value={remarkStudentId} onChange={(e) => setRemarkStudentId(e.target.value)} className="input-field px-3 py-2">
            {mockStudents.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <textarea value={remarkMessage} onChange={(e) => setRemarkMessage(e.target.value)} required className="input-field px-3 py-2" rows={3} placeholder={locale === "ar" ? "اكتب الملاحظة..." : "Write remark..."} />
          <button type="submit" className="btn-primary w-full">{locale === "ar" ? "إرسال" : "Submit"}</button>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-5">
          <h3 className="mb-3 font-semibold">{locale === "ar" ? "دروسي" : "My Courses"}</h3>
          <div className="space-y-2 text-sm">
            {teacherCourses.map((c) => <div key={c.id} className="rounded-lg bg-gray-50 p-3">{c.title}</div>)}
          </div>
        </div>
        <div className="card p-5">
          <h3 className="mb-3 font-semibold">{locale === "ar" ? "واجبات منشورة" : "Published Homework"}</h3>
          <div className="space-y-2 text-sm">
            {teacherHomeworks.map((h) => <div key={h.id} className="rounded-lg bg-gray-50 p-3">{h.title} - {h.dueDate}</div>)}
          </div>
        </div>
        <div className="card p-5">
          <h3 className="mb-3 font-semibold">{locale === "ar" ? "ملاحظات خاصة" : "Private Remarks"}</h3>
          <div className="space-y-2 text-sm">
            {teacherRemarks.map((r) => <div key={r.id} className="rounded-lg bg-gray-50 p-3">{r.message}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
