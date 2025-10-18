import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

const translations = {
  en: {
    home: "Home",
    templates: "Templates",
    pricing: "Pricing",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    login: "Login / Register",
    logout: "Logout",

    // Dashboard / user
    latestPurchases: "Latest Purchases",
    recentTransactions: "Recent Transactions",
    recentlyPurchasedTemplates: "Recently Purchased Templates",
    viewLayout: "View Layout",
    download: "Download",
    purchasedOn: "Purchased on:",

    // Profile / Sidebar
    profileImage: "Profile Image",
    name: "Name",
    email: "Email",
    birthdate: "Birthdate",
    caste: "Caste",
    religion: "Religion",
    age: "Age",
    marriageStatus: "Marriage Status",
    single: "Single",
    married: "Married",
    divorced: "Divorced",
    widowed: "Widowed",
    updateProfile: "Update Profile",
    uploading: "Uploading...",
    userNamePlaceholder: "User Name",
    userEmailPlaceholder: "user@email.com",
    userPhonePlaceholder: "Your Phone (optional)",
    userMessagePlaceholder: "Your Message",

    // Auth
    loginTitle: "Login",
    registerTitle: "Register",
    forgotPassword: "Forgot Password?",
    newTo: "New to Laganbandhane?",
    signUp: "Sign Up",

    // Home
    whyChooseUs: "Why Choose Us?",
    creativeTemplates: "Creative Templates",
    instantDownload: "Instant Download",
    securePayment: "Secure Payment",
    expertSupport: "Expert Support",
    happyCouplesServed: "Happy Couples Served",
    whatOurUsersSay: "What Our Users Say",
    // Hero
    heroTitle: "Celebrate Your Special Moments with Laganbandhane",
    heroParagraph:
      "Create beautiful, personalized wedding invitations and event banners in minutes. Make your big day memorable with our easy-to-use templates and creative tools.",
    heroPricing: "Pricing",
    heroTemplates: "Templates",

    // About section
    aboutTitle: "About Laganbandhane",
    aboutParagraph:
      "We specialize in crafting beautifully customized invitation templates for wedding events across cultures. Our templates reflect heritage and add a personal touch.",
    // About (EN)
    ourMissionTitle: "Our Mission",
    ourMissionText:
      "To empower couples and families with easy-to-use digital tools, creative templates, and expert support for every step of their wedding journey.",
    howToUseTitle: "How to Use Laganbandhane",
    step1Title: "Sign Up",
    step1Desc: "Create your free account to get started.",
    step2Title: "Choose a Template",
    step2Desc:
      "Browse and select from our beautiful invitation and event templates.",
    step3Title: "Customize",
    step3Desc:
      "Personalize your details, images, and event information easily.",
    step4Title: "Preview & Download",
    step4Desc:
      "See a live preview and download your invitation or banner instantly.",
    step5Title: "Share",
    step5Desc:
      "Share your creation with friends and family via WhatsApp, email, or print.",
    step6Title: "Get Support",
    step6Desc: "Contact our team anytime for help or custom requests.",
    whatWeOfferTitle: "What We Offer",
    offerInvitationsTitle: "Wedding Invitations",
    offerInvitationsDesc:
      "Personalized, creative, and easy-to-edit digital invitations.",
    offerBannersTitle: "Event Banners",
    offerBannersDesc:
      "Beautiful banners for weddings, engagements, and all celebrations.",
    offerCustomizationTitle: "Easy Customization",
    offerCustomizationDesc:
      "User-friendly tools to personalize every detail of your event materials.",
    offerSupportTitle: "Expert Support",
    offerSupportDesc:
      "Our team is always ready to help with design, printing, and event planning questions.",
    whyChooseTitle: "Why Choose Laganbandhane?",
    trustedByThousands: "Trusted by Thousands",
    securePrivate: "Secure & Private",
    fastFriendlySupport: "Fast & Friendly Support",
    trustedByDesc:
      "Our platform is loved by couples and families across India for its simplicity and results.",
    securePrivateDesc:
      "Your data and designs are safe, secure, and never shared without your consent.",
    fastFriendlySupportDesc:
      "Get help from real people, not bots, whenever you need it.",
    meetOurTeamTitle: "Meet Our Team",
    founderLabel: "Founder",
    founderRole: "Founder & CEO",
    designerLabel: "Designer",
    designerRole: "Lead Designer",
    supportLabel: "Support Team",
    supportRole: "Always Here for You",
    ourServices: "Our Services",
    servicesList: [
      "Personalized bioData templates",
      "Event banners and creative templates",
      "Easy online customization",
      "Easy pay and lifetime access of templates",
    ],
    features: [
      {
        icon: "💡",
        title: "Creative Templates",
        desc: "Choose from a wide range of beautiful, customizable designs.",
      },
      {
        icon: "⚡",
        title: "Instant Download",
        desc: "Get your invitations and banners instantly after customization.",
      },
      {
        icon: "🔒",
        title: "Secure Payment",
        desc: "Safe and easy payment options for your peace of mind.",
      },
      {
        icon: "🤝",
        title: "Expert Support",
        desc: "Our team is always ready to help you at every step.",
      },
    ],
    testimonials: [
      {
        name: "Amit & Neha",
        text: "Laganbandhane made our wedding planning so easy! The invitations were beautiful and the support team was amazing.",
        img: "/images/profile.jpg",
      },
      {
        name: "Priya & Rahul",
        text: "We loved the customization options and how quickly we could share our invites with family.",
        img: "/images/photo-1633332755192-727a05c4013d.jpeg",
      },
      {
        name: "Sonal & Arjun",
        text: "The banners and templates are gorgeous. Highly recommended for any event!",
        img: "/images/leaf.png",
      },
    ],
    testimonialsTitle: "What Our Users Say",

    // How it works
    howItWorks: "How It Works",
    chooseTemplate: "Choose Template",
    chooseTemplateDesc:
      "Select from professionally designed biodata and invitation formats.",
    customize: "Customize",
    customizeDesc: "Personalize your details easily with simple editing tools.",
    makePayment: "Make Payment",
    makePaymentDesc:
      "Secure payment via Razorpay and download or share instantly.",
    exploreTemplates: "Explore Templates",

    // Timeline steps (pricing page)
    timelineSignUp: "Sign Up",
    timelineSignUpDesc: "Create your free account in seconds.",
    timelineChooseTemplate: "Choose Template",
    timelineChooseTemplateDesc: "Browse and select your favorite design.",
    timelineCustomize: "Customize",
    timelineCustomizeDesc: "Personalize with your details and photos.",
    timelineUpgrade: "Upgrade",
    timelineUpgradeDesc: "Unlock premium features anytime.",
    timelineDownloadShare: "Download & Share",
    timelineDownloadShareDesc: "Get your invitation instantly and share!",

    // Pricing / CTA / Stats
    pricingTitle: "Flexible Pricing for Every Need",
    pricingDesc:
      "Choose a plan that fits your event and budget. Upgrade anytime as your needs grow!",
    comparePlans: "Compare Plans",
    // CTA (Marathi)
    ctaTitle: "आपला कार्यक्रम अविस्मरणीय बनवायला तयार आहात?",
    ctaParagraph:
      "हजारो आनंदी जोडप्यांमध्ये सामील व्हा आणि आजच आपले परिपूर्ण आमंत्रण तयार करा!",
    ctaButton: "मुफ्त सुरू करा",
    ourImpact: "Our Impact",
    happyCouplesLabel: "Happy Couples",
    templatesLabel: "Templates",
    averageRatingLabel: "Average Rating",
    featureLabel: "Feature",
    // Pricing plan labels (EN fallback)
    plan_starter_name: "Starter",
    plan_starter_features: [
      "Basic Templates",
      "Community Support",
      "Watermarked Downloads",
      "Access to Free Events",
    ],
    plan_personal_name: "Personal",
    plan_personal_features: [
      "All Starter Features",
      "No Watermark",
      "Premium Templates",
      "Priority Email Support",
    ],
    plan_pro_name: "Pro",
    plan_pro_features: [
      "All Personal Features",
      "Unlimited Downloads",
      "Custom Design Requests",
      "Direct WhatsApp Support",
    ],
    freeLabel: "Free",
    premiumTemplatesLabel: "Premium Templates",
    customDesignRequestsLabel: "Custom Design Requests",
    directWhatsAppSupportLabel: "Direct WhatsApp Support",
    unlimitedDownloadsLabel: "Unlimited Downloads",
    watermarkedDownloadsLabel: "Watermarked Downloads",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Can I upgrade my plan later?",
        a: "Yes, you can upgrade anytime and only pay the difference.",
      },
      {
        q: "Are payments secure?",
        a: "Absolutely! We use industry-standard encryption and Razorpay.",
      },
      {
        q: "Do you offer refunds?",
        a: "Refunds are available within 7 days for unused premium features.",
      },
    ],
    // Contact-specific FAQs (EN)
    contactFaqs: [
      {
        q: "How soon will I get a response?",
        a: "We aim to respond to all queries within 24 hours during business days.",
      },
      {
        q: "Can I visit your office without an appointment?",
        a: "We recommend booking an appointment for a smoother experience, but walk-ins are welcome during office hours.",
      },
      {
        q: "Do you offer virtual consultations?",
        a: "Yes, we offer video and phone consultations for your convenience.",
      },
    ],
    // Language selector labels
    selectLanguageLabel: "Select Language",
    languageEnglish: "🇬🇧 English",
    languageMarathi: "🇮🇳 मराठी",

    // Contact
    contactTitle: "Contact Laganbandhane",
    contactIntro:
      "We’re here to help you with all your wedding and event needs. Reach out to us for support, questions, or a friendly chat!",
    getInTouch: "Get in Touch",
    getInTouchIntro:
      "We'd love to hear from you! Fill out the form and our team will get back to you soon.",
    sendMessage: "Send Message",
    visitUs: "Visit Us",
    getDirections: "Get Directions",
    visitUsTitle: "Visit Us",
    visitUsParagraph:
      "Stop by our Mumbai office for a personal consultation or to discuss your event in detail. We’re always happy to meet our clients in person and help make your special day perfect.",
    customerSupport: "Customer Support",
    callNow: "Call Now",
    emailSupport: "Email Support",
    customerSupportDescription:
      "Need urgent help? Our support team is available to assist you with any issues or questions. Reach out via phone, email, or our social channels for quick assistance.",
    whatsapp: "WhatsApp Me",
    fetchTemplatesFailed: "Failed to fetch templates",

    // Templates
    templatesTitle: "Templates",
    loadingTemplates: "Loading templates...",
    openInEditor: "Open in Editor",

    // Pricing
    choosePlan: "Choose",

    // Editor
    templateEditorTitle: "Template Editor",
    chooseBorder: "Choose Border:",
    chooseAdminPhoto: "Choose Admin Photo:",
    layoutLabel: "Layout:",
    fontLabel: "Font:",
    editBiodataFields: "Edit Biodata Fields:",
    previewLabel: "Preview (A4 size):",
    downloadAsImage: "Download as Image",

    // Transactions types
    credit: "Credit",
    debit: "Debit",

    // Footer
    quickLinks: "Quick Links",
    reachUs: "Reach Us",
    followUs: "Follow Us",
    trustedTagline: "Your trusted platform for laganbandhane services.",
    // Auth / validation / alerts
    password: "Password",
    confirmPassword: "Confirm Password",
    profileUpdateSuccess: "Profile updated successfully",
    profileUpdateFailed: "Profile update failed",
    profileUpdateError: "Profile update error",
    loginSuccessTitle: "Success",
    loginSuccessText: "Login successful!",
    loginErrorTitle: "Error",
    loginErrorTryAgain: "Login failed. Please try again.",
    loginFailedTitle: "Login Failed",
    loginInvalidCredentials: "Invalid email or password!",
    loginNotFoundTitle: "Not Found",
    loginNotFoundText: "User not found, please register!",
    signupSuccessTitle: "Success",
    signupSuccessText: "User registered successfully!",
    signupErrorTitle: "Error",
    signupErrorTryAgain: "Registration failed. Please try again.",
    signupUserExistsTitle: "User Exists",
    signupUserExistsText: "User already exists!",
    // Validation messages
    requiredFullName: "Full Name is required",
    minFullName: "Full Name must be at least 2 characters",
    enterValidEmail: "Enter a valid email",
    requiredEmail: "Email is required",
    minPassword: "Password must be at least 6 characters",
    requiredPassword: "Password is required",
    confirmPasswordRequired: "Confirm Password is required",
    passwordsMustMatch: "Passwords must match",
  },
  mr: {
    home: "मुख्यपृष्ठ",
    templates: "नमुने",
    pricing: "किंमत",
    aboutUs: "आमच्याबद्दल",
    contactUs: "संपर्क",
    login: "लॉगिन / नोंदणी",
    logout: "बाहेर पडणे",

    // Dashboard / user
    latestPurchases: "अलीकडील खरेदी",
    recentTransactions: "अलीकडील व्यवहार",
    recentlyPurchasedTemplates: "अलीकडे खरेदी केलेले नमुने",
    viewLayout: "लेआउट पहा",
    download: "डाऊनलोड",
    purchasedOn: "खरेदी केलेले:",

    // Profile / Sidebar
    profileImage: "प्रोफाइल प्रतिमा",
    name: "नाव",
    email: "ईमेल",
    birthdate: "जन्मतारीख",
    caste: "जात",
    religion: "धर्म",
    age: "वय",
    marriageStatus: "वैवाहिक स्थिती",
    single: "एकटा",
    married: "विवाहित",
    divorced: "घटस्फोटित",
    widowed: "विधवा/विधुर",
    updateProfile: "प्रोफाइल अपडेट करा",
    uploading: "अपलोड करत आहे...",
    userNamePlaceholder: "वापरकर्त्याचे नाव",
    userEmailPlaceholder: "user@email.com",
    userPhonePlaceholder: "आपला फोन (ऐच्छिक)",
    userMessagePlaceholder: "आपला संदेश",

    // Auth
    loginTitle: "लॉगिन",
    registerTitle: "नोंदणी",
    forgotPassword: "पासवर्ड विसरलात?",
    newTo: "Laganbandhane मध्ये नवीन आहात?",
    signUp: "साइन अप",

    // Home
    whyChooseUs: "आम्हाला का निवडावे?",
    creativeTemplates: "क्रिएटिव्ह टेम्पलेट्स",
    instantDownload: "त्वरित डाऊनलोड",
    securePayment: "सुरक्षित पेमेंट",
    expertSupport: "तज्ञ समर्थन",
    happyCouplesServed: "आनंदी जोडप्यांना सेवा दिली",
    whatOurUsersSay: "आमच्या वापरकर्त्यांनी काय म्हटले",

    // Hero (Marathi)
    heroTitle: "Laganbandhane सोबत आपल्या खास क्षण साजरे करा",
    heroParagraph:
      "मिनिटांमध्ये सुंदर, वैयक्तिकृत लग्न आमंत्रणे आणि इव्हेंट बॅनर्स तयार करा. आमच्या सोप्या टेम्पलेट्स आणि क्रिएटिव्ह टूल्ससह आपला मोठा दिवस संस्मरणीय बनवा.",
    heroPricing: "किंमत",
    heroTemplates: "नमुने",

    // How it works (Marathi)
    howItWorks: "हे कसे कार्य करते",
    chooseTemplate: "टेम्पलेट निवडा",
    chooseTemplateDesc:
      "व्यावसायिक डिझाइन केलेल्या बायोडेटा आणि आमंत्रण फॉरमॅटमधून निवडा.",
    customize: "सानुकूल करा",
    customizeDesc: "सोप्या संपादन साधनांसह आपली माहिती वैयक्तिक करा.",
    makePayment: "पेमेंट करा",
    makePaymentDesc:
      "Razorpay द्वारे सुरक्षित पेमेंट करा आणि त्वरित डाउनलोड किंवा शेअर करा.",
    exploreTemplates: "टेम्पलेट तपासा",

    // Contact (Marathi)
    contactTitle: "संपर्क - Laganbandhane",
    contactIntro:
      "आम्ही आपल्या लग्न व इव्हेंटच्या गरजांसाठी मदत करण्यासाठी येथे आहोत. समर्थन, प्रश्न किंवा मैत्रीपूर्ण संभाषणासाठी आमच्याशी संपर्क साधा!",
    getInTouch: "संपर्क करा",
    getInTouchIntro:
      "आम्हाला तुमच्याकडून ऐकायला आवडेल! फॉर्म भरा आणि आमचा संघ लवकरच आपल्याशी संपर्क करेल.",
    sendMessage: "संदेश पाठवा",
    visitUs: "आम्हाला भेटा",
    getDirections: "दिशा मिळवा",
    visitUsTitle: "आम्हाला भेटा",
    visitUsParagraph:
      "वैयक्तिक सल्ल्यासाठी किंवा आपल्या कार्यक्रमाबद्दल तपशीलवार चर्चा करण्यासाठी आमच्या मुंबई कार्यालयाला भेट द्या. आम्हाला आमच्या क्लायंटना प्रत्यक्ष भेटायला आनंद होतो आणि आपला खास दिवस परिपूर्ण करण्यात मदत करतो.",
    customerSupport: "ग्राहक समर्थन",
    callNow: "आता कॉल करा",
    emailSupport: "ईमेल समर्थन",
    customerSupportDescription:
      "ततडीची मदत हवी आहे का? आमचे समर्थन टीम कोणत्याही समस्या किंवा प्रश्नांसाठी आपल्याला सहाय्य करण्यासाठी उपलब्ध आहे. त्वरीत सहाय्यासाठी फोन, ईमेल किंवा आमच्या सोशल चॅनेल्सद्वारे संपर्क साधा.",
    whatsapp: "WhatsApp वर संपर्क",
    offerInvitationsTitle: "लग्न आमंत्रणे",
    offerInvitationsDesc:
      "वैयक्तिकृत, सर्जनशील आणि सोपे-टू-एडिट डिजिटल आमंत्रणे.",
    // About section
    aboutTitle: "आमच्याबद्दल",
    offerBannersTitle: "इव्हेंट बॅनर्स",
    offerBannersDesc:
      "लग्न, साखरपुडा आणि इतर सर्व सणांसाठी सुंदर बॅनर्स आणि घोषवाक्ये.",
    ourMissionTitle: "आमचे ध्येय",
    ourMissionText:
      "दांपत्य व कुटुंबांना सोप्या डिजिटल साधनांनी, सर्जनशील टेम्पलेट्सने आणि तज्ञ समर्थनाने त्यांच्या विवाह प्रवासाच्या प्रत्येक टप्प्यासाठी सक्षम करणे.",
    offerCustomizationTitle: "सुलभ सानुकूलन",
    offerCustomizationDesc:
      "सोप्या संपादन साधनांसह आपली माहिती आणि डिझाइन सहज सानुकूल करा.",
    howToUseTitle: "लागनबंधाने कसे वापरावे",
    offerSupportTitle: "तज्ञ समर्थन",
    offerSupportDesc:
      "डिझाईन, प्रिंटिंग आणि कस्टम विनंत्यांसाठी आमचे तज्ञ मदत करतात.",
    step1Desc: "प्रारंभ करण्यासाठी आपले मोफत खाते तयार करा.",
    step2Title: "टेम्पलेट निवडा",
    step2Desc:
      "आमच्या सुंदर आमंत्रण आणि इव्हेंट टेम्पलेट्समधून ब्राउझ करा आणि निवडा.",
    step3Title: "सानुकूल करा",
    step3Desc: "आपली माहिती, प्रतिमा आणि इव्हेंट माहिती सहजपणे सानुकूल करा.",
    step4Title: "प्रीव्ह्यू आणि डाऊनलोड",
    step4Desc:
      "लाइव्ह प्रीव्ह्यू पहा आणि आपले आमंत्रण किंवा बॅनर तात्काळ डाऊनलोड करा.",
    step5Title: "शेअर करा",
    step5Desc:
      "WhatsApp, ईमेल किंवा प्रिंटद्वारे आपल्या तयार केलेले आयटम मित्र आणि कुटुंबासोबत शेअर करा.",
    step6Title: "समर्थन मिळवा",
    step6Desc:
      "कस्टम विनंत्यांसाठी किंवा मदतीसाठी कधीही आमच्या टीमशी संपर्क करा.",
    ourServices: "आमची सेवा",
    servicesList: [
      "सानुकूल बायोडेटा टेम्पलेट्स",
      "इव्हेंट बॅनर्स आणि सर्जनशील टेम्पलेट्स",
      "सुलभ ऑनलाइन सानुकूलन",
      "सुलभ पेमेंट आणि टेम्पलेट्सचा आयुषभराचा प्रवेश",
    ],
    features: [
      {
        icon: "💡",
        title: "क्रिएटिव्ह टेम्पलेट्स",
        desc: "विविध सुंदर आणि सानुकूल करण्यायोग्य डिझाइनमधून निवडा.",
      },
      {
        icon: "⚡",
        title: "त्वरित डाऊनलोड",
        desc: "सानुकूलन केल्यानंतर आपले आमंत्रण आणि बॅनर तात्काळ मिळवा.",
      },
      {
        icon: "🔒",
        title: "सुरक्षित पेमेंट",
        desc: "आपल्या मनाच्या शांततेसाठी सुरक्षित आणि सोपे पेमेंट पर्याय.",
      },
      {
        icon: "🤝",
        title: "तज्ञ समर्थन",
        desc: "आमचा संघ प्रत्येक टप्प्यावर मदत करण्यास सदैव तयार आहे.",
      },
    ],
    // Pricing / CTA / Stats (Marathi)
    // Timeline steps (Marathi)
    timelineSignUp: "नोंदणी करा",
    timelineSignUpDesc: "काही सेकंदांत आपले मोफत खाते तयार करा.",
    timelineChooseTemplate: "टेम्पलेट निवडा",
    timelineChooseTemplateDesc: "आपला आवडता डिझाइन ब्राउझ करा आणि निवडा.",
    timelineCustomize: "सानुकूल करा",
    timelineCustomizeDesc: "आपली माहिती आणि छायाचित्रे सानुकूल करा.",
    timelineUpgrade: "अपग्रेड",
    timelineUpgradeDesc: "कधीही प्रीमियम वैशिष्ट्ये अनलॉक करा.",
    timelineDownloadShare: "डाऊनलोड आणि शेअर",
    timelineDownloadShareDesc:
      "आपले आमंत्रण तात्काळ मिळवा आणि सहजपणे शेअर करा!",
    pricingTitle: "प्रत्येक गरजेसाठी लवचीक किंमत",
    pricingDesc:
      "आपल्या कार्यक्रमासाठी आणि बजेटसह सुसंगत योजना निवडा. आपल्याला गरज वाढल्यास आपण कधीही अपग्रेड करू शकता!",
    comparePlans: "योजना तुलना करा",
    // Impact labels (Marathi)
    ourImpact: "आमचा परिणाम",
    happyCouplesLabel: "आनंदी जोडपे",
    templatesLabel: "टेम्पलेट्स",
    averageRatingLabel: "सरासरी रेटिंग",
    // Pricing plan labels (MR)
    plan_starter_name: "स्टार्टर",
    plan_starter_features: [
      "बेसिक टेम्पलेट्स",
      "कम्युनिटी समर्थन",
      "वॉटरमार्क केलेले डाउनलोड",
      "मोफत इव्हेंट प्रवेश",
    ],
    plan_personal_name: "पर्सनल",
    plan_personal_features: [
      "सर्व स्टार्टर फीचर्स",
      "वॉटरमार्क नाही",
      "प्रीमियम टेम्पलेट्स",
      "प्राथमिकता ईमेल समर्थन",
    ],
    plan_pro_name: "प्रो",
    plan_pro_features: [
      "सर्व पर्सनल फीचर्स",
      "अनलिमिटेड डाउनलोड",
      "कस्टम डिझाइन विनंत्या",
      "थेट WhatsApp समर्थन",
    ],
    freeLabel: "मुक्त",
    premiumTemplatesLabel: "प्रीमियम टेम्पलेट्स",
    customDesignRequestsLabel: "कस्टम डिझाइन विनंत्या",
    directWhatsAppSupportLabel: "थेट WhatsApp समर्थन",
    unlimitedDownloadsLabel: "अनलिमिटेड डाउनलोड",
    watermarkedDownloadsLabel: "वॉटरमार्क केलेले डाउनलोड",
    featureLabel: "वैशिष्ट्य",
    // FAQ (Marathi)
    faqTitle: "वारंवार विचारले जाणारे प्रश्न",
    faqs: [
      {
        q: "मी नंतर माझी योजना अपग्रेड करू शकतो का?",
        a: "होय, आपण कधीही अपग्रेड करू शकता आणि फक्त फरक भरावा लागेल.",
      },
      {
        q: "पेमेंट सुरक्षित आहेत का?",
        a: "नक्कीच! आम्ही उद्योग-मानक एन्क्रिप्शन आणि Razorpay वापरतो.",
      },
      {
        q: "आपण परतावा देता का?",
        a: "अवापर केलेल्या प्रीमियम वैशिष्ट्यांसाठी 7 दिवसांच्या आत परतावा उपलब्ध आहे.",
      },
    ],
    // Contact-specific FAQs (Marathi)
    contactFaqs: [
      {
        q: "मला प्रतिसाद किती वेळेत मिळेल?",
        a: "व्यवसायाच्या दिवसांमध्ये आम्ही सर्व चौकशींना 24 तासांच्या आत प्रतिसाद देण्याचा प्रयत्न करतो.",
      },
      {
        q: "मी अपॉइंटमेंटशिवाय आपल्या कार्यालयात येऊ शकतो का?",
        a: "सुलभ अनुभवासाठी आम्ही अपॉइंटमेंट बुक करण्याची शिफारस करतो, परंतु कार्यालयीन वेळेत वॉक-इन स्वागतार्ह आहेत.",
      },
      {
        q: "आपण व्हर्च्युअल सल्ला देता का?",
        a: "होय, आपणाच्या सोयीसाठी आम्ही व्हिडिओ आणि फोन सल्ले देतो.",
      },
    ],
    // Language selector labels (Marathi)
    selectLanguageLabel: "भाषा निवडा",
    languageEnglish: "🇬🇧 English",
    languageMarathi: "🇮🇳 मराठी",
    testimonials: [
      {
        name: "अमित आणि नेहा",
        text: "लागनबंधानेमुळे आमच्या विवाह नियोजनाशी संबंधित सर्वकाही खूप सोपे झाले! आमंत्रणे सुंदर होती आणि सपोर्ट टीम उत्कृष्ट होती.",
        img: "/images/profile.jpg",
      },
      {
        name: "प्रिया आणि राहुल",
        text: "आम्हाला सानुकूलन पर्याय आवडले आणि कुटुंबासोबत आमंत्रणे शेअर करणे खूप सोपे होते.",
        img: "/images/photo-1633332755192-727a05c4013d.jpeg",
      },
      {
        name: "सोनल आणि अर्जुन",
        text: "बॅनर्स आणि टेम्पलेट्स अतिशय सुंदर आहेत. कोणत्याही कार्यक्रमासाठी शिफारस करतो!",
        img: "/images/leaf.png",
      },
    ],
    testimonialsTitle: "आमच्या वापरकर्त्यांनी काय म्हटले",

    trustedByDesc:
      "आमचे प्लॅटफॉर्म त्याच्या साधेपणा आणि परिणामांसाठी संपूर्ण भारतातील जोडपे आणि कुटुंबांमध्ये प्रिय आहे.",
    securePrivateDesc:
      "आपली माहिती आणि डिझाइन्स सुरक्षित आहेत आणि आपल्याच्या परवानगीशिवाय कधीही शेअर केले जात नाहीत.",
    fastFriendlySupportDesc:
      "आपल्याला जेव्हा हवे असते तेव्हा बॉट्स नव्हेत तर प्रत्यक्ष लोकांकडून मदत मिळवा.",

    // Transactions types
    credit: "क्रेडिट",
    debit: "डेबिट",

    // Footer
    quickLinks: "त्वरित दुवे",
    reachUs: "आमच्याशी संपर्क करा",
    followUs: "आमच्याला अनुसरा",
    trustedTagline: "लागनबंधाने सेवांसाठी आपला विश्वासार्ह प्लॅटफॉर्म.",
    // Auth / validation / alerts (Marathi)
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड पुन्हा टाका",
    profileUpdateSuccess: "प्रोफाइल यशस्वीरित्या अपडेट केले गेले",
    profileUpdateFailed: "प्रोफाइल अपडेट अयशस्वी",
    profileUpdateError: "प्रोफाइल अपडेट त्रुटी",
    loginSuccessTitle: "यश",
    loginSuccessText: "लॉगिन यशस्वी झाले!",
    loginErrorTitle: "त्रुटी",
    loginErrorTryAgain: "लॉगिन अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    loginFailedTitle: "लॉगिन अयशस्वी",
    loginInvalidCredentials: "अवैध ईमेल किंवा पासवर्ड!",
    loginNotFoundTitle: "सापडले नाही",
    loginNotFoundText: "वापरकर्ता सापडला नाही, कृपया नोंदणी करा!",
    signupSuccessTitle: "यश",
    signupSuccessText: "वापरकर्ता यशस्वीरित्या नोंदणीकृत झाला!",
    signupErrorTitle: "त्रुटी",
    signupErrorTryAgain: "नोंदणी अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    signupUserExistsTitle: "वापरकर्ता आधीच अस्तित्वात आहे",
    signupUserExistsText: "वापरकर्ता आधीच अस्तित्वात आहे!",
    // Validation messages (Marathi)
    requiredFullName: "पूर्ण नाव आवश्यक आहे",
    minFullName: "पूर्ण नाव किमान 2 वर्ण असावे",
    enterValidEmail: "योग्य ईमेल प्रविष्ट करा",
    requiredEmail: "ईमेल आवश्यक आहे",
    minPassword: "पासवर्ड किमान 6 अक्षरे आवश्यक आहे",
    requiredPassword: "पासवर्ड आवश्यक आहे",
    confirmPasswordRequired: "पासवर्डची पुष्टी आवश्यक आहे",
    passwordsMustMatch: "पासवर्ड जुळत नाहीत",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  // Merge English defaults with the selected language so missing keys fall back to English
  const t = { ...(translations.en || {}), ...(translations[language] || {}) };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
