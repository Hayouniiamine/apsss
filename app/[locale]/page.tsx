import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Globe2,
  MapPin,
  MessageSquare,
  Newspaper,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
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
    { label: locale === "ar" ? "الإعلانات" : "Announcements", href: "#announcements" },
    { label: locale === "ar" ? "المرحلة الابتدائية" : "Primary", href: "#stages" },
    { label: locale === "ar" ? "منهجنا" : "Syllabus", href: "#method" },
    { label: locale === "ar" ? "عن المدرسة" : "About", href: "#about" },
  ];
  const announcements = [
    {
      date: "27-01-2023",
      titleAr: 'مسرحية مقتبسة من نص "التلقيح المدرسي" سنة أولى هـ',
      titleFr: 'Pièce inspirée du texte "Vaccination scolaire" - 1ère année',
      excerptAr: "عرض تربوي مسرحي ضمن أنشطة السنة الأولى.",
      excerptFr: "Activité théâtrale éducative réalisée par les élèves de 1ère année.",
    },
    {
      date: "19-12-2022",
      titleAr: "Mini projet : ma famille - السنة الثالثة أ",
      titleFr: "Mini projet : ma famille - 3ème année A",
      excerptAr: "مشروع تعاوني لتطوير التعبير الشفهي والكتابي.",
      excerptFr: "Projet collaboratif pour renforcer l'expression orale et écrite.",
    },
    {
      date: "13-01-2023",
      titleAr: "زيارة المتحف الأثري بقفصة",
      titleFr: "Visite du musée archéologique de Gafsa",
      excerptAr: "خرجة ميدانية تربوية بعد أسبوع الامتحانات.",
      excerptFr: "Sortie pédagogique pour découvrir le patrimoine local.",
    },
  ];
  const schoolPhotos = [
    {
      src: "/images/avicenne/carousel-1.jpg",
      alt: locale === "ar" ? "نشاط مسرحي" : "School theater activity",
      caption: locale === "ar" ? 'مسرحية مقتبسة من نص "التلقيح المدرسي"' : 'Pièce: "Vaccination scolaire"',
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

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition group-hover:shadow-md">
              <Image
                src="/images/avicenne/logo.png"
                alt="Avicenne logo"
                width={42}
                height={42}
                className="object-contain"
                priority
              />
            </div>
            <div className="leading-tight">
              <p className="text-base font-bold">
                {locale === "ar" ? "ابن سينا" : "Avicenne"}
              </p>
              <p className="text-xs text-slate-500">
                {locale === "ar" ? "مدرسة خاصة" : "Private School"}
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={`/${locale}/login`}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              {locale === "ar" ? "تسجيل الدخول" : "Login"}
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_45%),radial-gradient(circle_at_bottom_left,#fde68a,transparent_35%)]" />
          <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary-100 bg-white/85 px-4 py-3 backdrop-blur sm:px-5">
              <p className="text-sm font-medium text-slate-700">
                {locale === "ar"
                  ? "🎓 التسجيل المسبق لسنة 2026 مفتوح الآن - مقاعد محدودة"
                  : "🎓 Pre-enrollment for 2026 is now open - limited seats"}
              </p>
              <a
                href="#announcements"
                className="inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
              >
                {locale === "ar" ? "آخر المستجدات" : "Latest Updates"}
              </a>
            </div>
          </div>
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24 lg:px-8">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                <Sparkles className="h-4 w-4 text-primary-600" />
                {locale === "ar"
                  ? "الخيار الأول لنمو طفلك"
                  : "First Choice For Child Development"}
              </p>

              <h1 className="max-w-xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {locale === "ar"
                  ? "تعليم يصنع شخصية الطفل ويطوّر إمكاناته"
                  : "A School Experience Built For Growth"}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                {locale === "ar"
                  ? "في ابن سينا نؤمن أن كل طفل فريد. نقدم تعليما متوازنا أكاديميا وسلوكيا في بيئة حديثة وآمنة."
                  : "At Avicenne, every child is unique. We combine strong academics, values, and modern methods to build confident learners."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/login`}
                  className="inline-flex items-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
                >
                  {locale === "ar" ? "ابدأ التسجيل" : "Start Enquiry"}
                  <ArrowRight
                    className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`}
                  />
                </Link>
                <a
                  href="#method"
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                >
                  {locale === "ar" ? "تعرف على منهجنا" : "Our Method"}
                </a>
              </div>

              <div className="mt-9 grid max-w-md grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                {[
                  ["15K+", locale === "ar" ? "طالب" : "Students"],
                  ["12+", locale === "ar" ? "سنوات خبرة" : "Years"],
                  ["98%", locale === "ar" ? "نجاح" : "Success"],
                ].map(([value, label]) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-black text-slate-900">{value}</p>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary-400/25 to-accent-300/20 blur-2xl" />
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
                  <Image
                    src="/images/avicenne/carousel-1.jpg"
                    alt={locale === "ar" ? "تلاميذ مدرسة ابن سينا" : "Students at Avicenne"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">
                      {locale === "ar" ? "متابعة أسبوعية" : "Weekly Follow-up"}
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {locale === "ar" ? "تقييم مستمر" : "Continuous Evaluation"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">
                      {locale === "ar" ? "فريق تربوي" : "Education Team"}
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {locale === "ar" ? "خبرة دولية" : "International Expertise"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 rounded-2xl bg-primary-50 px-3 py-2 text-xs font-semibold text-primary-800">
                  {locale === "ar"
                    ? "آخر نشاط: مبادرة ومشروع - السنة الثالثة"
                    : "Latest activity: Initiative & project - Grade 3"}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="announcements" className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700">
                  {locale === "ar" ? "آخر المستجدات" : "Latest News"}
                </p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  {locale === "ar" ? "الإعلانات والأنشطة" : "Announcements & Activities"}
                </h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  {locale === "ar"
                    ? "مستوحاة من محتوى الموقع الرسمي: أنشطة القسم، المشاريع، والزيارات التربوية."
                    : "Inspired by the official school feed: class activities, projects, and educational visits."}
                </p>
              </div>
              <a
                href="https://www.ecoleavicenne.tn/index"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                <Newspaper className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                {locale === "ar" ? "كل الإعلانات" : "View All Posts"}
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {announcements.map((item) => (
                <article
                  key={`${item.date}-${item.titleFr}`}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <p className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    <CalendarDays className={`h-3.5 w-3.5 ${isRTL ? "ml-1.5" : "mr-1.5"}`} />
                    {item.date}
                  </p>
                  <h3 className="mt-4 text-lg font-bold leading-snug">
                    {locale === "ar" ? item.titleAr : item.titleFr}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {locale === "ar" ? item.excerptAr : item.excerptFr}
                  </p>
                  <a
                    href="https://www.ecoleavicenne.tn/index"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800"
                  >
                    {locale === "ar" ? "المزيد من التفاصيل" : "Plus d'info"}
                    <ArrowRight className={`h-4 w-4 ${isRTL ? "mr-1.5 rotate-180" : "ml-1.5"}`} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-700">
                {locale === "ar" ? "عن ابن سينا" : "About Avicenne"}
              </p>
              <h2 className="text-3xl font-black leading-tight sm:text-4xl">
                {locale === "ar"
                  ? "أفضل مدرسة لتطوير شخصية طفلك"
                  : "A Better Way To Grow Unique Learners"}
              </h2>
              <p className="mt-5 leading-7 text-slate-600">
                {locale === "ar"
                  ? "نطوّر التعليم بطريقة منهجية تجمع بين الجودة الأكاديمية، التوازن النفسي، والمهارات الحياتية. نرافق كل تلميذ بخطة تعلم واضحة ومتابعة دقيقة."
                  : "Our learning model blends academic excellence, personal confidence, and practical skills. Every student follows a clear progression with close guidance."}
              </p>
              <Link
                href={`/${locale}/login`}
                className="mt-7 inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                {locale === "ar" ? "استفسر الآن" : "Enquire Now"}
                <ArrowRight
                  className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`}
                />
              </Link>
            </div>

            <div className="grid gap-4">
              {[
                {
                  icon: ShieldCheck,
                  title:
                    locale === "ar" ? "تعليم عالمي الجودة" : "World-class Education",
                  text:
                    locale === "ar"
                      ? "مناهج قوية ومعلمون مؤهلون دوليا."
                      : "Strong curriculum with internationally trained teachers.",
                },
                {
                  icon: Users,
                  title: locale === "ar" ? "قريب من بيئتنا" : "Locally Rooted",
                  text:
                    locale === "ar"
                      ? "محتوى تربوي يحترم الهوية والثقافة."
                      : "Learning adapted to local culture and values.",
                },
                {
                  icon: CheckCircle2,
                  title: locale === "ar" ? "تقييم دائم" : "Constant Evaluation",
                  text:
                    locale === "ar"
                      ? "متابعة دورية مع إشعار مستمر للأولياء."
                      : "Regular progress tracking and parent updates.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mt-0.5 rounded-xl bg-primary-50 p-2.5">
                    <item.icon className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="stages" className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                  {locale === "ar" ? "المراحل" : "Key Stages"}
                </p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  {locale === "ar" ? "المسار الدراسي" : "Study Journey"}
                </h2>
              </div>
              <a href="#" className="text-sm text-white/80 transition hover:text-white">
                {locale === "ar" ? "شاهد كل المراحل" : "See Higher Stages"}
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  title: locale === "ar" ? "المرحلة الأولى" : "Stage 1",
                  subtitle:
                    locale === "ar"
                      ? "السنوات 1-2 | الأعمار 5-7"
                      : "Years 1-2 | Ages 5-7",
                  icon: BookOpen,
                },
                {
                  title: locale === "ar" ? "المرحلة الثانية" : "Stage 2",
                  subtitle:
                    locale === "ar"
                      ? "السنوات 4-8 | الأعمار 8-12"
                      : "Years 4-8 | Ages 8-12",
                  icon: Award,
                },
              ].map((stage) => (
                <div
                  key={stage.title}
                  className="rounded-3xl border border-white/15 bg-white/5 p-7"
                >
                  <stage.icon className="h-7 w-7 text-accent-300" />
                  <h3 className="mt-4 text-2xl font-bold">{stage.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{stage.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700">
                  {locale === "ar" ? "الجوائز" : "Awards"}
                </p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  {locale === "ar" ? "مدرسة حائزة على جوائز" : "Award Winning School"}
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  {locale === "ar"
                    ? "تم تكريم مدرسة ابن سينا لالتزامها بجودة التعليم وتنمية شخصية التلميذ. نعتمد منهجا عمليا قائما على البحث والتطوير المستمر."
                    : "Avicenne is recognized for its consistent commitment to student development, innovative teaching, and measurable outcomes."}
                </p>
              </div>
              <div className="space-y-3">
                {[
                  locale === "ar"
                    ? "أفضل مدرسة نمو مبكر 2024"
                    : "Best Early Dev School",
                  locale === "ar" ? "أفضل مدرسة محلية 2025" : "Top School 2025",
                  locale === "ar" ? "تقدير التميز التربوي" : "Educational Excellence",
                ].map((badge) => (
                  <div
                    key={badge}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700">
                {locale === "ar" ? "معرض المدرسة" : "School Gallery"}
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                {locale === "ar" ? "أنشطة ومشاريع التلاميذ" : "Student Activities & Projects"}
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                {locale === "ar"
                  ? "صور واقعية من أنشطة المدرسة والمشاريع الصفية."
                  : "Real moments from class projects and school activities."}
              </p>
            </div>
            <Carousel photos={schoolPhotos} />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700">
                  {locale === "ar" ? "رسالة الإدارة" : "A Message From Principal"}
                </p>
                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  {locale === "ar"
                    ? "نصنع أفضل نسخة من كل طفل"
                    : "Shaping The Best Version Of Every Student"}
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  {locale === "ar"
                    ? "نحن نعمل مع الأسرة كفريق واحد لبناء جيل متوازن، واثق، وقادر على النجاح في العالم المعاصر."
                    : "We work with families as one team to shape thoughtful, resilient, and future-ready children."}
                </p>
              </div>
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/images/avicenne/carousel-3.jpeg"
                  alt={locale === "ar" ? "صورة من الأنشطة المدرسية" : "School activity"}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mx-auto w-full max-w-7xl rounded-[2rem] bg-primary-700 px-6 py-12 text-white sm:px-10">
            <h2 className="max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
              {locale === "ar"
                ? "انضم إلى ابن سينا وابدأ تجربة تعليمية مميزة لعائلتك"
                : "Join Avicenne And Build A Strong Future For Your Child"}
            </h2>
            <p className="mt-4 max-w-2xl text-primary-100">
              {locale === "ar"
                ? "تواصل معنا الآن لمعرفة تفاصيل التسجيل والمقاعد المتاحة."
                : "Reach out today to know admission details and available seats."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/login`}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition hover:bg-primary-50"
              >
                {locale === "ar" ? "التسجيل الآن" : "Enquire Now"}
              </Link>
              <a
                href="https://wa.me/21697282474"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <MessageSquare className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-semibold text-slate-900">
              {locale === "ar" ? "مدرسة ابن سينا الخاصة" : "Ecole Privee Avicenne"}
            </p>
            <p className="mt-1">
              © 2026 {locale === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="mailto:administration@ecoleavicenne.tn"
              className="inline-flex items-center hover:text-slate-900"
            >
              <Globe2 className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              administration@ecoleavicenne.tn
            </a>
            <a
              href="tel:+21697282474"
              className="inline-flex items-center hover:text-slate-900"
            >
              <Phone className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              +216 97 282 474
            </a>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center hover:text-slate-900"
            >
              <MapPin className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {locale === "ar" ? "الموقع" : "Location"}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
