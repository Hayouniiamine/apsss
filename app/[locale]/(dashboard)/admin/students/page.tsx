"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  mockClasses,
  getStudentAttendance,
  getStudentGrades,
  mockPayments,
  getStudentRemarksForParent,
  mockParents,
  mockStudents,
} from "@/lib/mock-data";
import type { PaymentStatus } from "@/types";

export default function AdminStudentsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedId, setSelectedId] = useState(mockStudents[0]?.id ?? "");
  const [payments, setPayments] = useState<PaymentStatus[]>(mockPayments);

  const studentsByClass = useMemo(() => {
    if (selectedClass === "all") return mockStudents;
    return mockStudents.filter((s) => s.classId === selectedClass);
  }, [selectedClass]);

  const selected = useMemo(() => {
    const fromClass = studentsByClass.find((s) => s.id === selectedId);
    return fromClass ?? studentsByClass[0] ?? null;
  }, [selectedId, studentsByClass]);
  const parent = useMemo(() => mockParents.find((p) => p.id === selected?.parentId), [selected?.parentId]);
  const effectiveStudentId = selected?.id ?? "";
  const grades = useMemo(() => getStudentGrades(effectiveStudentId), [effectiveStudentId]);
  const attendance = useMemo(() => getStudentAttendance(effectiveStudentId), [effectiveStudentId]);
  const studentPayments = useMemo(
    () => payments.filter((p) => p.studentId === effectiveStudentId),
    [payments, effectiveStudentId]
  );
  const remarks = useMemo(
    () => getStudentRemarksForParent(effectiveStudentId, parent?.id ?? ""),
    [effectiveStudentId, parent?.id]
  );

  const updatePaymentStatus = (
    paymentId: string,
    status: PaymentStatus["status"]
  ) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === paymentId
          ? { ...payment, status, updatedAt: new Date().toISOString().slice(0, 10) }
          : payment
      )
    );
  };

  const classPaymentSummary = useMemo(() => {
    const classStudentIds = new Set(studentsByClass.map((s) => s.id));
    const scoped = payments.filter((p) => classStudentIds.has(p.studentId));
    return {
      paid: scoped.filter((p) => p.status === "paid").length,
      pending: scoped.filter((p) => p.status === "pending").length,
      overdue: scoped.filter((p) => p.status === "overdue").length,
    };
  }, [studentsByClass, payments]);

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{locale === "ar" ? "مركز متابعة الطالب" : "Student Control Center"}</h1>
        <p className="page-description">
          {locale === "ar"
            ? "الإدارة يمكنها تتبع الدرجات، الغياب، الملاحظات، وحالة الدفع."
            : "Admin can track grades, absences, private remarks, and fee status."}
        </p>
      </div>

      <div className="card p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {locale === "ar" ? "اختر الفصل" : "Select Class"}
            </label>
            <select
              className="input-field px-3 py-2"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="all">{locale === "ar" ? "كل الفصول" : "All Classes"}</option>
              {mockClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {locale === "ar" ? "اختر الطالب" : "Select Student"}
            </label>
            <select
              className="input-field px-3 py-2"
              value={selected?.id ?? ""}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {studentsByClass.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-4"><p className="text-sm text-gray-600">{locale === "ar" ? "مدفوع" : "Paid"}</p><p className="text-2xl font-bold text-emerald-600">{classPaymentSummary.paid}</p></div>
        <div className="card p-4"><p className="text-sm text-gray-600">{locale === "ar" ? "قيد الانتظار" : "Pending"}</p><p className="text-2xl font-bold text-amber-600">{classPaymentSummary.pending}</p></div>
        <div className="card p-4"><p className="text-sm text-gray-600">{locale === "ar" ? "متأخر" : "Overdue"}</p><p className="text-2xl font-bold text-red-600">{classPaymentSummary.overdue}</p></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-3 font-semibold">{locale === "ar" ? "الدرجات" : "Grades"}</h2>
          <div className="space-y-2 text-sm">
            {grades.map((g) => <div key={g.id} className="rounded-lg bg-gray-50 p-3">{g.score}/{g.maxScore} - {g.type}</div>)}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="mb-3 font-semibold">{locale === "ar" ? "الغياب اليومي" : "Daily Absences"}</h2>
          <div className="space-y-2 text-sm">
            {attendance.map((a) => <div key={a.id} className="rounded-lg bg-gray-50 p-3">{a.date} - {a.status} {a.note ? `(${a.note})` : ""}</div>)}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="mb-3 font-semibold">{locale === "ar" ? "ملاحظات خاصة" : "Private Remarks"}</h2>
          <div className="space-y-2 text-sm">
            {remarks.map((r) => <div key={r.id} className="rounded-lg bg-gray-50 p-3">{r.message}</div>)}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="mb-3 font-semibold">{locale === "ar" ? "حالة دفع الرسوم" : "Fee Payment Status"}</h2>
          <div className="space-y-2 text-sm">
            {studentPayments.map((p) => (
              <div key={p.id} className="rounded-lg bg-gray-50 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{p.month} - {p.amount} TND</p>
                  <select
                    className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs"
                    value={p.status}
                    onChange={(e) => updatePaymentStatus(p.id, e.target.value as PaymentStatus["status"])}
                  >
                    <option value="paid">{locale === "ar" ? "مدفوع" : "Paid"}</option>
                    <option value="pending">{locale === "ar" ? "قيد الانتظار" : "Pending"}</option>
                    <option value="overdue">{locale === "ar" ? "متأخر" : "Overdue"}</option>
                  </select>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {locale === "ar" ? "آخر تحديث:" : "Updated:"} {p.updatedAt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
