"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type Lang = "en" | "uz" | "ru";

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.blog": "Blog",
    "nav.certificates": "Certificates",
    "nav.contact": "Contact",
    "nav.letsTalk": "Let's Talk",
    "profile.role": "Front-end Developer",
    "profile.desc":
      "Passionate Front-end Developer 🖥️ specializing in building modern, responsive, and user-friendly web applications.",
    "profile.bookCall": "Book A call",
    "profile.copyEmail": "Copy Email",
    "profile.copied": "Copied!",
    "workexp.title": "Work Experience",
    "expert.title": "My Expert Area",
    "expert.seeAll": "See All →",
    "recent.title": "Recent Projects",
    "recent.seeAll": "See all →",
    "recent.showLess": "Show less ↑",
    "stats.years": "Years of Experience",
    "stats.projects": "Projects Completed",
    "stats.techs": "Technologies",
    "about.hi": "Hi, This Is",
    "about.desc":
      "Passionate Front-end Developer 🖥️ specializing in building modern, responsive, and user-friendly web applications.",
    "about.available": "Available For Hire",
    "about.yearExp": "Year of Experience",
    "about.projectCompleted": "Project Completed",
    "about.expertArea": "My Expert Area ✨",
    "about.workTogether": "Let's 👋 Work Together",
    "services.title": "My Services",
    "services.subtitle":
      "Delivering high-quality frontend development services tailored to your needs.",
    "services.s1": "Front-end Development",
    "services.s2": "Support & Enhancement",
    "services.s3": "UI/UX Implementation",
    "services.s4": "Mentoring & Teaching",
    "services.faqTitle": "Frequently Asked Questions",
    "services.faq1q": "What kind of projects do you specialize in?",
    "services.faq1a":
      "I focus on building modern, responsive web applications using technologies like React, TypeScript, and Tailwind CSS.",
    "services.faq2q": "Can you update or improve my existing website?",
    "services.faq2a":
      "Yes, I offer support for existing projects — including bug fixes, performance optimization, and new feature implementation.",
    "services.faq3q": "Do you offer private tutoring or mentorship?",
    "services.faq3a":
      "Absolutely! I teach frontend development for beginners and intermediate learners through structured lessons and hands-on practice.",
    "services.faq4q": "What is your typical workflow for new projects?",
    "services.faq4a":
      "I start by understanding your goals, then plan the structure, choose the best tech stack, and keep you updated throughout the development process.",
    "services.faq5q": "How can I get in touch with you?",
    "services.faq5a":
      "You can contact me via the form on this website, by email, or through Telegram. I usually respond within 24 hours.",
    "services.workTogether": "Let's 👋 Work Together",
    "services.workTogetherLine1": "Let's",
    "services.workTogetherLine2": "Work Together",
    "blog.title": "My Recent Articles and Publications",
    "blog.subtitle":
      "I write about web development, best practices, and modern technologies. Here you'll find tutorials, insights, and thoughts on building better web applications.",
    "cert.title": "My Certificates",
    "cert.subtitle":
      "Courses and certifications I have completed to improve my skills.",
    "portfolio.title": "Check Out My Latest",
    "portfolio.titleHighlight": "Projects",
    "portfolio.subtitle":
      "Explore a curated collection of my recent frontend applications. Built with a focus on performance, responsive design, and clean architecture using modern web technologies.",
    "contact.title": "Let's Work", "contact.titleHighlight": "Together!",
    "contact.subtitle":
      "Have a project in mind? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.",
    "contact.email": "Email",
    "contact.telegram": "Telegram",
    "contact.name": "Name",
    "contact.namePh": "Enter your name",
    "contact.emailLabel": "Email",
    "contact.emailPh": "Enter your email",
    "contact.subject": "Subject",
    "contact.subjectPh": "Subject",
    "contact.message": "Message",
    "contact.messagePh": "Type details about your inquiry",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "✅ Your message has been sent! I'll reply soon.",
    "contact.error": "❌ Something went wrong. Please try again.",
  },
  uz: {
    "nav.home": "Bosh sahifa",
    "nav.about": "Men haqimda",
    "nav.services": "Xizmatlar",
    "nav.portfolio": "Portfolio",
    "nav.blog": "Blog",
    "nav.certificates": "Sertifikatlar",
    "nav.contact": "Aloqa",
    "nav.letsTalk": "Bog'lanish",
    "profile.role": "Front-end Developer",
    "profile.desc":
      "Zamonaviy, responsive va qulay veb-ilovalar yaratishga ixtisoslashgan Front-end Developer 🖥️",
    "profile.bookCall": "Qo'ng'iroq qilish",
    "profile.copyEmail": "Emailni nusxalash",
    "profile.copied": "Nusxalandi!",
    "workexp.title": "Ish tajribasi",
    "expert.title": "Mening soham",
    "expert.seeAll": "Barchasi →",
    "recent.title": "So'nggi loyihalar",
    "recent.seeAll": "Barchasi →",
    "recent.showLess": "Kamroq ↑",
    "stats.years": "Yillik tajriba",
    "stats.projects": "Bajarilgan loyihalar",
    "stats.techs": "Texnologiyalar",
    "about.hi": "Salom, Bu",
    "about.desc":
      "Zamonaviy, responsive va qulay veb-ilovalar yaratishga ixtisoslashgan Front-end Developer 🖥️",
    "about.available": "Ishga tayyor",
    "about.yearExp": "Yillik tajriba",
    "about.projectCompleted": "Bajarilgan loyiha",
    "about.expertArea": "Mening soham ✨",
    "about.workTogether": "Keling 👋 Birga ishlaymiz",
    "services.title": "Mening xizmatlarim",
    "services.subtitle":
      "Ehtiyojlaringizga mos yuqori sifatli frontend dasturlash xizmatlari.",
    "services.s1": "Front-end Development",
    "services.s2": "Qo'llab-quvvatlash va yaxshilash",
    "services.s3": "UI/UX tatbiqi",
    "services.s4": "Mentorlik va dars berish",
    "services.faqTitle": "Ko'p so'raladigan savollar",
    "services.faq1q": "Qanday loyihalarga ixtisoslashgansiz?",
    "services.faq1a":
      "React, TypeScript va Tailwind CSS kabi texnologiyalardan foydalanib, zamonaviy va responsive veb-ilovalar yaratishga e'tibor qarataman.",
    "services.faq2q": "Mavjud saytimni yangilab yoki yaxshilab bera olasizmi?",
    "services.faq2a":
      "Ha, mavjud loyihalar uchun xizmat ko'rsataman — xatolarni tuzatish, ish faoliyatini optimallashtirish va yangi funksiyalar qo'shish.",
    "services.faq3q": "Xususiy dars yoki mentorlik taklif qilasizmi?",
    "services.faq3a":
      "Albatta! Boshlang'ich va o'rta darajadagi o'quvchilarga frontend dasturlashni tizimli darslar va amaliy mashg'ulotlar orqali o'rgataman.",
    "services.faq4q": "Yangi loyihalarda odatdagi ish jarayoningiz qanday?",
    "services.faq4a":
      "Maqsadlaringizni tushunishdan boshlayman, so'ngra strukturani rejalashtiraman, eng yaxshi texnologiyalarni tanlayman va butun jarayon davomida xabardor qilib boraman.",
    "services.faq5q": "Siz bilan qanday bog'lanishim mumkin?",
    "services.faq5a":
      "Saytdagi forma, email yoki Telegram orqali bog'lanishingiz mumkin. Odatda 24 soat ichida javob beraman.",
    "services.workTogether": "Keling 👋 Birga ishlaymiz",
    "services.workTogetherLine1": "Keling",
    "services.workTogetherLine2": "birga ishlaymiz",
    "blog.title": "Mening maqola va nashrlarim",
    "blog.subtitle":
      "Veb-dasturlash, eng yaxshi amaliyotlar va zamonaviy texnologiyalar haqida yozaman. Bu yerda tutorial'lar va fikrlarni topasiz.",
    "cert.title": "Mening sertifikatlarim",
    "cert.subtitle":
      "Ko'nikmalarimni oshirish uchun tugatgan kurslar va sertifikatlarim.",
    "portfolio.title": "Eng so'nggi loyihalarim",
    "portfolio.titleHighlight": "Projects",
    "portfolio.subtitle":
      "So'nggi frontend ilovalarimning tanlangan to'plamini o'rganing. Zamonaviy veb-texnologiyalar bilan ishlash, responsive dizayn va toza arxitekturaga e'tibor.",
    "contact.title": "Keling", "contact.titleHighlight": "birga ishlaymiz!",
    "contact.subtitle":
      "Fikringizdagi loyiha bormi? Sizni eshitishdan xursandman. Menga xabar yuboring, imkon qadar tez javob beraman.",
    "contact.email": "Email",
    "contact.telegram": "Telegram",
    "contact.name": "Ism",
    "contact.namePh": "Ismingizni kiriting",
    "contact.emailLabel": "Email",
    "contact.emailPh": "Emailingizni kiriting",
    "contact.subject": "Mavzu",
    "contact.subjectPh": "Mavzu",
    "contact.message": "Xabar",
    "contact.messagePh": "So'rovingiz tafsilotlarini yozing",
    "contact.send": "Xabar yuborish",
    "contact.sending": "Yuborilmoqda...",
    "contact.success": "✅ Xabaringiz yuborildi! Tez orada javob beraman.",
    "contact.error": "❌ Xatolik yuz berdi. Qayta urinib ko'ring.",
  },
  ru: {
    "nav.home": "Главная",
    "nav.about": "Обо мне",
    "nav.services": "Услуги",
    "nav.portfolio": "Портфолио",
    "nav.blog": "Блог",
    "nav.certificates": "Сертификаты",
    "nav.contact": "Контакт",
    "nav.letsTalk": "Связаться",
    "profile.role": "Front-end разработчик",
    "profile.desc":
      "Front-end разработчик 🖥️, специализирующийся на создании современных, адаптивных и удобных веб-приложений.",
    "profile.bookCall": "Заказать звонок",
    "profile.copyEmail": "Копировать email",
    "profile.copied": "Скопировано!",
    "workexp.title": "Опыт работы",
    "expert.title": "Моя специализация",
    "expert.seeAll": "Все →",
    "recent.title": "Последние проекты",
    "recent.seeAll": "Все →",
    "recent.showLess": "Меньше ↑",
    "stats.years": "Лет опыта",
    "stats.projects": "Проектов завершено",
    "stats.techs": "Технологий",
    "about.hi": "Привет, это",
    "about.desc":
      "Front-end разработчик 🖥️, специализирующийся на создании современных, адаптивных и удобных веб-приложений.",
    "about.available": "Открыт для предложений",
    "about.yearExp": "Год опыта",
    "about.projectCompleted": "Проектов завершено",
    "about.expertArea": "Моя специализация ✨",
    "about.workTogether": "Давайте 👋 работать вместе",
    "services.title": "Мои услуги",
    "services.subtitle":
      "Качественные услуги frontend-разработки, адаптированные под ваши потребности.",
    "services.s1": "Front-end разработка",
    "services.s2": "Поддержка и улучшение",
    "services.s3": "Реализация UI/UX",
    "services.s4": "Менторство и обучение",
    "services.faqTitle": "Часто задаваемые вопросы",
    "services.faq1q": "На каких проектах вы специализируетесь?",
    "services.faq1a":
      "Я создаю современные адаптивные веб-приложения на React, TypeScript и Tailwind CSS.",
    "services.faq2q": "Можете ли вы обновить или улучшить мой сайт?",
    "services.faq2a":
      "Да, я поддерживаю существующие проекты — исправление ошибок, оптимизация производительности и добавление новых функций.",
    "services.faq3q": "Предоставляете ли вы частные уроки или менторство?",
    "services.faq3a":
      "Конечно! Я обучаю frontend-разработке новичков и студентов среднего уровня через структурированные занятия и практику.",
    "services.faq4q": "Какой ваш обычный процесс работы над проектами?",
    "services.faq4a":
      "Я начинаю с понимания ваших целей, затем планирую структуру, выбираю лучший стек технологий и держу вас в курсе на протяжении всего процесса.",
    "services.faq5q": "Как с вами связаться?",
    "services.faq5a":
      "Вы можете связаться через форму на сайте, по email или через Telegram. Обычно отвечаю в течение 24 часов.",
    "services.workTogether": "Давайте 👋 работать вместе",
    "services.workTogetherLine1": "Давайте",
    "services.workTogetherLine2": "работать вместе",
    "blog.title": "Мои статьи и публикации",
    "blog.subtitle":
      "Я пишу о веб-разработке, лучших практиках и современных технологиях. Здесь вы найдёте уроки и мысли о создании лучших веб-приложений.",
    "cert.title": "Мои сертификаты",
    "cert.subtitle":
      "Курсы и сертификаты, которые я прошёл для улучшения своих навыков.",
    "portfolio.title": "Смотрите мои последние",
    "portfolio.titleHighlight": "Projects",
    "portfolio.subtitle":
      "Изучите подборку моих последних frontend-приложений. Современные технологии, адаптивный дизайн и чистая архитектура.",
    "contact.title": "Давайте", "contact.titleHighlight": "работать вместе!",
    "contact.subtitle":
      "Есть проект? Буду рад услышать вас. Отправьте сообщение, и я отвечу как можно скорее.",
    "contact.email": "Email",
    "contact.telegram": "Telegram",
    "contact.name": "Имя",
    "contact.namePh": "Введите ваше имя",
    "contact.emailLabel": "Email",
    "contact.emailPh": "Введите ваш email",
    "contact.subject": "Тема",
    "contact.subjectPh": "Тема",
    "contact.message": "Сообщение",
    "contact.messagePh": "Опишите ваш запрос",
    "contact.send": "Отправить сообщение",
    "contact.sending": "Отправка...",
    "contact.success": "✅ Ваше сообщение отправлено! Скоро отвечу.",
    "contact.error": "❌ Произошла ошибка. Попробуйте ещё раз.",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang") as Lang | null;
      const valid = ["en", "uz", "ru"];
      if (urlLang && valid.includes(urlLang)) {
        setLangState(urlLang);
        try {
          localStorage.setItem("lang", urlLang);
        } catch {
          /* ignore */
        }
      } else {
        const saved = localStorage.getItem("lang") as Lang | null;
        if (saved && valid.includes(saved)) {
          setLangState(saved);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: TranslationKey) => translations[lang][key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}