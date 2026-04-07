"use client";

import { FormEvent, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { mockClasses, mockStudents, mockPayments, mockRemarks } from "@/lib/mock-data";
import type { Class, PaymentStatus, Student } from "@/types";

export default function AdminStudentsPage() {
  const params = useParams();
  const locale = params.locale as string;

  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [payments, setPayments] = useState<PaymentStatus[]>(mockPayments);

  const [selectedClassId, setSelectedClassId] = useState<string>(mockClasses[0]?.id ?? "");
  const [selectedStudentId, setSelectedStudentId] = useState<string>(mockStudents[0]?.id ?? "");

  const [newClassName, setNewClassName] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentDob, setNewStudentDob] = useState("2018-01-01");

  const studentsInClass = useMemo(
    () => students.filter((s) => s.classId === selectedClassId),
    [students, selectedClassId]
  );
  const selectedStudent = useMemo(
    () => students.find((s) => s.id === selectedStudentId) ?? studentsInClass[0] ?? null,
    [students, selectedStudentId, studentsInClass]
  );
  const selectedStudentPayments = useMemo(
    () => payments.filter((p) => p.studentId === selectedStudent?.id),
    [payments, selectedStudent?.id]
  );
  const selectedStudentRemarks = useMemo(
    () => mockRemarks.filter((r) => r.studentId === selectedStudent?.id),
    [selectedStudent?.id]
  );

  const paymentSummary = useMemo(() => {
    const classStudentIds = new Set(studentsInClass.map((s) => s.id));
    const classPayments = payments.filter((p) => classStudentIds.has(p.studentId));
    return {
      paid: classPayments.filter((p) => p.status === "paid").length,
      pending: classPayments.filter((p) => p.status === "pending").length,
      overdue: classPayments.filter((p) => p.status === "overdue").length,
    };
  }, [studentsInClass, payments]);

  const financeStats = useMemo(() => {
    const classStudentIds = new Set(studentsInClass.map((s) => s.id));
    const classPayments = payments.filter((p) => classStudentIds.has(p.studentId));
    const pendingAmount = classPayments
      .filter((p) => p.status !== "paid")
      .reduce((sum, p) => sum + p.amount, 0);
    const unpaidStudentsCount = new Set(
      classPayments.filter((p) => p.status !== "paid").map((p) => p.studentId)
    ).size;
    const totalAmount = classPayments.reduce((sum, p) => sum + p.amount, 0);
    const paidAmount = classPayments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);
    return { pendingAmount, unpaidStudentsCount, totalAmount, paidAmount };
  }, [studentsInClass, payments]);

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
  };

  const deleteClass = (classId: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== classId));
    setStudents((prev) => prev.filter((s) => s.classId !== classId));
    if (selectedClassId === classId) {
      const fallback = classes.find((c) => c.id !== classId);
      setSelectedClassId(fallback?.id ?? "");
      setSelectedStudentId("");
    }
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
  };

  const deleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    setPayments((prev) => prev.filter((p) => p.studentId !== studentId));
    if (selectedStudentId === studentId) {
      const fallback = studentsInClass.find((s) => s.id !== studentId);
      setSelectedStudentId(fallback?.id ?? "");
    }
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

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{locale === "ar" ? "إدارة التلاميذ والرسوم" : "Students & Fees Admin"}</h1>
        <p className="page-description">
          {locale === "ar"
            ? "قائمة الأقسام، قائمة التلاميذ، وملف مفصل لكل تلميذ مع تتبع الدفع."
            : "Liste des classes, liste des eleves et fiche detaillee avec suivi des paiements."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="card p-4"><p className="text-sm text-gray-600">{locale === "ar" ? "مدفوع" : "Paye"}</p><p className="text-2xl font-bold text-emerald-600">{paymentSummary.paid}</p></div>
        <div className="card p-4"><p className="text-sm text-gray-600">{locale === "ar" ? "قيد الانتظار" : "En attente"}</p><p className="text-2xl font-bold text-amber-600">{paymentSummary.pending}</p></div>
        <div className="card p-4"><p className="text-sm text-gray-600">{locale === "ar" ? "متأخر" : "En retard"}</p><p className="text-2xl font-bold text-red-600">{paymentSummary.overdue}</p></div>
        <div className="card p-4"><p className="text-sm text-gray-600">{locale === "ar" ? "المبلغ قيد الانتظار" : "Montant en attente"}</p><p className="text-2xl font-bold text-amber-700">{financeStats.pendingAmount} TND</p></div>
        <div className="card p-4"><p className="text-sm text-gray-600">{locale === "ar" ? "تلاميذ غير مدفوعين" : "Eleves non payes"}</p><p className="text-2xl font-bold text-rose-700">{financeStats.unpaidStudentsCount}</p></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <section className="card p-5 xl:col-span-3">
          <h2 className="mb-3 font-semibold">{locale === "ar" ? "قائمة الأقسام" : "Liste des classes"}</h2>
          <form onSubmit={addClass} className="mb-3 flex gap-2">
            <input className="input-field px-3 py-2 text-sm" placeholder={locale === "ar" ? "قسم جديد" : "Nouvelle classe"} value={newClassName} onChange={(e) => setNewClassName(e.target.value)} />
            <button className="btn-primary px-3 text-sm" type="submit">+</button>
          </form>
          <div className="space-y-2">
            {classes.map((cls) => (
              <div key={cls.id} className={`rounded-lg border p-3 ${selectedClassId === cls.id ? "border-primary-500 bg-primary-50" : "border-gray-200 bg-white"}`}>
                <button className="w-full text-left text-sm font-medium" onClick={() => { setSelectedClassId(cls.id); setSelectedStudentId(""); }}>{cls.name}</button>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>{students.filter((s) => s.classId === cls.id).length} {locale === "ar" ? "تلميذ" : "eleves"}</span>
                  <button type="button" className="text-red-600" onClick={() => deleteClass(cls.id)}>{locale === "ar" ? "حذف" : "Supprimer"}</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-5 xl:col-span-4">
          <h2 className="mb-3 font-semibold">{locale === "ar" ? "قائمة التلاميذ" : "Liste des eleves"}</h2>
          <form onSubmit={addStudent} className="mb-3 space-y-2">
            <input className="input-field px-3 py-2 text-sm" placeholder={locale === "ar" ? "اسم التلميذ" : "Nom de l'eleve"} value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} />
            <input type="date" className="input-field px-3 py-2 text-sm" value={newStudentDob} onChange={(e) => setNewStudentDob(e.target.value)} />
            <button className="btn-primary w-full text-sm" type="submit">{locale === "ar" ? "إضافة تلميذ" : "Ajouter l'eleve"}</button>
          </form>
          <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
            {studentsInClass.map((student) => (
              <div key={student.id} className={`rounded-lg border p-3 ${selectedStudent?.id === student.id ? "border-primary-500 bg-primary-50" : "border-gray-200 bg-white"}`}>
                <button className="w-full text-left font-medium" onClick={() => setSelectedStudentId(student.id)}>{student.name}</button>
                <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                  <span>ID: {student.id}</span>
                  <button type="button" className="text-red-600" onClick={() => deleteStudent(student.id)}>{locale === "ar" ? "حذف" : "Supprimer"}</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-5 xl:col-span-5">
          <h2 className="mb-3 font-semibold">{locale === "ar" ? "ملف التلميذ" : "Fiche eleve"}</h2>
          {selectedStudent ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="font-semibold">{selectedStudent.name}</p>
                <p className="text-sm text-gray-600">
                  {locale === "ar" ? "القسم" : "Classe"} {selectedStudent.classId} • {locale === "ar" ? "تاريخ الميلاد" : "Date de naissance"} {selectedStudent.dateOfBirth}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold">{locale === "ar" ? "حالة دفع الرسوم" : "Etat des paiements (9 mois)"}</h3>
                <div className="space-y-2">
                  {selectedStudentPayments.map((payment) => (
                    <div key={payment.id} className="rounded-lg border border-gray-200 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{payment.month} - {payment.amount} TND</p>
                        <select
                          className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs"
                          value={payment.status}
                          onChange={(e) => updatePaymentStatus(payment.id, e.target.value as PaymentStatus["status"])}
                        >
                          <option value="paid">{locale === "ar" ? "مدفوع" : "Paye"}</option>
                          <option value="pending">{locale === "ar" ? "قيد الانتظار" : "En attente de paiement"}</option>
                          <option value="overdue">{locale === "ar" ? "متأخر" : "En retard"}</option>
                        </select>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{locale === "ar" ? "آخر تحديث" : "Mis a jour"}: {payment.updatedAt}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold">{locale === "ar" ? "ملاحظات المعلمين (10)" : "Remarques des enseignants (10)"}</h3>
                <div className="max-h-[240px] space-y-2 overflow-y-auto pr-1">
                  {selectedStudentRemarks.map((remark) => (
                    <div key={remark.id} className="rounded-lg bg-amber-50 p-3 text-sm">
                      <p>{remark.message}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {locale === "ar" ? "المعلم" : "Enseignant"} #{remark.teacherId} • {remark.createdAt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">{locale === "ar" ? "اختر تلميذا لعرض التفاصيل" : "Selectionnez un eleve pour afficher les details."}</p>
          )}
        </section>
      </div>
    </div>
  );
}
