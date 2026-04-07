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
  { id: '1', name: '1ere annee primaire', grade: 1, teacherId: '2', studentCount: 10, room: '101' },
  { id: '2', name: '2eme annee primaire', grade: 2, teacherId: '3', studentCount: 10, room: '102' },
  { id: '3', name: '3eme annee primaire', grade: 3, teacherId: '10', studentCount: 10, room: '201' },
  { id: '4', name: '4eme annee primaire', grade: 4, teacherId: '11', studentCount: 10, room: '202' },
  { id: '5', name: '5eme annee primaire', grade: 5, teacherId: '12', studentCount: 10, room: '301' },
  { id: '6', name: '6eme annee primaire', grade: 6, teacherId: '13', studentCount: 10, room: '302' },
];

export const mockTeachers: Teacher[] = [
  { id: '2', userId: '2', name: 'أستاذ أحمد', subjects: ['الرياضيات', 'العلوم'], classIds: ['1', '3'], email: 'teacher1@ecoleavicenne.tn' },
  { id: '3', userId: '3', name: 'أستاذة فاطمة', subjects: ['اللغة العربية', 'الاجتماعيات'], classIds: ['2', '4'], email: 'teacher2@ecoleavicenne.tn' },
  { id: '10', userId: '10', name: 'Teacher 3', subjects: ['Math'], classIds: ['3'], email: 'teacher3@ecoleavicenne.tn' },
  { id: '11', userId: '11', name: 'Teacher 4', subjects: ['French'], classIds: ['4'], email: 'teacher4@ecoleavicenne.tn' },
  { id: '12', userId: '12', name: 'Teacher 5', subjects: ['Science'], classIds: ['5'], email: 'teacher5@ecoleavicenne.tn' },
  { id: '13', userId: '13', name: 'Teacher 6', subjects: ['Arabic'], classIds: ['6'], email: 'teacher6@ecoleavicenne.tn' },
  { id: '14', userId: '14', name: 'Teacher 7', subjects: ['History'], classIds: ['1'], email: 'teacher7@ecoleavicenne.tn' },
  { id: '15', userId: '15', name: 'Teacher 8', subjects: ['Geography'], classIds: ['2'], email: 'teacher8@ecoleavicenne.tn' },
  { id: '16', userId: '16', name: 'Teacher 9', subjects: ['Sport'], classIds: ['5'], email: 'teacher9@ecoleavicenne.tn' },
  { id: '17', userId: '17', name: 'Teacher 10', subjects: ['Arts'], classIds: ['6'], email: 'teacher10@ecoleavicenne.tn' },
];

const studentFirstNames = [
  'محمد', 'سارة', 'أحمد', 'آية', 'يوسف', 'مريم', 'ليان', 'علي', 'نور', 'خديجة',
];
const studentLastNames = [
  'علي', 'بن سالم', 'الخميري', 'العموري', 'حمدي', 'الدريدي', 'بن محمود', 'الزغلامي', 'السالمي', 'الطرابلسي',
];

export const mockStudents: Student[] = mockClasses.flatMap((cls, classIndex) =>
  Array.from({ length: 10 }, (_, i) => {
    const number = classIndex * 10 + i;
    const id = String(6 + number);
    const parentId = String(4 + number);
    return {
      id,
      userId: id,
      name: `${studentFirstNames[i]} ${studentLastNames[classIndex % studentLastNames.length]}`,
      classId: cls.id,
      parentId,
      dateOfBirth: `201${(classIndex % 4) + 4}-0${(i % 8) + 1}-1${i % 9}`,
    };
  })
);

export const mockParents: Parent[] = mockStudents.map((student, i) => ({
  id: student.parentId,
  userId: student.parentId,
  name: `ولي أمر ${student.name}`,
  children: [student.id],
  phone: `+2169700${String(100 + i).padStart(3, '0')}`,
  email: `parent${i + 1}@email.com`,
}));

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

export const mockGrades: Grade[] = mockStudents.flatMap((student, idx) => [
  {
    id: `g-${student.id}-1`,
    studentId: student.id,
    courseId: '1',
    score: 12 + (idx % 9),
    maxScore: 20,
    comment: 'Progression stable',
    date: '2025-01-15',
    type: 'exam',
  },
  {
    id: `g-${student.id}-2`,
    studentId: student.id,
    courseId: '2',
    score: 11 + (idx % 8),
    maxScore: 20,
    comment: 'Bon travail',
    date: '2025-01-20',
    type: 'quiz',
  },
]);

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

export const mockAttendance: Attendance[] = mockStudents.flatMap((student, idx) => [
  { id: `a-${student.id}-1`, studentId: student.id, date: '2025-01-20', status: 'present' },
  { id: `a-${student.id}-2`, studentId: student.id, date: '2025-01-19', status: idx % 5 === 0 ? 'absent' : 'present', note: idx % 5 === 0 ? 'Sick leave' : undefined },
  { id: `a-${student.id}-3`, studentId: student.id, date: '2025-01-18', status: idx % 7 === 0 ? 'late' : 'present' },
]);

const remarkMessages = [
  'Excellent participation in class.',
  'Needs to improve homework consistency.',
  'Shows leadership in group activities.',
  'Reading progress is very positive.',
  'Should focus more during math exercises.',
  'Respectful behavior with classmates.',
  'Can improve handwriting and presentation.',
  'Strong oral communication skills.',
  'Requires more revision before quizzes.',
  'Great effort this week, keep going.',
];

const remarkTeacherIds = ['2', '3', '10', '11', '12', '13', '14', '15', '16', '17'];

export const mockRemarks: Remark[] = mockStudents.flatMap((student) =>
  remarkTeacherIds.map((teacherId, i) => ({
    id: `r-${student.id}-${teacherId}`,
    studentId: student.id,
    teacherId,
    parentId: student.parentId,
    message: remarkMessages[i],
    visibility: 'parent-only',
    createdAt: `2025-01-${String((i % 9) + 11).padStart(2, '0')}`,
  }))
);

const paymentMonths = [
  '2025-01',
  '2025-02',
  '2025-03',
  '2025-04',
  '2025-05',
  '2025-06',
  '2025-07',
  '2025-08',
  '2025-09',
];

export const mockPayments: PaymentStatus[] = mockStudents.flatMap((student, idx) =>
  paymentMonths.map((month, monthIndex) => ({
    id: `p-${student.id}-${month}`,
    studentId: student.id,
    month,
    amount: 180,
    status:
      (idx + monthIndex) % 5 === 0
        ? 'overdue'
        : (idx + monthIndex) % 3 === 0
        ? 'pending'
        : 'paid',
    updatedAt: `${month}-05`,
  }))
);

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
  totalStudents: mockStudents.length,
  totalTeachers: mockTeachers.length,
  totalParents: mockParents.length,
  totalClasses: mockClasses.length,
  averageGrade: 15.7,
  attendanceRate: 92,
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
