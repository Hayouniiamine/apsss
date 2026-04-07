"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { mockAnnouncements } from "@/lib/mock-data";

export default function AdminAnnouncementsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState<"all" | "parents" | "teachers" | "students">("all");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTitle("");
    setContent("");
    setAudience("all");
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{locale === "ar" ? "إدارة الإعلانات" : "Announcements Management"}</h1>
        <p className="page-description">
          {locale === "ar" ? "نشر الإعلانات للفئات المستهدفة." : "Publish announcements to target audiences."}
        </p>
      </div>

      <form onSubmit={onSubmit} className="card p-5 space-y-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className="input-field px-3 py-2" placeholder={locale === "ar" ? "عنوان الإعلان" : "Announcement title"} />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="input-field px-3 py-2" rows={4} placeholder={locale === "ar" ? "محتوى الإعلان" : "Announcement content"} />
        <select value={audience} onChange={(e) => setAudience(e.target.value as "all" | "parents" | "teachers" | "students")} className="input-field px-3 py-2">
          <option value="all">{locale === "ar" ? "الكل" : "All"}</option>
          <option value="parents">{locale === "ar" ? "أولياء الأمور" : "Parents"}</option>
          <option value="teachers">{locale === "ar" ? "المعلمون" : "Teachers"}</option>
          <option value="students">{locale === "ar" ? "الطلاب" : "Students"}</option>
        </select>
        <button type="submit" className="btn-primary">{locale === "ar" ? "نشر" : "Publish"}</button>
      </form>

      <div className="card p-5">
        <h2 className="mb-3 font-semibold">{locale === "ar" ? "الإعلانات الحالية" : "Current Announcements"}</h2>
        <div className="space-y-3">
          {mockAnnouncements.map((a) => (
            <div key={a.id} className="rounded-lg bg-gray-50 p-3">
              <p className="font-medium">{a.title}</p>
              <p className="text-sm text-gray-600">{a.content}</p>
              <p className="mt-1 text-xs text-gray-500">{a.audience} - {a.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
