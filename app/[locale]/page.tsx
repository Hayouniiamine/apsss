import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Globe2,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Carousel } from "@/components/ui/carousel";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRTL = locale === "ar";

  const navItems = [
    { label: locale === "ar" ? "الأنشطة" : "Activities", href: "#announcements" },
    { label: locale === "ar" ? "المراحل" : "Stages", href: "#stages" },
    { label: locale === "ar" ? "المنهج" : "Method", href: "#method" },
    { label: locale === "ar" ? "اتصل بنا" : "Contact", href: "#contact" },
  ];

  const announcements = [
    {
      date: "27-01-2023",
      titleAr: 'مسرحية مقتبسة من نص "التلقيح المدرسي" سنة أولى هـ',
      titleFr: 'Piece inspiree du texte "Vaccination scolaire" - 1ere annee',
      excerptAr: "عرض تربوي مسرحي ضمن أنشطة السنة الأولى.",
      excerptFr: "Activite theatrale educative realisee par les eleves de 1ere annee.",
    },
    {
      date: "19-12-2022",
      titleAr: "Mini projet : ma famille - السنة الثالثة أ",
      titleFr: "Mini projet : ma famille - 3eme annee A",
      excerptAr: "مشروع تعاوني لتطوير التعبير الشفهي والكتابي.",
      excerptFr: "Projet collaboratif pour renforcer l'expression orale et ecrite.",
    },
    {
      date: "13-01-2023",
      titleAr: "زيارة المتحف الأثري بقفصة",
      titleFr: "Visite du musee archeologique de Gafsa",
      excerptAr: "خرجة ميدانية تربوية بعد أسبوع الامتحانات.",
      excerptFr: "Sortie pedagogique pour decouvrir le patrimoine local.",
    },
  ];

  const schoolPhotos = [
    {
      src: "/images/avicenne/carousel-1.jpg",
      alt: locale === "ar" ? "نشاط مسرحي" : "School theater activity",
      caption: locale === "ar" ? 'مسرحية مقتبسة من نص "التلقيح المدرسي"' : 'Piece: "Vaccination scolaire"',
    },
    {
      src: "/images/avicenne/carousel-2.jpg",
      alt: locale === "ar" ? "مشروع القسم" : "Class mini project",
      caption: locale === "ar" ? "Mini projet : ma famille - السنة الثالثة" : "Mini projet : ma famille - 3eme annee",
    },
    {
      src: "/images/avicenne/carousel-3.jpeg",
      alt: locale === "ar" ? "عرض مشروع السنة الخامسة" : "Fifth year projects",
      caption: locale === "ar" ? "عرض مشاريع السنة الخامسة" : "Presentation des projets - 5eme annee",
    },
  ];

  const pillars = [
    {
      title: locale === "ar" ? "تعليم عالمي" : "World-Class Learning",
      text:
        locale === "ar"
          ? "مناهج قوية ومعلمون مؤهلون دوليا مع متابعة فردية لكل طفل."
          : "A strong curriculum with internationally trained teachers and close individual guidance.",
    },
    {
      title: locale === "ar" ? "تقييم دائم" : "Constant Evaluation",
      text:
        locale === "ar"
          ? "متابعة دورية وتغذية راجعة مستمرة للأولياء والتلاميذ."
          : "Frequent assessments with continuous feedback for both parents and students.",
    },
    {
      title: locale === "ar" ? "بيئة آمنة" : "Safe Environment",
      text:
        locale === "ar"
          ? "فضاء تربوي حديث يعزز الثقة والاستقلالية والمهارات الحياتية."
          : "A modern school environment that builds confidence, autonomy, and practical skills.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#111111]">
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border-2 border-[#111111] bg-[#111111] px-4 py-3 text-[#f4f4ef] shadow-[0_10px_0_#111111] sm:px-6">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#f4f4ef]/40 bg-[#f4f4ef]">
              <Image
                src="/images/avicenne/logo.png"
                alt="Avicenne logo"
                width={28}
                height={28}
                className="object-contain"
                priority
              />
            </div>
            <div className="leading-none">
              <p className="text-sm font-black uppercase tracking-[0.1em]">
                {locale === "ar" ? "ابن سينا" : "Avicenne"}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#f4f4ef]/70">
                {locale === "ar" ? "مدرسة خاصة" : "Private School"}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4f4ef] transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={`/${locale}/login`}
              className="rounded-full border border-[#f4f4ef] bg-[#f4f4ef] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#111111] transition hover:bg-transparent hover:text-[#f4f4ef]"
            >
              {locale === "ar" ? "دخول" : "Login"}
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
          <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] border-2 border-[#111111] bg-white p-5 shadow-[0_14px_0_#111111] sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="inline-flex items-center rounded-full border-2 border-[#111111] px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em]">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#111111]" />
                  {locale === "ar" ? "تسجيل 2026 مفتوح" : "Admissions 2026 Open"}
                </p>

                <h1 className="mt-6 text-[2.6rem] font-black uppercase leading-[0.9] tracking-[-0.03em] sm:text-[4rem] lg:text-[6.5rem]">
                  {locale === "ar"
                    ? "تعليم يصنع الشخصية"
                    : "Education That Builds Character"}
                </h1>

                <p className="mt-6 max-w-2xl border-l-4 border-[#111111] pl-4 text-sm leading-7 text-[#3a3a3a] sm:text-base">
                  {locale === "ar"
                    ? "في مدرسة ابن سينا، ندمج الصرامة الأكاديمية مع تنمية المهارات الحياتية في بيئة آمنة وحديثة."
                    : "At Avicenne, we combine academic discipline with personal growth in a modern and safe learning environment."}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/login`}
                    className="inline-flex items-center rounded-full border-2 border-[#111111] bg-[#111111] px-6 py-3 text-xs font-black uppercase tracking-[0.15em] text-[#f4f4ef] transition hover:bg-transparent hover:text-[#111111]"
                  >
                    {locale === "ar" ? "ابدأ التسجيل" : "Start Enquiry"}
                    <ArrowRight className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                  </Link>
                  <a
                    href="#method"
                    className="inline-flex items-center rounded-full border-2 border-[#111111] px-6 py-3 text-xs font-black uppercase tracking-[0.15em] transition hover:bg-[#111111] hover:text-[#f4f4ef]"
                  >
                    {locale === "ar" ? "اكتشف المنهج" : "Discover Method"}
                  </a>
                </div>

                <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center">
                  {[
                    ["15K+", locale === "ar" ? "طالب" : "Students"],
                    ["12+", locale === "ar" ? "سنوات" : "Years"],
                    ["98%", locale === "ar" ? "نجاح" : "Success"],
                  ].map(([value, label]) => (
                    <div key={label} className="border-2 border-[#111111] px-3 py-4">
                      <p className="text-2xl font-black sm:text-3xl">{value}</p>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#4b4b4b]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border-2 border-[#111111]">
                <Image
                  src="/images/avicenne/carousel-1.jpg"
                  alt={locale === "ar" ? "تلاميذ مدرسة ابن سينا" : "Students at Avicenne"}
                  width={900}
                  height={1100}
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 border-t-2 border-[#111111] bg-[#f4f4ef]/95 p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em]">
                    {locale === "ar" ? "آخر نشاط" : "Latest Activity"}
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {locale === "ar"
                      ? "مشروع جماعي وتقديم مسرحي - السنة الثالثة"
                      : "Group project and theater performance - Grade 3"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y-2 border-[#111111] bg-[#111111] py-4 text-[#f4f4ef]">
          <div className="flex min-w-max" style={{ animation: "ticker 30s linear infinite" }}>
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center whitespace-nowrap">
                {[
                  locale === "ar" ? "معلمون مؤهلون دوليا" : "Internationally Trained Teachers",
                  locale === "ar" ? "تقييم مستمر" : "Continuous Evaluation",
                  locale === "ar" ? "بيئة آمنة" : "Safe Learning Environment",
                  locale === "ar" ? "شراكة فعالة مع الأولياء" : "Strong Parent Partnership",
                ].map((item) => (
                  <span key={`${i}-${item}`} className="mx-6 text-xs font-black uppercase tracking-[0.2em] sm:text-sm">
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="method" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#555555]">
              {locale === "ar" ? "منهج ابن سينا" : "Avicenne Method"}
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl">
              {locale === "ar" ? "نظام واضح. نتائج ملموسة." : "Clear System. Measurable Results."}
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {pillars.map((item) => (
                <article
                  key={item.title}
                  className="group border-2 border-[#111111] bg-white p-6 transition hover:bg-[#111111] hover:text-[#f4f4ef]"
                >
                  <CheckCircle2 className="h-6 w-6" />
                  <h3 className="mt-5 text-xl font-black uppercase leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 opacity-80">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="announcements" className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#555555]">
                  {locale === "ar" ? "مستجدات" : "Latest News"}
                </p>
                <h2 className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.02em] sm:text-6xl">
                  {locale === "ar" ? "الإعلانات والأنشطة" : "Announcements & Activities"}
                </h2>
              </div>
              <a
                href="https://www.ecoleavicenne.tn/index"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center border-2 border-[#111111] px-5 py-3 text-xs font-black uppercase tracking-[0.15em] transition hover:bg-[#111111] hover:text-[#f4f4ef]"
              >
                {locale === "ar" ? "عرض الكل" : "View All"}
                <ArrowRight className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
              </a>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {announcements.map((item) => (
                <article key={`${item.date}-${item.titleFr}`} className="border-2 border-[#111111] p-6">
                  <p className="inline-flex items-center bg-[#111111] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#f4f4ef]">
                    <CalendarDays className={`h-3.5 w-3.5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {item.date}
                  </p>
                  <h3 className="mt-5 text-2xl font-black leading-tight">
                    {locale === "ar" ? item.titleAr : item.titleFr}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#4a4a4a]">
                    {locale === "ar" ? item.excerptAr : item.excerptFr}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="stages" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto w-full max-w-7xl rounded-[2.2rem] border-2 border-[#111111] bg-[#111111] p-6 text-[#f4f4ef] sm:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#f4f4ef]/70">
              {locale === "ar" ? "المسار الدراسي" : "Study Journey"}
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl">
              {locale === "ar" ? "من التأسيس إلى التميز" : "From Foundation To Excellence"}
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="border-2 border-[#f4f4ef] p-6">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#f4f4ef]/70">
                  {locale === "ar" ? "المرحلة الأولى" : "Stage 1"}
                </p>
                <p className="mt-4 text-3xl font-black">
                  {locale === "ar" ? "السنوات 1-2" : "Years 1-2"}
                </p>
                <p className="mt-2 text-sm text-[#f4f4ef]/80">
                  {locale === "ar" ? "الأعمار 5-7" : "Ages 5-7"}
                </p>
              </div>
              <div className="border-2 border-[#f4f4ef] p-6">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#f4f4ef]/70">
                  {locale === "ar" ? "المرحلة الثانية" : "Stage 2"}
                </p>
                <p className="mt-4 text-3xl font-black">
                  {locale === "ar" ? "السنوات 4-8" : "Years 4-8"}
                </p>
                <p className="mt-2 text-sm text-[#f4f4ef]/80">
                  {locale === "ar" ? "الأعمار 8-12" : "Ages 8-12"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto w-full max-w-7xl border-2 border-[#111111] p-6 sm:p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#555555]">
              {locale === "ar" ? "معرض المدرسة" : "School Gallery"}
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.02em] sm:text-6xl">
              {locale === "ar" ? "أنشطة ومشاريع حقيقية" : "Real Activities & Projects"}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#4a4a4a]">
              {locale === "ar"
                ? "صور مباشرة من الفصول والأنشطة الميدانية داخل مدرسة ابن سينا."
                : "Direct snapshots from classes, student projects, and field activities at Avicenne."}
            </p>
            <div className="mt-8">
              <Carousel photos={schoolPhotos} />
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 pb-14 pt-2 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mx-auto w-full max-w-7xl border-2 border-[#111111] bg-[#111111] p-6 text-[#f4f4ef] sm:p-10">
            <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl">
              {locale === "ar" ? "جاهزون لاستقبالكم" : "Ready To Welcome You"}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#f4f4ef]/85">
              {locale === "ar"
                ? "للاستفسار حول التسجيل والمقاعد المتاحة، تواصل معنا مباشرة عبر الهاتف أو الواتساب."
                : "For admissions and seat availability, contact us directly by phone or WhatsApp."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/login`}
                className="inline-flex items-center border-2 border-[#f4f4ef] bg-[#f4f4ef] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#111111] transition hover:bg-transparent hover:text-[#f4f4ef]"
              >
                {locale === "ar" ? "ابدأ الآن" : "Start Now"}
              </Link>
              <a
                href="https://wa.me/21697282474"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center border-2 border-[#f4f4ef] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:bg-[#f4f4ef] hover:text-[#111111]"
              >
                <MessageSquare className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                WhatsApp
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <a
                href="mailto:administration@ecoleavicenne.tn"
                className="inline-flex items-center border border-[#f4f4ef]/50 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em]"
              >
                <Globe2 className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                administration@ecoleavicenne.tn
              </a>
              <a
                href="tel:+21697282474"
                className="inline-flex items-center border border-[#f4f4ef]/50 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em]"
              >
                <Phone className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                +216 97 282 474
              </a>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center border border-[#f4f4ef]/50 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em]"
              >
                <MapPin className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                {locale === "ar" ? "قفصة" : "Gafsa"}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
