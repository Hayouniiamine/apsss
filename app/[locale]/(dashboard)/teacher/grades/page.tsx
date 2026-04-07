"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { mockGrades, mockStudents, mockCourses } from "@/lib/mock-data";

export default function GradesPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Combine grade data with student and course info
  const gradesWithDetails = mockGrades.map((grade) => {
    const student = mockStudents.find((s) => s.id === grade.studentId);
    const course = mockCourses.find((c) => c.id === grade.courseId);
    return {
      ...grade,
      studentName: student?.name || "Unknown",
      courseName: course?.title || "Unknown",
    };
  });

  const filteredGrades = gradesWithDetails.filter(
    (g) =>
      g.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">
              {locale === "ar" ? "إدارة الدرجات" : "Gestion des notes"}
            </h1>
            <p className="page-description">
              {locale === "ar" 
                ? "إضافة وتعديل درجات الطلاب" 
                : "Ajouter et modifier les notes des élèves"}
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {locale === "ar" ? "إضافة درجة" : "Ajouter une note"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={locale === "ar" ? "بحث عن طالب أو مادة..." : "Rechercher un élève ou matière..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">
              {locale === "ar" ? "جميع الفصول" : "Toutes les classes"}
            </option>
            <option value="1">{locale === "ar" ? "الصف الأول أ" : "Classe 1A"}</option>
            <option value="2">{locale === "ar" ? "الصف الأول ب" : "Classe 1B"}</option>
          </select>
        </div>
      </div>

      {/* Grades Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  {locale === "ar" ? "الطالب" : "Élève"}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  {locale === "ar" ? "المادة" : "Matière"}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  {locale === "ar" ? "الدرجة" : "Note"}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  {locale === "ar" ? "التاريخ" : "Date"}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  {locale === "ar" ? "النوع" : "Type"}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  {locale === "ar" ? "إجراءات" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGrades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-700 font-medium">
                          {grade.studentName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{grade.studentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{grade.courseName}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                      grade.score >= 16 ? "bg-emerald-100 text-emerald-700" :
                      grade.score >= 14 ? "bg-blue-100 text-blue-700" :
                      grade.score >= 12 ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {grade.score}/{grade.maxScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(grade.date, locale)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      {grade.type === "exam" ? (locale === "ar" ? "اختبار" : "Examen") :
                       grade.type === "quiz" ? (locale === "ar" ? "اختبار قصير" : "Contrôle") :
                       grade.type === "homework" ? (locale === "ar" ? "واجب" : "Devoir") :
                       (locale === "ar" ? "مشروع" : "Projet")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Grade Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-scale-in">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {locale === "ar" ? "إضافة درجة جديدة" : "Ajouter une nouvelle note"}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {locale === "ar" ? "الطالب" : "Élève"}
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                  <option>{locale === "ar" ? "اختر الطالب" : "Sélectionner l'élève"}</option>
                  {mockStudents.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {locale === "ar" ? "المادة" : "Matière"}
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                  <option>{locale === "ar" ? "اختر المادة" : "Sélectionner la matière"}</option>
                  {mockCourses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === "ar" ? "الدرجة" : "Note"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === "ar" ? "النوع" : "Type"}
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                    <option value="exam">{locale === "ar" ? "اختبار" : "Examen"}</option>
                    <option value="quiz">{locale === "ar" ? "اختبار قصير" : "Contrôle"}</option>
                    <option value="homework">{locale === "ar" ? "واجب" : "Devoir"}</option>
                    <option value="project">{locale === "ar" ? "مشروع" : "Projet"}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {locale === "ar" ? "ملاحظة" : "Commentaire"}
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder={locale === "ar" ? "ملاحظة اختيارية..." : "Commentaire optionnel..."}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 btn-secondary"
                >
                  {locale === "ar" ? "إلغاء" : "Annuler"}
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAddModal(false);
                  }}
                >
                  {locale === "ar" ? "حفظ" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
