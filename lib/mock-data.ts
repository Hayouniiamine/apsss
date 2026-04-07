import type {
  User,
  Student,
  Parent,
  Teacher,
  Class,
  Course,
  Grade,
  Activity,
  Attendance,
  Stats,
  Homework,
  Remark,
  PaymentStatus,
  Announcement,
} from '@/types';

export const mockUsers: User[] = [
  { id: '1', email: 'admin@ecoleavicenne.tn', name: 'مدير النظام', role: 'admin' },
  { id: '2', email: 'teacher1@ecoleavicenne.tn', name: 'أستاذ أحمد', role: 'teacher' },
  { id: '3', email: 'teacher2@ecoleavicenne.tn', name: 'أستاذة فاطمة', role: 'teacher' },
  { id: '4', email: 'parent1@email.com', name: 'ولي أمر محمد', role: 'parent' },
  { id: '5', email: 'parent2@email.com', name: 'ولي أمر سارة', role: 'parent' },
  { id: '6', email: 'student1@ecoleavicenne.tn', name: 'محمد علي', role: 'student' },
  { id: '7', email: 'student2@ecoleavicenne.tn', name: 'سارة أحمد', role: 'student' },
];

export const mockClasses: Class[] = [
  { id: '1', name: 'الصف الأول أ', grade: 1, teacherId: '2', studentCount: 25, room: '101' },
  { id: '2', name: 'الصف الأول ب', grade: 1, teacherId: '3', studentCount: 23, room: '102' },
  { id: '3', name: 'الصف الثاني أ', grade: 2, teacherId: '2', studentCount: 24, room: '201' },
  { id: '4', name: 'الصف الثالث أ', grade: 3, teacherId: '3', studentCount: 22, room: '301' },
];

export const mockTeachers: Teacher[] = [
  { id: '2', userId: '2', name: 'أستاذ أحمد', subjects: ['الرياضيات', 'العلوم'], classIds: ['1', '3'], email: 'teacher1@ecoleavicenne.tn' },
  { id: '3', userId: '3', name: 'أستاذة فاطمة', subjects: ['اللغة العربية', 'الاجتماعيات'], classIds: ['2', '4'], email: 'teacher2@ecoleavicenne.tn' },
];

export const mockStudents: Student[] = [
  { id: '6', userId: '6', name: 'محمد علي', classId: '1', parentId: '4', dateOfBirth: '2018-05-15' },
  { id: '7', userId: '7', name: 'سارة أحمد', classId: '2', parentId: '5', dateOfBirth: '2017-08-20' },
  { id: '8', userId: '8', name: 'أحمد خالد', classId: '1', parentId: '4', dateOfBirth: '2018-03-10' },
];

export const mockParents: Parent[] = [
  { id: '4', userId: '4', name: 'ولي أمر محمد', children: ['6', '8'], phone: '+213550000001', email: 'parent1@email.com' },
  { id: '5', userId: '5', name: 'ولي أمر سارة', children: ['7'], phone: '+213550000002', email: 'parent2@email.com' },
];

export const mockCourses: Course[] = [
  { id: '1', title: 'الرياضيات الأساسية', description: 'مبادئ الرياضيات للصف الأول', classId: '1', teacherId: '2', subject: 'الرياضيات', createdAt: '2025-01-01' },
  { id: '2', title: 'اللغة العربية', description: 'مهارات القراءة والكتابة', classId: '1', teacherId: '3', subject: 'اللغة العربية', createdAt: '2025-01-01' },
  { id: '3', title: 'العلوم', description: 'استكشاف العالم من حولنا', classId: '1', teacherId: '2', subject: 'العلوم', createdAt: '2025-01-05' },
  { id: '4', title: 'القراءة', description: 'تنمية مهارات القراءة', classId: '2', teacherId: '3', subject: 'اللغة العربية', createdAt: '2025-01-01' },
];

export const mockHomeworks: Homework[] = [
  {
    id: 'hw-1',
    courseId: '1',
    classId: '1',
    teacherId: '2',
    title: 'تمارين جمع وطرح',
    instructions: 'حل التمارين 1 إلى 5 في الكراس.',
    dueDate: '2025-01-24',
    createdAt: '2025-01-20',
  },
  {
    id: 'hw-2',
    courseId: '2',
    classId: '1',
    teacherId: '3',
    title: 'Lecture: ma famille',
    instructions: 'Lire le texte et répondre aux questions.',
    dueDate: '2025-01-25',
    createdAt: '2025-01-21',
  },
];

