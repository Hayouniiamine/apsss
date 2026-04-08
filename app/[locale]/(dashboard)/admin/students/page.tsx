"use client";

import { FormEvent, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { mockClasses, mockStudents, mockPayments, mockRemarks } from "@/lib/mock-data";
import type { Class, PaymentStatus, Student } from "@/types";
import {
  Plus,
  Trash2,
  ChevronRight,
  Users,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  Edit3,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

type MobileTab = "classes" | "students" | "detail";

export default function AdminStudentsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [payments, setPayments] = useState<PaymentStatus[]>(mockPayments);

  const [selectedClassId, setSelectedClassId] = useState<string>(mockClasses[0]?.id ?? "");
  const [selectedStudentId, setSelectedStudentId] = useState<string>(() => {
    const firstOfClass = mockStudents.find((s) => s.classId === mockClasses[0]?.id);
    return firstOfClass?.id ?? "";
  });

  const [newClassName, setNewClassName] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentDob, setNewStudentDob] = useState("2018-01-01");

  // Edit mode for class name
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [editingClassName, setEditingClassName] = useState("");

  // Mobile tab state
  const [mobileTab, setMobileTab] = useState<MobileTab>("classes");

  // Modal states
  const [showDeleteClassModal, setShowDeleteClassModal] = useState<string | null>(null);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState<string | null>(null);

  const studentsInClass = useMemo(
    () => students.filter((s) => s.classId === selectedClassId),
    [students, selectedClassId]
  );

  const selectedStudent = useMemo(
    () => students.find((s) => s.id === selectedStudentId) ?? null,
    [students, selectedStudentId]
  );

  const selectedStudentPayments = useMemo(
    () => payments.filter((p) => p.studentId === selectedStudent?.id),
    [payments, selectedStudent?.id]
  );

  const selectedStudentRemarks = useMemo(
    () => mockRemarks.filter((r) => r.studentId === selectedStudent?.id),
    [selectedStudent?.id]
  );

  // Global payment stats (all classes)
  const globalStats = useMemo(() => {
    const paid = payments.filter((p) => p.status === "paid").length;
    const pending = payments.filter((p) => p.status === "pending").length;
    const overdue = payments.filter((p) => p.status === "overdue").length;
    const pendingAmount = payments
      .filter((p) => p.status !== "paid")
      .reduce((sum, p) => sum + p.amount, 0);
    const unpaidCount = new Set(
      payments.filter((p) => p.status !== "paid").map((p) => p.studentId)
    ).size;
    return { paid, pending, overdue, pendingAmount, unpaidCount };
  }, [payments]);

  const addClass = (e: FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    const nextId = String(Math.max(...classes.map((c) => Number(c.id)), 0) + 1);
    const created: Class = {
      id: nextId,
      name: newClassName.trim(),
      grade: classes.length + 1,
      teacherId: "2",
      studentCount: 0,
      room: `R-${nextId}`,
    };
    setClasses((prev) => [...prev, created]);
    setSelectedClassId(created.id);
    setSelectedStudentId("");
    setNewClassName("");
    setMobileTab("students");
  };

  const startEditClass = (cls: Class) => {
    setEditingClassId(cls.id);
    setEditingClassName(cls.name);
  };

  const saveEditClass = (classId: string) => {
    if (!editingClassName.trim()) return;
    setClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, name: editingClassName.trim() } : c))
    );
    setEditingClassId(null);
    setEditingClassName("");
  };

  const confirmDeleteClass = () => {
    if (!showDeleteClassModal) return;
    const classId = showDeleteClassModal;
    setClasses((prev) => prev.filter((c) => c.id !== classId));
    setStudents((prev) => prev.filter((s) => s.classId !== classId));
    setPayments((prev) =>
      prev.filter((p) => {
        const student = students.find((s) => s.id === p.studentId);
        return student?.classId !== classId;
      })
    );
    if (selectedClassId === classId) {
      const fallback = classes.find((c) => c.id !== classId);
      setSelectedClassId(fallback?.id ?? "");
      setSelectedStudentId("");
    }
    setShowDeleteClassModal(null);
  };

  const addStudent = (e: FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !selectedClassId) return;
    const nextId = String(Math.max(...students.map((s) => Number(s.id)), 5) + 1);
    const parentId = String(1000 + Number(nextId));
    const created: Student = {
      id: nextId,
      userId: nextId,
      name: newStudentName.trim(),
      classId: selectedClassId,
      parentId,
      dateOfBirth: newStudentDob,
    };
    setStudents((prev) => [...prev, created]);
    setPayments((prev) => [
      ...prev,
      ...["2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09"].map((month) => ({
        id: `p-${created.id}-${month}`,
        studentId: created.id,
        month,
        amount: 180,
        status: "pending" as const,
        updatedAt: `${month}-01`,
      })),
    ]);
    setSelectedStudentId(created.id);
    setNewStudentName("");
    setMobileTab("detail");
  };

  const confirmDeleteStudent = () => {
    if (!showDeleteStudentModal) return;
    const studentId = showDeleteStudentModal;
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    setPayments((prev) => prev.filter((p) => p.studentId !== studentId));
    if (selectedStudentId === studentId) {
      const fallback = studentsInClass.find((s) => s.id !== studentId);
      setSelectedStudentId(fallback?.id ?? "");
    }
    setShowDeleteStudentModal(null);
  };

  const updatePaymentStatus = (paymentId: string, status: PaymentStatus["status"]) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? { ...p, status, updatedAt: new Date().toISOString().slice(0, 10) }
          : p
      )
    );
  };

  const t = (ar: string, fr: string) => (locale === "ar" ? ar : fr);

  const paymentStatusBadge = (status: string) => {
    if (status === "paid")
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
          <CheckCircle className="w-3 h-3" />
          {t("مدفوع", "Payé")}
        </span>
      );
    if (status === "pending")
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
          <Clock className="w-3 h-3" />
          {t("قيد الانتظار", "En attente")}
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
        <AlertCircle className="w-3 h-3" />
        {t("متأخر", "En retard")}
      </span>
    );
  };

  const handleSelectClass = (id: string) => {
    setSelectedClassId(id);
    const firstStudent = students.find((s) => s.classId === id);
    setSelectedStudentId(firstStudent?.id ?? "");
    setMobileTab("students");
  };

  const handleSelectStudent = (id: string) => {
    setSelectedStudentId(id);
    setMobileTab("detail");
  };

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">{t("إدارة التلاميذ والرسوم", "Gestion des élèves et frais")}</h1>
        <p className="page-description">
          {t(
            "قائمة الأقسام، قائمة التلاميذ، وملف مفصل لكل تلميذ مع تتبع الدفع.",
            "Liste des classes, des élèves et fiche détaillée avec suivi des paiements."
          )}
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="card p-4 flex flex-col justify-between">
          <p className="text-xs text-gray-500 mb-1">{t("مدفوع", "Payé")}</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-emerald-600">{globalStats.paid}</p>
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
        <div className="card p-4 flex flex-col justify-between">
          <p className="text-xs text-gray-500 mb-1">{t("قيد الانتظار", "En attente")}</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-amber-600">{globalStats.pending}</p>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
        </div>
        <div className="card p-4 flex flex-col justify-between">
          <p className="text-xs text-gray-500 mb-1">{t("متأخر", "En retard")}</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-red-600">{globalStats.overdue}</p>
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
        </div>
        <div className="card p-4 flex flex-col justify-between">
          <p className="text-xs text-gray-500 mb-1">{t("المبلغ المتبقي", "Montant dû")}</p>
          <div className="flex items-end justify-between">
            <p className="text-xl font-bold text-amber-700">{globalStats.pendingAmount}</p>
            <span className="text-xs text-gray-400">TND</span>
          </div>
        </div>
        <div className="card p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
          <p className="text-xs text-gray-500 mb-1">{t("تلاميذ غير مدفوعين", "Élèves non payés")}</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-rose-700">{globalStats.unpaidCount}</p>
            <Users className="w-5 h-5 text-rose-400" />
          </div>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="xl:hidden flex bg-white border border-gray-200 rounded-xl overflow-hidden">
        {(["classes", "students", "detail"] as MobileTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mobileTab === tab
                ? "bg-primary-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab === "classes"
              ? t("الأقسام", "Classes")
              : tab === "students"
              ? t("التلاميذ", "Élèves")
              : t("الملف", "Fiche")}
          </button>
        ))}
      </div>

      {/* Main 3-Column Layout */}
      <div className="grid gap-4 xl:grid-cols-12">
        {/* Column 1: Classes */}
        <section
          className={`card p-4 xl:col-span-3 ${mobileTab !== "classes" ? "hidden xl:block" : ""}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-primary-600" />
            <h2 className="font-bold text-gray-900">
              {t("قائمة الأقسام", "Liste des classes")}
            </h2>
            <span className="ml-auto bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {classes.length}
            </span>
          </div>

          {/* Add class form */}
          <form onSubmit={addClass} className="mb-4 flex gap-2">
            <input
              className="input-field px-3 py-2 text-sm flex-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder={t("اسم القسم الجديد", "Nom de la classe")}
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
            <button
              className="btn-primary px-3 text-sm flex items-center gap-1 whitespace-nowrap"
              type="submit"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {/* Classes list */}
          <div className="space-y-2 max-h-[55vh] overflow-y-auto">
            {classes.map((cls) => {
              const count = students.filter((s) => s.classId === cls.id).length;
              const isSelected = selectedClassId === cls.id;
              const isEditing = editingClassId === cls.id;
              return (
                <div
                  key={cls.id}
                  className={`rounded-xl border p-3 transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary-400 bg-primary-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-primary-200 hover:bg-gray-50"
                  }`}
                  onClick={() => !isEditing && handleSelectClass(cls.id)}
                >
                  {isEditing ? (
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        className="flex-1 text-sm border border-primary-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        value={editingClassName}
                        onChange={(e) => setEditingClassName(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEditClass(cls.id);
                          if (e.key === "Escape") setEditingClassId(null);
                        }}
                      />
                      <button
                        onClick={() => saveEditClass(cls.id)}
                        className="text-xs px-2 py-1 bg-primary-600 text-white rounded hover:bg-primary-700"
                      >
                        {t("حفظ", "OK")}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-semibold ${isSelected ? "text-primary-700" : "text-gray-800"}`}>
                          {cls.name}
                        </p>
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => startEditClass(cls)}
                            className="p-1 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded"
                            title={t("تعديل", "Modifier")}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setShowDeleteClassModal(cls.id)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title={t("حذف", "Supprimer")}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          {count} {t("تلميذ", "élèves")}
                        </span>
                        {isSelected && (
                          <ChevronRight className="w-3 h-3 text-primary-500 ml-auto rtl:rotate-180" />
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
            {classes.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">
                {t("لا توجد أقسام", "Aucune classe")}
              </p>
            )}
          </div>
        </section>

        {/* Column 2: Students */}
        <section
          className={`card p-4 xl:col-span-4 ${mobileTab !== "students" ? "hidden xl:block" : ""}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary-600" />
            <h2 className="font-bold text-gray-900">
              {t("قائمة التلاميذ", "Liste des élèves")}
            </h2>
            <span className="ml-auto bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {studentsInClass.length}
            </span>
          </div>

          {/* Add student form */}
          <form onSubmit={addStudent} className="mb-4 space-y-2">
            <input
              className="input-field px-3 py-2 text-sm border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder={t("اسم التلميذ", "Nom de l'élève")}
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                type="date"
                className="input-field px-3 py-2 text-sm border border-gray-300 rounded-lg flex-1 focus:ring-2 focus:ring-primary-500 outline-none"
                value={newStudentDob}
                onChange={(e) => setNewStudentDob(e.target.value)}
              />
              <button className="btn-primary flex items-center gap-1 px-3 text-sm whitespace-nowrap" type="submit">
                <Plus className="w-4 h-4" />
                {t("إضافة", "Ajouter")}
              </button>
            </div>
          </form>

          {/* Students list */}
          <div className="space-y-2 max-h-[50vh] overflow-y-auto">
            {studentsInClass.map((student) => {
              const studentPayments = payments.filter((p) => p.studentId === student.id);
              const paidCount = studentPayments.filter((p) => p.status === "paid").length;
              const isSelected = selectedStudent?.id === student.id;
              return (
                <div
                  key={student.id}
                  onClick={() => handleSelectStudent(student.id)}
                  className={`rounded-xl border p-3 cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary-400 bg-primary-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-primary-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                        isSelected ? "bg-primary-600 text-white" : "bg-primary-100 text-primary-700"
                      }`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${isSelected ? "text-primary-700" : "text-gray-800"}`}>
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-400">{student.dateOfBirth}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <div className="text-xs text-gray-400">
                        {paidCount}/{studentPayments.length}
                      </div>
                      <button
                        onClick={() => setShowDeleteStudentModal(student.id)}
                        className="p-1 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {studentsInClass.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">
                {t("لا توجد تلاميذ في هذا القسم", "Aucun élève dans cette classe")}
              </p>
            )}
          </div>
        </section>

        {/* Column 3: Student Detail */}
        <section
          className={`card p-4 xl:col-span-5 ${mobileTab !== "detail" ? "hidden xl:block" : ""}`}
        >
          {selectedStudent ? (
            <div className="space-y-5">
              {/* Student header */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100">
                <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-gray-900 text-lg">{selectedStudent.name}</h2>
                  <p className="text-sm text-gray-500">
                    {t("القسم", "Classe")} :{" "}
                    <span className="font-medium text-primary-700">
                      {classes.find((c) => c.id === selectedStudent.classId)?.name ?? selectedStudent.classId}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {t("ت.م:", "Né(e) le:")} {selectedStudent.dateOfBirth}
                  </p>
                </div>
                {/* Payment quick summary */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="text-xs font-medium">
                    <span className="text-emerald-600">
                      {selectedStudentPayments.filter((p) => p.status === "paid").length}
                    </span>{" "}
                    /{" "}
                    {selectedStudentPayments.length}
                  </div>
                  <div className="text-xs text-gray-400">{t("مدفوع", "payé")}</div>
                </div>
              </div>

              {/* Tabs: Payments & Remarks */}
              <div>
                <div className="border-b border-gray-200 mb-4 flex gap-4">
                  <button className="pb-2 text-sm font-semibold text-primary-600 border-b-2 border-primary-600 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" />
                    {t("الرسوم", "Frais scolaires")}
                  </button>
                  <button className="pb-2 text-sm text-gray-500 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    {t("الملاحظات", "Remarques")}
                    <span className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
                      {selectedStudentRemarks.length}
                    </span>
                  </button>
                </div>

                {/* Payment table */}
                <div className="max-h-[280px] overflow-y-auto space-y-2">
                  {selectedStudentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        payment.status === "paid"
                          ? "border-emerald-100 bg-emerald-50/50"
                          : payment.status === "overdue"
                          ? "border-red-100 bg-red-50/50"
                          : "border-amber-100 bg-amber-50/50"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{payment.month}</p>
                        <p className="text-xs text-gray-500">
                          {payment.amount} TND • {t("تحديث:", "màj:")} {payment.updatedAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {paymentStatusBadge(payment.status)}
                        <select
                          className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-primary-500 outline-none"
                          value={payment.status}
                          onChange={(e) =>
                            updatePaymentStatus(payment.id, e.target.value as PaymentStatus["status"])
                          }
                        >
                          <option value="paid">{t("مدفوع", "Payé")}</option>
                          <option value="pending">{t("قيد الانتظار", "En attente")}</option>
                          <option value="overdue">{t("متأخر", "En retard")}</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Remarks preview */}
                {selectedStudentRemarks.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      {t("ملاحظات المعلمين", "Remarques des enseignants")}
                    </h3>
                    <div className="max-h-[200px] overflow-y-auto space-y-2">
                      {selectedStudentRemarks.slice(0, 5).map((remark) => (
                        <div key={remark.id} className="rounded-lg bg-amber-50 border border-amber-100 p-3 text-sm">
                          <p className="text-gray-800">{remark.message}</p>
                          <p className="mt-1 text-xs text-gray-400">
                            {t("المعلم", "Enseignant")} #{remark.teacherId} • {remark.createdAt}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">
                {t("اختر تلميذاً لعرض التفاصيل", "Sélectionnez un élève pour afficher les détails")}
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Delete Class Confirmation Modal */}
      {showDeleteClassModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {t("حذف القسم", "Supprimer la classe")}
              </h3>
              <button
                onClick={() => setShowDeleteClassModal(null)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              {t(
                "سيتم حذف القسم وجميع التلاميذ المسجلين فيه. هذا الإجراء لا يمكن التراجع عنه.",
                "La classe et tous les élèves inscrits seront supprimés. Cette action est irréversible."
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteClassModal(null)}
                className="flex-1 btn-secondary"
              >
                {t("إلغاء", "Annuler")}
              </button>
              <button
                onClick={confirmDeleteClass}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                {t("حذف", "Supprimer")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Student Confirmation Modal */}
      {showDeleteStudentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {t("حذف التلميذ", "Supprimer l'élève")}
              </h3>
              <button
                onClick={() => setShowDeleteStudentModal(null)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              {t(
                "سيتم حذف التلميذ وجميع بيانات الدفع المرتبطة به. هذا الإجراء لا يمكن التراجع عنه.",
                "L'élève et toutes ses données de paiement seront supprimés. Cette action est irréversible."
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteStudentModal(null)}
                className="flex-1 btn-secondary"
              >
                {t("إلغاء", "Annuler")}
              </button>
              <button
                onClick={confirmDeleteStudent}
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
