import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, locale: string = 'ar'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: string | Date, locale: string = 'ar'): string {
  const d = new Date(date);
  return d.toLocaleTimeString(locale === 'ar' ? 'ar-SA' : 'fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function calculateGradePercentage(score: number, maxScore: number): number {
  return Math.round((score / maxScore) * 100);
}

export function getGradeColor(percentage: number): string {
  if (percentage >= 90) return 'text-emerald-600 bg-emerald-50';
  if (percentage >= 80) return 'text-blue-600 bg-blue-50';
  if (percentage >= 70) return 'text-amber-600 bg-amber-50';
  if (percentage >= 60) return 'text-orange-600 bg-orange-50';
  return 'text-red-600 bg-red-50';
}

export function getAttendanceColor(status: string): string {
  switch (status) {
    case 'present':
      return 'text-emerald-600 bg-emerald-50';
    case 'absent':
      return 'text-red-600 bg-red-50';
    case 'late':
      return 'text-amber-600 bg-amber-50';
    case 'excused':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getAttendanceLabel(status: string, locale: string = 'ar'): string {
  const labels = {
    ar: {
      present: 'حاضر',
      absent: 'غائب',
      late: 'متأخر',
      excused: 'مستأذن',
    },
    fr: {
      present: 'Présent',
      absent: 'Absent',
      late: 'En retard',
      excused: 'Excusé',
    },
  };
  return labels[locale as keyof typeof labels]?.[status as keyof typeof labels['ar']] || status;
}