export const mockGrades: Grade[] = [
  { id: '1', studentId: '6', courseId: '1', score: 18, maxScore: 20, comment: 'أداء ممتاز', date: '2025-01-15', type: 'exam' },
  { id: '2', studentId: '6', courseId: '2', score: 16, maxScore: 20, comment: 'جيد جداً', date: '2025-01-16', type: 'quiz' },
  { id: '3', studentId: '6', courseId: '3', score: 19, maxScore: 20, comment: 'ممتاز', date: '2025-01-17', type: 'homework' },
  { id: '4', studentId: '7', courseId: '4', score: 17, maxScore: 20, comment: 'جيد', date: '2025-01-15', type: 'exam' },
  { id: '5', studentId: '8', courseId: '1', score: 15, maxScore: 20, comment: 'يحتاج لمزيد من الجهد', date: '2025-01-15', type: 'exam' },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'نشاط روبوتات اليوم',
    content: 'الطلاب استمتعوا بتعلم أساسيات البرمجة باستخدام الروبوتات. قاموا ببناء روبوتات بسيطة وبرمجتها للتحرك! 🤖',
    authorId: '2',
    authorName: 'أستاذ أحمد',
    authorRole: 'teacher',
    classId: '1',
    images: ['/images/robotics-class.jpg'],
    createdAt: '2025-01-20T10:00:00',
    likes: 15,
    comments: [
      { id: '1', authorId: '4', authorName: 'ولي أمر محمد', content: 'عمل رائع! شكراً للأستاذ', createdAt: '2025-01-20T12:00:00' },
    ],
  },
  {
    id: '2',
    title: 'رحلة ميدانية إلى المتحف',
    content: 'زيارة ممتعة للمتحف العلمي حيث تعلم الطلاب عن الديناصورات والفضاء 🦕🚀',
    authorId: '3',
    authorName: 'أستاذة فاطمة',
    authorRole: 'teacher',
    classId: '2',
    images: ['/images/classroom.jpg'],
    createdAt: '2025-01-18T09:00:00',
    likes: 23,
    comments: [],
  },
  {
    id: '3',
    title: 'مسابقة القراءة الشهرية',
    content: 'تهنئة للفائزين في مسابقة القراءة! 📚',
    authorId: '1',
    authorName: 'إدارة المدرسة',
    authorRole: 'admin',
    images: ['/images/activity.jpg'],
    createdAt: '2025-01-15T14:00:00',
    likes: 45,
    comments: [
      { id: '2', authorId: '5', authorName: 'ولي أمر سارة', content: 'مبروك للجميع!', createdAt: '2025-01-15T15:00:00' },
    ],
  },
];

export const mockAttendance: Attendance[] = [
  { id: '1', studentId: '6', date: '2025-01-20', status: 'present' },
  { id: '2', studentId: '6', date: '2025-01-19', status: 'present' },
  { id: '3', studentId: '6', date: '2025-01-18', status: 'absent', note: 'مريض' },
  { id: '4', studentId: '7', date: '2025-01-20', status: 'present' },
  { id: '5', studentId: '8', date: '2025-01-20', status: 'late' },
];

export const mockRemarks: Remark[] = [
  {
    id: 'r-1',
    studentId: '6',
    teacherId: '2',
    parentId: '4',
    message: 'محمد نشيط في القسم لكنه يحتاج مراجعة يومية في الإملاء.',
    visibility: 'parent-only',
    createdAt: '2025-01-19',
  },
  {
    id: 'r-2',
    studentId: '7',
    teacherId: '3',
    parentId: '5',
    message: 'Sara participe très bien. Merci de renforcer la lecture à la maison.',
    visibility: 'parent-only',
    createdAt: '2025-01-20',
  },
];

export const mockPayments: PaymentStatus[] = [
  { id: 'p-1', studentId: '6', month: '2025-01', amount: 180, status: 'paid', updatedAt: '2025-01-03' },
  { id: 'p-2', studentId: '6', month: '2025-02', amount: 180, status: 'pending', updatedAt: '2025-02-02' },
  { id: 'p-3', studentId: '7', month: '2025-01', amount: 180, status: 'paid', updatedAt: '2025-01-04' },
  { id: 'p-4', studentId: '8', month: '2025-01', amount: 180, status: 'overdue', updatedAt: '2025-01-20' },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'a-1',
    title: 'Ouverture des inscriptions 2026',
    content: 'Les inscriptions préliminaires sont ouvertes pour la prochaine rentrée.',
    authorId: '1',
    createdAt: '2025-01-18T09:00:00',
    audience: 'all',
  },
  {
    id: 'a-2',
    title: 'اجتماع أولياء الأمور',
    content: 'اجتماع يوم السبت القادم لمتابعة نتائج الثلاثي الأول.',
    authorId: '1',
    createdAt: '2025-01-20T10:30:00',
    audience: 'parents',
  },
];

export const mockStats: Stats = {
  totalStudents: 120,
  totalTeachers: 12,
  totalParents: 95,
  totalClasses: 8,
  averageGrade: 16.5,
  attendanceRate: 94,
};

// Helper functions
export function getStudentGrades(studentId: string): Grade[] {
  return mockGrades.filter((g) => g.studentId === studentId);
}

export function getStudentAttendance(studentId: string): Attendance[] {
  return mockAttendance.filter((a) => a.studentId === studentId);
}

export function getClassActivities(classId?: string): Activity[] {
  if (!classId) return mockActivities;
  return mockActivities.filter((a) => a.classId === classId);
}

export function getTeacherClasses(teacherId: string): Class[] {
  return mockClasses.filter((c) => c.teacherId === teacherId);
}

export function getParentChildren(parentId: string): Student[] {
  const parent = mockParents.find((p) => p.id === parentId);
  if (!parent) return [];
  return mockStudents.filter((s) => parent.children.includes(s.id));
}

export function getStudentHomeworks(studentId: string): Homework[] {
  const student = mockStudents.find((s) => s.id === studentId);
  if (!student) return [];
  return mockHomeworks.filter((h) => h.classId === student.classId);
}

export function getStudentRemarksForParent(studentId: string, parentId: string): Remark[] {
  return mockRemarks.filter((r) => r.studentId === studentId && r.parentId === parentId);
}

export function getStudentPayments(studentId: string): PaymentStatus[] {
  return mockPayments.filter((p) => p.studentId === studentId);
}
