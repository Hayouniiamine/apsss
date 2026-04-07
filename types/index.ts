export type UserRole = 'admin' | 'teacher' | 'parent' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export interface Student {
  id: string;
  userId: string;
  name: string;
  classId: string;
  parentId: string;
  dateOfBirth: string;
  avatar?: string;
}

export interface Parent {
  id: string;
  userId: string;
  name: string;
  children: string[];
  phone: string;
  email: string;
}

export interface Teacher {
  id: string;
  userId: string;
  name: string;
  subjects: string[];
  classIds: string[];
  email: string;
}

export interface Class {
  id: string;
  name: string;
  grade: number;
  teacherId: string;
  studentCount: number;
  room?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  classId: string;
  teacherId: string;
  subject: string;
  createdAt: string;
}

export interface Homework {
  id: string;
  courseId: string;
  classId: string;
  teacherId: string;
  title: string;
  instructions: string;
  dueDate: string;
  createdAt: string;
}

export interface Remark {
  id: string;
  studentId: string;
  teacherId: string;
  parentId: string;
  message: string;
  visibility: 'parent-only';
  createdAt: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  score: number;
  maxScore: number;
  comment?: string;
  date: string;
  type: 'exam' | 'quiz' | 'homework' | 'project';
}

export interface Activity {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  classId?: string;
  images: string[];
  createdAt: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  note?: string;
}

export interface PaymentStatus {
  id: string;
  studentId: string;
  month: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  audience: 'all' | 'parents' | 'teachers' | 'students';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'grade' | 'attendance' | 'activity' | 'announcement';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface Stats {
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalClasses: number;
  averageGrade: number;
  attendanceRate: number;
}
