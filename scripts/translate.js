const translations = {
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    community: "Community Hub",
    contact: "Contact",
    welcome: "It's - X D -",
    developer: "I'm a Developer",
    description: "He/Him | Normal person love to code random things and developing projects",
    joinServer: "Join My Server",
    aboutMe: "About Me",
    aboutText: "Normal person love to code random things and make a websites and and love to play games and chill with the <span>friends</span>, love to make some <span>new friends</span> and love to chat with everyone <span>(maybe)</span>, Favorite game is <span>Fortnite</span>.",
    skillsHeading: "Skills",
    mobileDev: "Mobile App Development",
    mobileDevText: "Beginner of mobile app development, love to make some small apps and try to learn how to developing apps and learn the Required language to development.",
    coderDev: "Coder Development",
    coderDevText: "Coder for websites and coder and modcharter in friday night funkin (AKA: FnF), so good charter and modcharter... If you have small mod you the owner, or you one of the devs in the mod... you can invite me and i will join, just text me in my discord or contact me below there",
    gamer: "Gamer and player",
    gamerText: "Gamer loves to play games and chill with the friends in games and having fun and competitving other players also get good placement and enjoying.",
    chatter: "Just Chatter",
    chatterText: "Love to chat in public groups or servers, or just want to be my friend you can talk to me i will accept :)",
    projectsHeading: "My Projects",
    project1Title: "Fortnite Leaks",
    project1Description: "Best place to see all leaks and all news also see all fortnite things from the map to the crew pack to the season ends date!, all that for free... coming soon to android first!",
    project2Title: "Psycho Funkin - Friday Night Funkin'",
    project2Description: "Beat the 3 psycho bros and try to not die, Singing alone with a dead gf and 3 psychos around you, Modcharts and charts are too good. Download now!",
    communityHeading: "Community Hub",
    activeDiscussions: "Active Discussions",
    totalMembers: "Total Members",
    weeklyGrowth: "Weekly Growth",
    serverOwner: "Server Owner",
    gamingSupported: "Gaming supported",
    serverAbout: "Server about",
    contactHeading: "Contact Me",
    yourMessage: "Your message",
    yourName: "Name",
    yourEmail: "Your email",
    subject: "Subject",
    sendMessage: "Send Message",
  },
  ar: {
    home: "الرئيسية",
    about: "عني",
    skills: "المهارات",
    projects: "المشاريع",
    community: "مركز المجتمع",
    contact: "اتصل بي",
    welcome: "مرحبًا، أنا - X D -",
    developer: "أنا مطور",
    description: "هو/ولد | شخص عادي يحب برمجة أشياء عشوائية وتطوير المشاريع",
    joinServer: "انضم إلى السيرفر",
    aboutMe: "عني",
    aboutText: "شخص عادي يحب برمجة أشياء عشوائية وإنشاء مواقع ويب ولعب الألعاب والاسترخاء مع <span>الأصدقاء</span>، أحب تكوين <span>أصدقاء جدد</span> والتحدث مع الجميع <span>(ربما)</span>، لعبتي المفضلة هي <span>فورتنايت</span>.",
    skillsHeading: "المهارات",
    mobileDev: "تطوير تطبيقات الهاتف",
    mobileDevText: "مبتدئ في تطوير تطبيقات الهاتف، أحب إنشاء تطبيقات صغيرة ومحاولة تعلم كيفية تطوير التطبيقات وتعلم اللغات المطلوبة للتطوير.",
    coderDev: "تطوير البرمجيات",
    coderDevText: "مبرمج لمواقع الويب وكاتب ومعدل في Friday Night Funkin' (المعروف أيضًا باسم FnF)، جيد في كتابة التعديلات... إذا كان لديك تعديل صغير وأنت المالك أو أحد المطورين في التعديل، يمكنك دعوتي وسأنضم، فقط راسلني على الديسكورد أو اتصل بي أدناه.",
    gamer: "لاعب وأحب الألعاب",
    gamerText: "لاعب يحب لعب الألعاب والاسترخاء مع الأصدقاء في الألعاب والاستمتاع والمنافسة مع اللاعبين الآخرين والحصول على مراتب جيدة.",
    chatter: "مجرد محادثة",
    chatterText: "أحب الدردشة في المجموعات العامة أو السيرفرات، أو إذا كنت تريد أن تصبح صديقي يمكنك التحدث معي وسأقبلك :)",
    projectsHeading: "مشاريعي",
    project1Title: "Psycho Funkin - Friday Night Funkin'",
    project1Description: "تغلب على الأخوة الثلاثة المجانين وحاول ألا تموت، غني بمفردك مع صديقة ميتة وثلاثة مجانين حولك، المودشارتس والشارتس رائعة جدًا. حمل الآن!",
    project2Title: "Fortnite Leaks",
    project2Description: "أفضل مكان لرؤية جميع التسريبات والأخبار بالإضافة إلى جميع أشياء فورتنايت من الخريطة إلى حزمة الطاقم إلى تاريخ نهاية الموسم! كل ذلك مجانًا... قريبًا على أندرويد أولاً!",
    communityHeading: "مركز المجتمع",
    activeDiscussions: "مناقشات نشطة",
    totalMembers: "إجمالي الأعضاء",
    weeklyGrowth: "النمو الأسبوعي",
    serverOwner: "مالك السيرفر",
    gamingSupported: "الألعاب مدعومة",
    serverAbout: "السيرفر عن",
    contactHeading: "اتصل بي",
    yourMessage: "رسالتك",
    yourName: "الاسم",
    yourEmail: "بريدك الإلكتروني",
    subject: "الموضوع",
    sendMessage: "إرسال رسالة",
  },
};

