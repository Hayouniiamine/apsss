"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Plus, Search, Edit2, Trash2, X, Check, GraduationCap } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { mockGrades, mockStudents, mockCourses, mockClasses } from "@/lib/mock-data";
import type { Grade } from "@/types";

export default function GradesPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const t = (ar: string, fr: string) => (locale === "ar" ? ar : fr);

  const teacherId = "2";
  const teacherClasses = mockClasses.filter((c) => c.teacherId === teacherId);
  const teacherCourses = mockCourses.filter((c) => c.teacherId === teacherId);
  const teacherStudentIds = mockStudents
    .filter((s) => teacherClasses.some((c) => c.id === s.classId))
    .map((s) => s.id);

  const [grades, setGrades] = useState<Grade[]>(() =>
    mockGrades.filter((g) => teacherStudentIds.includes(g.studentId))
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // Form state
  const [formStudentId, setFormStudentId] = useState(teacherStudentIds[0] ?? "");
  const [formCourseId, setFormCourseId] = useState(teacherCourses[0]?.id ?? "");
  const [formScore, setFormScore] = useState("");
  const [formType, setFormType] = useState<"exam" | "quiz" | "homework" | "project">("exam");
  const [formComment, setFormComment] = useState("");
  const [formDate, setFormDate] = useState(new Date().toISOString().slice(0, 10));

  const allStudents = mockStudents.filter((s) =>
    teacherClasses.some((c) => c.id === s.classId)
  );

  const gradesWithDetails = useMemo(
    () =>
      grades.map((grade) => {
        const student = mockStudents.find((s) => s.id === grade.studentId);
        const course = mockCourses.find((c) => c.id === grade.courseId);
        return {
          ...grade,
          studentName: student?.name || t("غير معروف", "Inconnu"),
          courseName: course?.title || t("غير معروف", "Inconnu"),
        };
      }),
    [grades, locale]
  );

  const filteredGrades = useMemo(
    () =>
      gradesWithDetails.filter((g) => {
        const matchSearch =
          g.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          g.courseName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCourse = selectedCourse === "all" || g.courseId === selectedCourse;
        return matchSearch && matchCourse;
      }),
    [gradesWithDetails, searchTerm, selectedCourse]
  );

  const openAddModal = () => {
    setEditingGrade(null);
    setFormStudentId(teacherStudentIds[0] ?? "");
    setFormCourseId(teacherCourses[0]?.id ?? "");
    setFormScore("");
    setFormType("exam");
    setFormComment("");
    setFormDate(new Date().toISOString().slice(0, 10));
    setShowAddModal(true);
  };

  const openEditModal = (grade: Grade) => {
    setEditingGrade(grade);
    setFormStudentId(grade.studentId);
    setFormCourseId(grade.courseId);
    setFormScore(String(grade.score));
    setFormType(grade.type as "exam" | "quiz" | "homework" | "project");
    setFormComment(grade.comment ?? "");
    setFormDate(grade.date);
    setShowAddModal(true);
  };

  const handleSave = () => {
    const score = Number(formScore);
    if (!formStudentId || !formCourseId || isNaN(score) || score < 0 || score > 20) return;

    if (editingGrade) {
      setGrades((prev) =>
        prev.map((g) =>
          g.id === editingGrade.id
            ? { ...g, studentId: formStudentId, courseId: formCourseId, score, type: formType, comment: formComment, date: formDate }
            : g
        )
      );
    } else {
      const newGrade: Grade = {
        id: `g-new-${Date.now()}`,
        studentId: formStudentId,
        courseId: formCourseId,
        score,
        maxScore: 20,
        type: formType,
        comment: formComment,
        date: formDate,
      };
      setGrades((prev) => [newGrade, ...prev]);
    }
    setShowAddModal(false);
    setEditingGrade(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setGrades((prev) => prev.filter((g) => g.id !== deleteTarget));
    setDeleteTarget(null);
  };

  const gradeColor = (score: number, max: number = 20) => {
    const pct = (score / max) * 100;
    if (pct >= 80) return "bg-emerald-100 text-emerald-700";
    if (pct >= 70) return "bg-blue-100 text-blue-700";
    if (pct >= 60) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  const typeLabel = (type: string) => {
    const map: Record<string, [string, string]> = {
      exam: ["اختبار", "Examen"],
      quiz: ["اختبار قصير", "Contrôle"],
      homework: ["واجب", "Devoir"],
      project: ["مشروع", "Projet"],
    };
    return t(map[type]?.[0] ?? type, map[type]?.[1] ?? type);
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">{t("إدارة الدرجات", "Gestion des notes")}</h1>
            <p className="page-description">
              {t("إضافة وتعديل درجات التلاميذ", "Ajouter et modifier les notes des élèves")}
            </p>
          </div>
          <button onClick={openAddModal} className="btn-primary flex items-center gap-2 self-start sm:self-auto">
            <Plus className="w-5 h-5" />
            {t("إضافة درجة", "Ajouter une note")}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400", isRTL ? "right-3" : "left-3")} />
            <input
              type="text"
              placeholder={t("بحث عن تلميذ أو مادة...", "Rechercher un élève ou matière...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm",
                isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
              )}
            />
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
          >
            <option value="all">{t("جميع المواد", "Toutes les matières")}</option>
            {teacherCourses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: t("إجمالي", "Total"), value: filteredGrades.length, color: "text-gray-900" },
          { label: t("ممتاز (≥16)", "Excellent (≥16)"), value: filteredGrades.filter(g => g.score >= 16).length, color: "text-emerald-600" },
          { label: t("متوسط (12-15)", "Moyen (12-15)"), value: filteredGrades.filter(g => g.score >= 12 && g.score < 16).length, color: "text-amber-600" },
          { label: t("ضعيف (<12)", "Insuffisant (<12)"), value: filteredGrades.filter(g => g.score < 12).length, color: "text-red-600" },
        ].map((s, i) => (
          <div key={i} className="card p-3 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {t("التلميذ", "Élève")}
                </th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {t("المادة", "Matière")}
                </th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {t("الدرجة", "Note")}
                </th>
                <th className="hidden sm:table-cell px-4 py-3 text-start text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {t("النوع", "Type")}
                </th>
                <th className="hidden md:table-cell px-4 py-3 text-start text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {t("التاريخ", "Date")}
                </th>
                <th className="px-4 py-3 text-start text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {t("إجراءات", "Actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGrades.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400 text-sm">
                    {t("لا توجد نتائج", "Aucun résultat trouvé")}
                  </td>
                </tr>
              ) : (
                filteredGrades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {grade.studentName.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{grade.studentName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{grade.courseName}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-sm font-bold", gradeColor(grade.score, grade.maxScore))}>
                        {grade.score}/{grade.maxScore}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {typeLabel(grade.type)}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-500">
                      {formatDate(grade.date, locale)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(grade)}
                          className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title={t("تعديل", "Modifier")}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(grade.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t("حذف", "Supprimer")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Grade Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary-600" />
                {editingGrade ? t("تعديل الدرجة", "Modifier la note") : t("إضافة درجة جديدة", "Ajouter une nouvelle note")}
              </h2>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("التلميذ", "Élève")}</label>
                <select
                  value={formStudentId}
                  onChange={(e) => setFormStudentId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                >
                  {allStudents.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("المادة", "Matière")}</label>
                <select
                  value={formCourseId}
                  onChange={(e) => setFormCourseId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                >
                  {teacherCourses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("الدرجة (/20)", "Note (/20)")}</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={formScore}
                    onChange={(e) => setFormScore(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                    placeholder="0 – 20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("النوع", "Type")}</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as typeof formType)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  >
                    <option value="exam">{t("اختبار", "Examen")}</option>
                    <option value="quiz">{t("اختبار قصير", "Contrôle")}</option>
                    <option value="homework">{t("واجب", "Devoir")}</option>
                    <option value="project">{t("مشروع", "Projet")}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("التاريخ", "Date")}</label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("ملاحظة", "Commentaire")}</label>
                <textarea
                  rows={3}
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  placeholder={t("ملاحظة اختيارية...", "Commentaire optionnel...")}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="flex-1 btn-secondary">
                  {t("إلغاء", "Annuler")}
                </button>
                <button onClick={handleSave} className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  {editingGrade ? t("حفظ التعديل", "Enregistrer") : t("إضافة", "Ajouter")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t("حذف الدرجة", "Supprimer la note")}</h3>
            <p className="text-gray-600 mb-5">
              {t("هل تريد حذف هذه الدرجة نهائياً؟", "Voulez-vous supprimer définitivement cette note ?")}
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
