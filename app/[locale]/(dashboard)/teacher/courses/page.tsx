"use client";

import { FormEvent, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { mockClasses, mockCourses, mockHomeworks, mockRemarks, mockStudents } from "@/lib/mock-data";
import type { Course, Homework, Remark } from "@/types";
import {
  BookOpen,
  Plus,
  Trash2,
  X,
  ClipboardList,
  MessageSquare,
  Calendar,
  User,
  CheckCircle,
} from "lucide-react";

type ActiveTab = "courses" | "homework" | "remarks";

export default function TeacherCoursesPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const t = (ar: string, fr: string) => (locale === "ar" ? ar : fr);

  const teacherId = "2";

  // Local state for CRUD
  const [courses, setCourses] = useState<Course[]>(() =>
    mockCourses.filter((c) => c.teacherId === teacherId)
  );
  const [homeworks, setHomeworks] = useState<Homework[]>(() =>
    mockHomeworks.filter((h) =>
      mockClasses.filter((c) => c.teacherId === teacherId).some((c) => c.id === h.classId)
    )
  );
  const [remarks, setRemarks] = useState<Remark[]>(() =>
    mockRemarks.filter((r) => r.teacherId === teacherId).slice(0, 20)
  );

  const [activeTab, setActiveTab] = useState<ActiveTab>("courses");

  // Course form
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseSubject, setCourseSubject] = useState("");
  const [courseClassId, setCourseClassId] = useState("1");

  // Homework form
  const [homeworkTitle, setHomeworkTitle] = useState("");
  const [homeworkInstructions, setHomeworkInstructions] = useState("");
  const [homeworkDue, setHomeworkDue] = useState("");
  const [homeworkClassId, setHomeworkClassId] = useState("1");

  // Remark form
  const [remarkStudentId, setRemarkStudentId] = useState("6");
  const [remarkMessage, setRemarkMessage] = useState("");

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<{ type: "course" | "homework" | "remark"; id: string } | null>(null);

  const teacherClasses = useMemo(
    () => mockClasses.filter((c) => c.teacherId === teacherId),
    []
  );
  const allStudentsInClasses = useMemo(
    () => mockStudents.filter((s) => teacherClasses.some((c) => c.id === s.classId)),
    [teacherClasses]
  );

  const onCreateCourse = (e: FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim()) return;
    const newCourse: Course = {
      id: `c-${Date.now()}`,
      title: courseTitle.trim(),
      description: courseDesc.trim(),
      classId: courseClassId,
      teacherId,
      subject: courseSubject.trim() || courseTitle.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setCourses((prev) => [newCourse, ...prev]);
    setCourseTitle("");
    setCourseDesc("");
    setCourseSubject("");
  };

  const onCreateHomework = (e: FormEvent) => {
    e.preventDefault();
    if (!homeworkTitle.trim() || !homeworkDue) return;
    const newHw: Homework = {
      id: `hw-${Date.now()}`,
      courseId: courses[0]?.id ?? "1",
      classId: homeworkClassId,
      teacherId,
      title: homeworkTitle.trim(),
      instructions: homeworkInstructions.trim(),
      dueDate: homeworkDue,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setHomeworks((prev) => [newHw, ...prev]);
    setHomeworkTitle("");
    setHomeworkInstructions("");
    setHomeworkDue("");
  };

  const onCreateRemark = (e: FormEvent) => {
    e.preventDefault();
    if (!remarkMessage.trim()) return;
    const student = mockStudents.find((s) => s.id === remarkStudentId);
    const newRemark: Remark = {
      id: `r-${Date.now()}`,
      studentId: remarkStudentId,
      teacherId,
      parentId: student?.parentId ?? "",
      message: remarkMessage.trim(),
      visibility: "parent-only",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setRemarks((prev) => [newRemark, ...prev]);
    setRemarkMessage("");
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;
    if (type === "course") setCourses((prev) => prev.filter((c) => c.id !== id));
    if (type === "homework") setHomeworks((prev) => prev.filter((h) => h.id !== id));
    if (type === "remark") setRemarks((prev) => prev.filter((r) => r.id !== id));
    setDeleteTarget(null);
  };

  const tabs = [
    { key: "courses" as ActiveTab, label: t("الدروس", "Cours"), icon: BookOpen, count: courses.length },
    { key: "homework" as ActiveTab, label: t("الواجبات", "Devoirs"), icon: ClipboardList, count: homeworks.length },
    { key: "remarks" as ActiveTab, label: t("الملاحظات", "Remarques"), icon: MessageSquare, count: remarks.length },
  ];

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">{t("إدارة الدروس والواجبات", "Gestion des cours et devoirs")}</h1>
        <p className="page-description">
          {t(
            "أنشئ الدروس، أضف الواجبات، وسجل ملاحظات خاصة يراها ولي الأمر فقط.",
            "Créez des cours, ajoutez des devoirs et rédigez des remarques réservées aux parents."
          )}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-primary-600">{courses.length}</p>
          <p className="text-xs text-gray-500 mt-1">{t("دروس", "Cours")}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{homeworks.length}</p>
          <p className="text-xs text-gray-500 mt-1">{t("واجبات", "Devoirs")}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-violet-600">{remarks.length}</p>
          <p className="text-xs text-gray-500 mt-1">{t("ملاحظات", "Remarques")}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Form panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tab switcher for forms */}
          <div className="card p-1 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === tab.key
                    ? "bg-primary-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Course Form */}
          {activeTab === "courses" && (
            <form onSubmit={onCreateCourse} className="card p-5 space-y-3">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary-600" />
                {t("إضافة درس جديد", "Nouveau cours")}
              </h2>
              <input
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder={t("عنوان الدرس *", "Titre du cours *")}
              />
              <input
                value={courseSubject}
                onChange={(e) => setCourseSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder={t("المادة (اختياري)", "Matière (optionnel)")}
              />
              <select
                value={courseClassId}
                onChange={(e) => setCourseClassId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                aria-label={t("القسم", "Classe")}
                title={t("القسم", "Classe")}
              >
                {teacherClasses.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <textarea
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                rows={3}
                placeholder={t("وصف الدرس...", "Description du cours...")}
              />
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                {t("إضافة الدرس", "Ajouter le cours")}
              </button>
            </form>
          )}

          {/* Homework Form */}
          {activeTab === "homework" && (
            <form onSubmit={onCreateHomework} className="card p-5 space-y-3">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-amber-600" />
                {t("إضافة واجب جديد", "Nouveau devoir")}
              </h2>
              <input
                value={homeworkTitle}
                onChange={(e) => setHomeworkTitle(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder={t("عنوان الواجب *", "Titre du devoir *")}
              />
              <select
                value={homeworkClassId}
                onChange={(e) => setHomeworkClassId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                aria-label={t("القسم", "Classe")}
                title={t("القسم", "Classe")}
              >
                {teacherClasses.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t("آخر أجل *", "Date limite *")}</label>
                <input
                  type="date"
                  value={homeworkDue}
                  onChange={(e) => setHomeworkDue(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  aria-label={t("آخر أجل", "Date limite")}
                  title={t("آخر أجل", "Date limite")}
                />
              </div>
              <textarea
                value={homeworkInstructions}
                onChange={(e) => setHomeworkInstructions(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                rows={3}
                placeholder={t("التعليمات...", "Instructions...")}
              />
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                {t("نشر الواجب", "Publier le devoir")}
              </button>
            </form>
          )}

          {/* Remarks Form */}
          {activeTab === "remarks" && (
            <form onSubmit={onCreateRemark} className="card p-5 space-y-3">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-violet-600" />
                {t("ملاحظة لولي الأمر", "Remarque pour les parents")}
              </h2>
              <p className="text-xs text-gray-500 bg-amber-50 border border-amber-100 rounded-lg p-2">
                {t(
                  "هذه الملاحظة لن يراها إلا ولي أمر التلميذ.",
                  "Cette remarque sera visible uniquement par le parent de l'élève."
                )}
              </p>
              <select
                value={remarkStudentId}
                onChange={(e) => setRemarkStudentId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                aria-label={t("التلميذ", "Élève")}
                title={t("التلميذ", "Élève")}
              >
                {allStudentsInClasses.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <textarea
                value={remarkMessage}
                onChange={(e) => setRemarkMessage(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                rows={4}
                placeholder={t("اكتب الملاحظة هنا...", "Rédigez votre remarque ici...")}
              />
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {t("إرسال الملاحظة", "Envoyer la remarque")}
              </button>
            </form>
          )}
        </div>

        {/* Right: List panel */}
        <div className="lg:col-span-3">
          {activeTab === "courses" && (
            <div className="card p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-600" />
                {t("دروسي", "Mes cours")}
                <span className="ml-auto text-sm font-medium text-gray-400">{courses.length}</span>
              </h3>
              <div className="space-y-3 max-h-[65vh] overflow-y-auto">
                {courses.length === 0 && (
                  <p className="text-center text-sm text-gray-400 py-8">
                    {t("لا توجد دروس بعد", "Aucun cours pour l'instant")}
                  </p>
                )}
                {courses.map((course) => {
                  const cls = mockClasses.find((c) => c.id === course.classId);
                  return (
                    <div key={course.id} className="flex items-start justify-between p-4 bg-gray-50 hover:bg-primary-50 rounded-xl border border-transparent hover:border-primary-100 transition-all group">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{course.title}</p>
                          {course.description && (
                            <p className="text-sm text-gray-500 line-clamp-1">{course.description}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                              {course.subject}
                            </span>
                            {cls && (
                              <span className="text-xs text-gray-400">{cls.name}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setDeleteTarget({ type: "course", id: course.id })}
                        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        aria-label={t("حذف الدرس", "Supprimer le cours")}
                        title={t("حذف الدرس", "Supprimer le cours")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "homework" && (
            <div className="card p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-amber-600" />
                {t("الواجبات المنشورة", "Devoirs publiés")}
                <span className="ml-auto text-sm font-medium text-gray-400">{homeworks.length}</span>
              </h3>
              <div className="space-y-3 max-h-[65vh] overflow-y-auto">
                {homeworks.length === 0 && (
                  <p className="text-center text-sm text-gray-400 py-8">
                    {t("لا توجد واجبات بعد", "Aucun devoir pour l'instant")}
                  </p>
                )}
                {homeworks.map((hw) => {
                  const cls = mockClasses.find((c) => c.id === hw.classId);
                  const isOverdue = new Date(hw.dueDate) < new Date();
                  return (
                    <div key={hw.id} className="flex items-start justify-between p-4 bg-gray-50 hover:bg-amber-50 rounded-xl border border-transparent hover:border-amber-100 transition-all group">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                          <ClipboardList className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{hw.title}</p>
                          {hw.instructions && (
                            <p className="text-sm text-gray-500 line-clamp-1">{hw.instructions}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`flex items-center gap-1 text-xs ${isOverdue ? "text-red-500" : "text-gray-500"}`}>
                              <Calendar className="w-3 h-3" />
                              {hw.dueDate}
                            </span>
                            {cls && (
                              <span className="text-xs text-gray-400">• {cls.name}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setDeleteTarget({ type: "homework", id: hw.id })}
                        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        aria-label={t("حذف الواجب", "Supprimer le devoir")}
                        title={t("حذف الواجب", "Supprimer le devoir")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "remarks" && (
            <div className="card p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-violet-600" />
                {t("الملاحظات الخاصة", "Remarques privées")}
                <span className="ml-auto text-sm font-medium text-gray-400">{remarks.length}</span>
              </h3>
              <div className="space-y-3 max-h-[65vh] overflow-y-auto">
                {remarks.length === 0 && (
                  <p className="text-center text-sm text-gray-400 py-8">
                    {t("لا توجد ملاحظات بعد", "Aucune remarque pour l'instant")}
                  </p>
                )}
                {remarks.map((remark) => {
                  const student = mockStudents.find((s) => s.id === remark.studentId);
                  return (
                    <div key={remark.id} className="flex items-start justify-between p-4 bg-amber-50 rounded-xl border border-amber-100 group hover:border-amber-200 transition-all">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-semibold flex-shrink-0 text-sm">
                          {student?.name?.charAt(0) ?? "?"}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            {student?.name ?? remark.studentId}
                          </p>
                          <p className="text-sm text-gray-700 mt-0.5">{remark.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{remark.createdAt}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDeleteTarget({ type: "remark", id: remark.id })}
                        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                        aria-label={t("حذف الملاحظة", "Supprimer la remarque")}
                        title={t("حذف الملاحظة", "Supprimer la remarque")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {t("تأكيد الحذف", "Confirmer la suppression")}
              </h3>
              <button onClick={() => setDeleteTarget(null)} className="p-1 rounded-lg hover:bg-gray-100" aria-label={t("إغلاق", "Fermer")} title={t("إغلاق", "Fermer")}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              {t(
                "هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.",
                "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
              )}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 btn-secondary">
                {t("إلغاء", "Annuler")}
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                {t("حذف", "Supprimer")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
