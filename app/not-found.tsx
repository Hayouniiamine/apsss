import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">الصفحة غير موجودة</p>
        <Link 
          href="/ar" 
          className="btn-primary"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