function updateContent(lang) {
  document.querySelector('a[href="#home"]').textContent = translations[lang].home;
  document.querySelector('a[href="#about"]').textContent = translations[lang].about;
  document.querySelector('a[href="#services"]').textContent = translations[lang].skills;
  document.querySelector('a[href="#projects"]').textContent = translations[lang].projects;
  document.querySelector('a[href="#community"]').textContent = translations[lang].community;
  document.querySelector('a[href="#contact"]').textContent = translations[lang].contact;

  document.querySelector(".home-content h1").textContent = translations[lang].welcome;
  document.querySelector(".home-content h3").textContent = translations[lang].developer;
  document.querySelector(".home-content p").textContent = translations[lang].description;
  document.querySelector(".btn-group .btn").textContent = translations[lang].joinServer;

  document.querySelector(".about-content h2").textContent = translations[lang].aboutMe;
  document.querySelector(".about-content p").innerHTML = translations[lang].aboutText;

  document.querySelector(".services h2").textContent = translations[lang].skillsHeading;
  document.querySelector(".service-box:nth-child(1) h4").textContent = translations[lang].mobileDev;
  document.querySelector(".service-box:nth-child(1) p").textContent = translations[lang].mobileDevText;
  document.querySelector(".service-box:nth-child(2) h4").textContent = translations[lang].coderDev;
  document.querySelector(".service-box:nth-child(2) p").textContent = translations[lang].coderDevText;
  document.querySelector(".service-box:nth-child(3) h4").textContent = translations[lang].gamer;
  document.querySelector(".service-box:nth-child(3) p").textContent = translations[lang].gamerText;
  document.querySelector(".service-box:nth-child(4) h4").textContent = translations[lang].chatter;
  document.querySelector(".service-box:nth-child(4) p").textContent = translations[lang].chatterText;

  document.querySelector(".projects h2").textContent = translations[lang].projectsHeading;
  document.querySelector(".project-card:nth-child(1) h3").textContent = translations[lang].project1Title;
  document.querySelector(".project-card:nth-child(1) p").textContent = translations[lang].project1Description;
  document.querySelector(".project-card:nth-child(2) h3").textContent = translations[lang].project2Title;
  document.querySelector(".project-card:nth-child(2) p").textContent = translations[lang].project2Description;

  document.querySelector(".discord-community h2").textContent = translations[lang].communityHeading;
  document.querySelector(".stat-card:nth-child(3) h3").textContent = translations[lang].activeDiscussions;
  document.querySelector(".stat-card:nth-child(2) h3").textContent = translations[lang].totalMembers;
  document.querySelector(".stat-card:nth-child(5) h3").textContent = translations[lang].weeklyGrowth;
  document.querySelector(".stat-card:nth-child(1) h3").textContent = translations[lang].serverOwner;
  document.querySelector(".stat-card:nth-child(4) h3").textContent = translations[lang].gamingSupported;
  document.querySelector(".stat-card:nth-child(6) h3").textContent = translations[lang].serverAbout;

  // Update contact section
//   document.querySelector(".contact h2").textContent = translations[lang].contactHeading;
//   document.querySelector('input[placeholder="Name"]').placeholder = translations[lang].yourName;
//   document.querySelector('input[placeholder="Your email"]').placeholder = translations[lang].yourEmail;
//   document.querySelector('input[placeholder="Subject"]').placeholder = translations[lang].subject;
//   document.querySelector('textarea[placeholder="Your message"]').placeholder = translations[lang].yourMessage;
//   document.querySelector("#submitBtn span").textContent = translations[lang].sendMessage;

  // Update language toggle button text
  document.querySelector("#desktop-language-text").textContent = lang.toUpperCase();
  document.querySelector("#mobile-language-text").textContent = lang.toUpperCase();

  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

function saveLanguage(lang) {
  localStorage.setItem("selectedLanguage", lang);
}

function loadLanguage() {
  return localStorage.getItem("selectedLanguage") || "en"; // Default to English
}

let currentLang = loadLanguage();
const desktopLanguageToggle = document.getElementById("desktop-language-toggle");
const mobileLanguageToggle = document.getElementById("mobile-language-toggle");

[desktopLanguageToggle, mobileLanguageToggle].forEach(toggle => {
  toggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    updateContent(currentLang);
    saveLanguage(currentLang);
  });
});

mobileLanguageToggle.addEventListener("click", () => {
  navbar.classList.remove("active");
});

updateContent(currentLang);