// NICE Computer Education - School of Coding, Yavatmal
// Calibrated AI Review Generator Engine
// Strict Line Counts (Short: 2-3 lines, Medium: 4-5 lines, Detailed: 7-8 lines)
// Clean Authentic Real-World Testimonials

const DEFAULT_GOOGLE_REVIEW_URL = 'https://g.page/r/CTKrEmKbJP-dEBM/review';
const DEFAULT_GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/3Vf5Vw4qnXcjUoPy5';

const COURSE_CATALOG = {
  coding: {
    'C & C++ Programming': [
      'C Programming',
      'C++ Programming'
    ],
    'Java Technologies': [
      'Core Java Programming (J2SE)',
      'Advanced Java (J2EE)'
    ],
    'Python & AI': [
      'Python Programming',
      'Python & AI Basics'
    ],
    'Web & PHP Development': [
      'Web Development',
      'PHP Programming',
      'ASP.NET & VB.NET'
    ]
  },
  professional: {
    'Accounting & Tally': [
      'Tally Prime with GST',
      'Tally ERP 9 with Invoicing'
    ],
    'Excel & Productivity': [
      'Advanced Excel & MIS Reports',
      'Office Productivity & Data Management'
    ],
    'Technical & Design': [
      'Computer Aided Design (CAD)',
      'Computer Hardware Troubleshooting',
      'Graphic Designing',
      'Hardware & Networking'
    ],
    'MS-CIT & Fundamentals': [
      'MS-CIT Certification',
      'Computer Fundamentals & Typing'
    ]
  }
};

// Application State
const state = {
  rating: 5,
  stream: 'coding', // 'coding' or 'professional'
  track: 'C & C++ Programming',
  course: 'C Programming',
  experience: 'Excellent',
  highlights: ['practical_labs', 'expert_faculty'],
  includeThanks: true,
  length: 'short', // default short (2-3 lines) or medium (4-5 lines) or deep (7-8 lines)
  language: 'en', // 'en', 'mr', 'hi'
  photoDataUrl: null,
  photoFileName: '',
  generatedReview: '',
  customExperience: '',
  reviewIndex: 0
};

// REVIEW TEMPLATES CALIBRATED EXACTLY BY LINE COUNT
const reviewsByLength = {
  en: {
    coding: {
      short: [
        "Completed my {course} training at NICE Computer Education, Yavatmal. The practical lab sessions and supportive teachers made programming concepts very clear and easy to learn. Highly recommended!",
        "Great learning experience in {course} at NICE Computer Education (School of Coding). Hands-on lab practicals and 1-on-1 doubt solving helped me build strong programming confidence. 5 stars!",
        "Best institute in Yavatmal for {course}! The faculty explains logic from scratch and provides plenty of computer lab practice. Truly satisfied with the training."
      ],
      medium: [
        "I recently completed the {course} program at NICE Computer Education in Yavatmal. The curriculum is completely practical-oriented with dedicated daily computer lab sessions. Faculty explains complex concepts clearly and helps resolve coding errors patiently. Highly satisfied with the teaching quality and recommend it to all students in Yavatmal.",
        "Enrolled in {course} at NICE Computer Education – School of Coding, Yavatmal. The instructors break down programming syntax into simple, logical steps. Extensive lab practice and real project guidance gave me the skills I needed. Special thanks to the faculty and Director for their constant encouragement!",
        "Outstanding practical training in {course} at NICE Computer Education. The classroom environment is very friendly and supportive for beginners. We write and execute actual code from day one in the computer lab. Strongly recommend this institute to anyone wanting to learn programming in Yavatmal."
      ],
      deep: [
        "Joining NICE Computer Education – School of Coding in Yavatmal for {course} was a great decision for my technical career. The faculty explains core concepts and logic building step-by-step right from the basics. We get extensive daily practice in the computer lab, which helped me write and debug programs with total confidence. The institute provides individual doubt-clearing sessions and career guidance that prepare students for real-world projects and interviews. The staff and Director are very supportive and always encouraging. I strongly recommend NICE Computer Education to anyone in Yavatmal looking for quality IT training!",
        "I had a fantastic learning experience completing {course} at NICE Computer Education, Yavatmal. The teaching methodology emphasizes hands-on computer lab work rather than just memorizing theory. Every topic is accompanied by practical exercises and mini-projects that strengthen your fundamentals. The trainers are polite, highly experienced, and explain every doubt patiently until you understand it completely. The lab infrastructure is well-maintained and provides a productive study atmosphere. Heartfelt thanks to the Director and all teachers for their exceptional coaching and support. 5 stars all the way!"
      ]
    },
    professional: {
      short: [
        "Completed my {course} from NICE Computer Education in Yavatmal. The practical billing examples and hands-on computer lab practice made learning so easy. Highly recommended!",
        "Excellent institute in Yavatmal for {course}! The teachers explain real-world office accounting and shortcut keys with great patience. Very satisfied with my training.",
        "Had a wonderful practical experience learning {course} at NICE Computer Education. Courteous staff, well-equipped computer lab, and job-oriented training. 5 stars!"
      ],
      medium: [
        "Completed my {course} certification from NICE Computer Education, Yavatmal. The faculty explains real-world business entries, reports, and practical workflows with great clarity. Ample computer lab practice helped me master the software shortcuts and speed. The coaching gave me full confidence for office jobs. Highly recommend it to all students!",
        "Very satisfied with my {course} training at NICE Computer Education in Wadgaon, Yavatmal. Trainers are supportive, experienced, and guide every student individually. Real-life assignments and practical reports were taught thoroughly. A special thanks to the Director and faculty for their dedicated guidance.",
        "NICE Computer Education is the best computer institute in Yavatmal for professional courses. I completed {course} here with complete hands-on practicals. Reasonable fees, polite teachers, and high-standard coaching make it the top choice for students and job aspirants."
      ],
      deep: [
        "I recently finished my {course} course at NICE Computer Education, Yavatmal, and it was a thoroughly rewarding experience. The faculty provided comprehensive practical knowledge of real-world office applications, reporting, and computer operations. What stands out is the personal attention given to each student in the lab to resolve queries without any hesitation. The training has greatly improved my computer efficiency and speed, giving me solid confidence to handle professional assignments. The management and teaching staff are always polite, helpful, and disciplined. I strongly recommend NICE Computer Education to anyone in Yavatmal seeking quality vocational computer skills!",
        "Enrolling in {course} at NICE Computer Education in Yavatmal has been extremely beneficial for my career skills. The course is structured systematically with real-world practical examples and daily computer lab sessions. The instructors explain every module patiently and ensure every student grasps the concepts thoroughly. The institute maintains a clean, modern computer lab with updated software and a peaceful learning environment. A heartfelt special thanks to the Director and teachers for their excellent guidance and support. Full 5 stars for their professionalism!"
      ]
    }
  },

  mr: {
    coding: {
      short: [
        "NICE Computer Education, यवतमाळ येथे {course} चा कोर्स पूर्ण केला. लॅबमधील प्रॅक्टिकल प्रोग्रॅमिंग आणि शिक्षकांचे वैयक्तिक मार्गदर्शन यामुळे संकल्पना सोप्या झाल्या. नक्की भेट द्या!",
        "यवतमाळमधील कोडिंग शिकण्यासाठी सर्वोत्तम संस्था! {course} चे प्रॅक्टिकल ज्ञान खूप छान मिळाले. शिक्षकांचे सहकार्य उत्तम आहे. ५ पैकी ५ स्टार्स!",
        "खूप छान अनुभव! NICE Computer Education मध्ये {course} प्रॅक्टिकलवर भर देऊन शिकवला गेला. प्रोग्रॅमिंगची भीती पूर्णपणे दूर झाली. सर्वांना शिफारस करतो."
      ],
      medium: [
        "नाईस कॉम्प्युटर एज्युकेशन (स्कूल ऑफ कोडिंग), यवतमाळ येथे {course} पूर्ण करण्याचा अनुभव खूप उत्तम राहिला. केवळ थिअरी न शिकवता कॉम्प्युटर लॅबमध्ये भरपूर प्रॅक्टिकल करून घेतले जाते. शिक्षक प्रत्येक प्रोग्रॅमचे लॉजिक अगदी सोप्या भाषेत समजावून सांगतात. सर्व डाऊट्सचे लगेच निरसन केले जाते. यवतमाळमधील सर्व विद्यार्थ्यांना मनापासून शिफारस करतो.",
        "मी नाईस कॉम्प्युटर एज्युकेशन येथून {course} चे दर्जेदार प्रशिक्षण पूर्ण केले. शिक्षकांची शिकवण्याची हातोटी अतिशय वाखाणण्याजोगी आहे. प्रॅक्टिकल प्रोजेक्ट्स आणि दैनंदिन लॅब प्रॅक्टिसमुळे कोडिंगमधील आत्मविश्वास वाढला. संचालक सर आणि सर्व शिक्षकांचे मनःपूर्वक आभार!",
        "यवतमाळमध्ये प्रोग्रॅमिंग आणि कॉम्प्युटर शिक्षणासाठी नाईस कॉम्प्युटर एज्युकेशन ही सर्वोत्तम संस्था आहे. {course} दरम्यान प्रत्येक अडचण शांतपणे सोडवण्यात आली. संस्थेतील वातावरण अभ्यासपूर्ण आणि सहकार्यपूर्ण आहे. नक्की प्रवेश घ्या!"
      ],
      deep: [
        "नाईस कॉम्प्युटर एज्युकेशन – स्कूल ऑफ कोडिंग (यवतमाळ) येथे {course} चा कोर्स करण्याचा माझा अनुभव अत्यंत समाधानकारक ठरला. सुरुवातीपासूनच मूलभूत संकल्पना, सिंटॅक्स आणि लॉजिक बिल्डिंगवर विशेष भर दिला गेला. दररोज सुसज्ज कॉम्प्युटर लॅबमध्ये स्वतः प्रोग्रॅम लिहून व रन करून पाहिल्यामुळे खरी प्रॅक्टिस झाली. शिक्षक अतिशय अनुभवी, संयमी असून प्रत्येक विद्यार्थ्याकडे वैयक्तिक लक्ष देतात. भविष्यातील मुलाखती आणि प्रोजेक्ट्ससाठी हे मार्गदर्शन खूप उपयुक्त ठरले. संस्थेचे संचालक आणि सर्व शिक्षकांचे विशेष आभार. यवतमाळमधील कोडिंग शिकू इच्छिणाऱ्या सर्व तरुणांना मी या संस्थेची नक्कीच शिफारस करतो!"
      ]
    },
    professional: {
      short: [
        "NICE Computer Education, यवतमाळ येथे {course} चा अनुभव खूपच उपयुक्त ठरला. प्रॅक्टिकल बिलिंग आणि रिपोर्टिंगचे उत्तम ज्ञान मिळाले. धन्यवाद!",
        "व्यावसायिक कॉम्प्युटर कोर्सेससाठी यवतमाळमधील सर्वोत्तम संस्था! {course} चे प्रात्यक्षिक प्रशिक्षण खूप छान दिले गेले. ५ स्टार्स!",
        "खूप दर्जेदार शिकवणी आणि उत्तम कॉम्प्युटर लॅब. {course} मुळे ऑफिस कामाचा आत्मविश्वास वाढला. नक्की शिफारस करतो."
      ],
      medium: [
        "नाईस कॉम्प्युटर एज्युकेशन, यवतमाळ येथून {course} चे प्रशिक्षण पूर्ण करून मला अत्यंत समाधान मिळाले. व्यावसायिक हिशोब, बिलींग आणि ऑफिस कामकाजाचे सखोल प्रात्यक्षिक ज्ञान देण्यात आले. लॅबमध्ये वेळेचे कोणतेही बंधन न ठेवता पुरेसा सराव करू दिला जातो. शिक्षक अतिशय नम्र आणि मार्गदर्शक आहेत. सर्व गरजू विद्यार्थ्यांना मनापासून शिफारस करतो.",
        "मी नाईस कॉम्प्युटर एज्युकेशनमध्ये {course} यशस्वीरीत्या पूर्ण केला. प्रत्यक्ष कामाचा अनुभव लॅबमध्येच घेता आला. महत्त्वाचे कीबोर्ड शॉर्टकट्स आणि डेटा मॅनेजमेंट उत्तम समजले. संचालक सर आणि संपूर्ण स्टाफचे सहकार्याबद्दल मनःपूर्वक धन्यवाद!"
      ],
      deep: [
        "नाईस कॉम्प्युटर एज्युकेशन, यवतमाळ येथे {course} शिकण्याचा माझा निर्णय अतिशय योग्य ठरला. अभ्यासक्रम संपूर्णपणे आजच्या नोकरी व व्यवसायातील गरजेनुसार तयार केलेला आहे. शिक्षकांनी प्रत्येक टॉपिक बारकाईने समजावून सांगितला आणि भरपूर सराव करून घेतला. लॅबमधील आधुनिक सुविधा आणि शांत वातावरणामुळे शिकणे अतिशय सुलभ झाले. या प्रशिक्षणामुळे मला ऑफिसमध्ये आत्मविश्वासाने काम करण्याचे बळ मिळाले आहे. माफक फी आणि दर्जेदार शिक्षण यामुळे ही संस्था यवतमाळमध्ये सर्वांसाठी सर्वोत्तम ठरते!"
      ]
    }
  },

  hi: {
    coding: {
      short: [
        "NICE Computer Education, यवतमाल में {course} की ट्रेनिंग बहुत ही बढ़िया रही। यहाँ लैब में प्रैक्टिकल कोडिंग और शिक्षकों के सपोर्ट से बहुत कुछ सीखने को मिला। बेस्ट इंस्टिट्यूट!",
        "यवतमाल का सबसे अच्छा कोडिंग सेंटर! {course} की हर प्रोग्रामिंग कॉन्सेप्ट को बहुत आसान तरीके से समझाया गया। 5/5 स्टार्स!",
        "शानदार अनुभव! NICE Computer Education में प्रैक्टिकल लैब ट्रेनिंग और फ्रेंडली वातावरण मिलता है। कोडिंग सीखने के लिए बेस्ट जगह!"
      ],
      medium: [
        "नाइस कंप्यूटर एजुकेशन – स्कूल ऑफ कोडिंग (यवतमाल) में {course} सीखने का मेरा अनुभव बेहद शानदार रहा। यहाँ थ्योरी से ज्यादा कंप्यूटर लैब में प्रैक्टिकल कोडिंग पर ध्यान दिया जाता है। शिक्षक हर एरर और डाउट को बहुत धैर्य से हल कराते हैं। प्रोजेक्ट वर्क से बहुत अच्छी समझ बनी। यवतमाल के सभी स्टूडेंट्स को 100% रेकमेंडेड!",
        "मैंने नाइस कंप्यूटर एजुकेशन से {course} का कोर्स पूरा किया है। यहाँ का वातावरण बहुत ही सकारात्मक और प्रेरणादायी है। एक-एक टॉपिक को बेसिक से एडवांस तक प्रैक्टिकल के साथ सिखाया गया। डायरेक्टर सर और पूरी फैकल्टी का सहयोग सराहनीय रहा। बहुत-बहुत धन्यवाद!"
      ],
      deep: [
        "नाइस कंप्यूटर एजुकेशन – स्कूल ऑफ कोडिंग (यवतमाल) में {course} ज्वाइन करना मेरे करियर के लिए सबसे सही फैसला रहा। यहाँ प्रोग्रामिंग लॉजिक और सिंटैक्स को बहुत ही सरल तरीके से सिखाया जाता है। रोजाना कंप्यूटर लैब में हैंड्स-ऑन कोडिंग कराई जाती है, जिससे कोडिंग का डर पूरी तरह दूर हो गया। शिक्षकों का व्यवहार बहुत ही सहयोगी और अनुभवी है। वे हर छात्र पर व्यक्तिगत ध्यान देते हैं। इंटरव्यू और प्रोजेक्ट्स के लिए भी बेहतरीन टिप्स मिले। मैं यवतमाल के सभी कॉलेज और स्कूल छात्रों को इस संस्थान की दिल से सिफारिश करता हूँ!"
      ]
    },
    professional: {
      short: [
        "NICE Computer Education, यवतमाल में {course} की प्रैक्टिकल ट्रेनिंग बहुत ही बेहतरीन रही। रियल-लाइफ एग्जांपल्स से सब कुछ आसानी से समझ आया। 5 स्टार्स!",
        "यवतमाल में प्रोफेशनल कंप्यूटर कोर्सेज के लिए बेस्ट इंस्टिट्यूट! {course} के दौरान एक-एक चीज़ प्रैक्टिकल करके सिखाई गई। धन्यवाद!",
        "बहुत ही अच्छा अनुभव रहा! ऑफिस और जॉब की जरूरतों के हिसाब से बहुत ही शानदार ट्रेनिंग दी जाती है। हाईली रेकमेंडेड!"
      ],
      medium: [
        "नाइस कंप्यूटर एजुकेशन, यवतमाल से {course} का कोर्स पूरा करके मुझे बहुत खुशी हुई। यहाँ प्रैक्टिकल बिलिंग, रिपोर्टिंग और शॉर्टकट कीज का भरपूर अभ्यास कराया गया। शिक्षकों का रवैया बहुत ही सहयोगात्मक है और वे हर डाउट को तुरंत क्लियर करते हैं। जॉब की तैयारी करने वालों के लिए यह एक उत्तम संस्थान है।",
        "मैंने यहाँ {course} की व्यावहारिक ट्रेनिंग ली और बहुत ही उपयोगी कार्यकुशलता हासिल की। लैब की सुविधा और फैकल्टी का सपोर्ट बहुत ही बढ़िया है। डायरेक्टर सर और सभी टीचर्स का दिल से धन्यवाद!"
      ],
      deep: [
        "नाइस कंप्यूटर एजुकेशन, यवतमाल में {course} का मेरा पूरा अनुभव बहुत ही संतोषजनक और ज्ञानवर्धक रहा। कोर्स का सिलेबस पूरी तरह प्रैक्टिकल और इंडस्ट्री की जरूरतों के मुताबिक है। लैब में हर असाइनमेंट को खुद से करने का पूरा मौका और समय मिलता है। शिक्षकों ने बहुत ही धैर्यपूर्वक और पेशेवर अंदाज में सब कुछ सिखाया, जिससे मेरा आत्मविश्वास काफी बढ़ गया है। रीजनेबल फीस में टॉप-क्लास एजुकेशन मिलना यहाँ की सबसे बड़ी खूबी है। यवतमाल के सभी युवाओं को मैं इस संस्थान से जुड़ने की पूरी सलाह देता हूँ!"
      ]
    }
  }
};

// DOM References
const starContainer = document.getElementById('starContainer');
const ratingLabel = document.getElementById('ratingLabel');
const ratingHelp = document.getElementById('ratingHelp');
const grievanceContainer = document.getElementById('grievanceContainer');
const positiveFlowContainer = document.getElementById('positiveFlowContainer');
const grievanceText = document.getElementById('grievanceText');

const tabCoding = document.getElementById('tabCoding');
const tabProfessional = document.getElementById('tabProfessional');
const trackSelectorContainer = document.getElementById('trackSelectorContainer');
const courseChipsContainer = document.getElementById('courseChipsContainer');
const coursePrompt = document.getElementById('coursePrompt');

const cameraInput = document.getElementById('cameraInput');
const galleryInput = document.getElementById('galleryInput');
const photoPreviewBox = document.getElementById('photoPreviewBox');
const uploadedPhotoPreview = document.getElementById('uploadedPhotoPreview');
const removePhotoBtn = document.getElementById('removePhotoBtn');

const highlightsCoding = document.getElementById('highlightsCoding');
const highlightsProfessional = document.getElementById('highlightsProfessional');
const customExpInput = document.getElementById('customExpInput');
const includeThanksToggle = document.getElementById('includeThanksToggle');

const reviewText = document.getElementById('reviewText');
const regenerateBtn = document.getElementById('regenerateBtn');
const refreshReviewActionBtn = document.getElementById('refreshReviewActionBtn');
const copyAndOpenBtn = document.getElementById('copyAndOpenBtn');

const successModal = document.getElementById('successModal');
const modalOpenGoogleBtn = document.getElementById('modalOpenGoogleBtn');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const toastNotification = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');

// Toast helper
function showToast(msg) {
  toastMessage.textContent = msg;
  toastNotification.classList.remove('opacity-0', 'pointer-events-none');
  toastNotification.classList.add('opacity-100');
  setTimeout(() => {
    toastNotification.classList.remove('opacity-100');
    toastNotification.classList.add('opacity-0', 'pointer-events-none');
  }, 2800);
}

// Set Star Rating
function setRating(val) {
  state.rating = val;
  const stars = starContainer.querySelectorAll('.star-btn');
  stars.forEach((btn) => {
    const starVal = parseInt(btn.dataset.value, 10);
    if (starVal <= val) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const ratingCaptions = {
    5: "5 Star Rating Selected ⭐",
    4: "4 Star Rating Selected ⭐",
    3: "3 Star Rating Selected",
    2: "2 Star Rating Selected",
    1: "1 Star Rating Selected"
  };

  ratingLabel.textContent = ratingCaptions[val];

  if (val >= 4) {
    ratingHelp.textContent = "Thank you! We will prepare your positive review note for Google.";
    grievanceContainer.classList.add('hidden');
    positiveFlowContainer.classList.remove('hidden');
    generateCalibratedReview();
  } else {
    ratingHelp.textContent = "We value your honest feedback. Please let our Director know directly.";
    grievanceContainer.classList.remove('hidden');
    positiveFlowContainer.classList.add('hidden');
  }
}

// Switch Stream: 'coding' vs 'professional'
function setStream(stream) {
  state.stream = stream;
  if (stream === 'coding') {
    tabCoding.classList.add('active');
    tabProfessional.classList.remove('active');
    coursePrompt.textContent = "Which coding or programming course did you join?";
    highlightsCoding.classList.remove('hidden');
    highlightsProfessional.classList.add('hidden');
  } else {
    tabProfessional.classList.add('active');
    tabCoding.classList.remove('active');
    coursePrompt.textContent = "Which professional or computer skill course did you join?";
    highlightsProfessional.classList.remove('hidden');
    highlightsCoding.classList.add('hidden');
  }

  // Set default track & courses
  const tracks = Object.keys(COURSE_CATALOG[stream]);
  state.track = tracks[0];
  state.course = COURSE_CATALOG[stream][state.track][0];
  renderTracksAndCourses();
  generateCalibratedReview();
}

// Render Track Chips & Course Chips
function renderTracksAndCourses() {
  const tracks = Object.keys(COURSE_CATALOG[state.stream]);
  trackSelectorContainer.innerHTML = tracks.map((t) => {
    const isActive = t === state.track ? 'active' : '';
    return `<button class="chip-btn track-chip ${isActive} p-2.5 sm:p-3 rounded-xl font-bold text-xs sm:text-sm text-center" data-track="${t}">${t}</button>`;
  }).join('');

  renderCourseChips();
}

function renderCourseChips() {
  const courses = COURSE_CATALOG[state.stream][state.track] || [];
  courseChipsContainer.innerHTML = courses.map((c) => {
    const isActive = c === state.course ? 'active' : '';
    return `<button class="chip-btn course-chip ${isActive} px-3 py-1.5 rounded-lg text-xs font-semibold" data-course="${c}">${c}</button>`;
  }).join('');
}

// Strict Calibrated Review Generation Engine
function generateCalibratedReview() {
  const lang = state.language;
  const stream = state.stream;
  const len = state.length; // 'short', 'medium', 'deep'
  const pool = reviewsByLength[lang][stream][len] || reviewsByLength['en'][stream]['short'];

  // Select base calibrated review
  let review = pool[state.reviewIndex % pool.length];
  review = review.replace(/\{course\}/g, state.course);

  // If user typed a custom experience note, cleanly append it
  const custom = state.customExperience.trim();
  if (custom) {
    review = review.trim() + " " + custom;
  }

  // Clean all duplicate whitespace, ensure crisp layout
  review = review.replace(/\s+/g, ' ').trim();

  state.generatedReview = review;
  reviewText.value = review;
}

// Record Review to LocalStorage for Admin Dashboard
function recordReviewSubmission(status) {
  const reviews = JSON.parse(localStorage.getItem('nice_reviews_db') || '[]');
  const newEntry = {
    id: 'REV-' + Date.now().toString(36).toUpperCase(),
    timestamp: new Date().toISOString(),
    name: 'Student Reviewer',
    stream: state.stream,
    course: state.course,
    rating: state.rating,
    status: status,
    reviewText: state.rating >= 4 ? reviewText.value : (grievanceText.value || 'Private Feedback'),
    hasPhoto: !!state.photoDataUrl
  };
  reviews.unshift(newEntry);
  localStorage.setItem('nice_reviews_db', JSON.stringify(reviews));
}

// Photo Upload Handler (Camera & Gallery)
function setupPhotoUpload() {
  function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      state.photoDataUrl = e.target.result;
      state.photoFileName = file.name;
      uploadedPhotoPreview.src = state.photoDataUrl;
      photoPreviewBox.classList.remove('hidden');
      showToast('Photo attached! 📸 Ready for Google.');
    };
    reader.readAsDataURL(file);
  }

  cameraInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
  galleryInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

  removePhotoBtn.addEventListener('click', () => {
    state.photoDataUrl = null;
    state.photoFileName = '';
    cameraInput.value = '';
    galleryInput.value = '';
    uploadedPhotoPreview.src = '';
    photoPreviewBox.classList.add('hidden');
    showToast('Photo removed.');
  });
}

// Initialize App
function initializeApp() {
  // Star Clicks
  starContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.star-btn');
    if (btn) {
      const val = parseInt(btn.dataset.value, 10);
      setRating(val);
    }
  });

  // Track Clicks
  trackSelectorContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.track-chip');
    if (!btn) return;
    trackSelectorContainer.querySelectorAll('.track-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.track = btn.dataset.track;
    state.course = COURSE_CATALOG[state.stream][state.track][0];
    renderCourseChips();
    generateCalibratedReview();
  });

  // Course Clicks
  courseChipsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.course-chip');
    if (!btn) return;
    courseChipsContainer.querySelectorAll('.course-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.course = btn.dataset.course;
    generateCalibratedReview();
  });

  // Experience Clicks
  document.querySelectorAll('.exp-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.exp-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.experience = btn.dataset.exp;
      generateCalibratedReview();
    });
  });

  // Highlights Clicks (Toggleable)
  [highlightsCoding, highlightsProfessional].forEach((container) => {
    container.addEventListener('click', (e) => {
      const chip = e.target.closest('.highlight-chip');
      if (!chip) return;
      chip.classList.toggle('active');
      state.reviewIndex++;
      generateCalibratedReview();
    });
  });

  // Custom Note Input
  customExpInput.addEventListener('input', (e) => {
    state.customExperience = e.target.value;
    generateCalibratedReview();
  });

  // Staff Thanks Toggle
  includeThanksToggle.addEventListener('change', (e) => {
    state.includeThanks = e.target.checked;
    generateCalibratedReview();
  });

  // Length Chips
  document.querySelectorAll('.length-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.length-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.length = btn.dataset.length;
      generateCalibratedReview();
    });
  });

  // Language Chips
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.language = btn.dataset.lang;
      generateCalibratedReview();
      showToast(`Language switched to ${btn.dataset.lang.toUpperCase()}!`);
    });
  });

  // Regenerate / Refresh Button
  function triggerRefresh() {
    state.reviewIndex++;
    generateCalibratedReview();
    showToast('Generated new review variation! 🔄');
  }

  regenerateBtn.addEventListener('click', triggerRefresh);
  refreshReviewActionBtn.addEventListener('click', triggerRefresh);

  // 2-in-1 Action Button: Copy Review & Open Google
  copyAndOpenBtn.addEventListener('click', async () => {
    const textToCopy = reviewText.value.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        reviewText.select();
        document.execCommand('copy');
      }
      showToast('Review copied to clipboard! 📋');
    } catch (err) {
      console.warn('Clipboard copy error:', err);
    }

    recordReviewSubmission('copied_google');
    successModal.classList.remove('hidden');
  });

  // Modal Actions
  modalOpenGoogleBtn.addEventListener('click', () => {
    window.open(DEFAULT_GOOGLE_REVIEW_URL, '_blank');
  });

  modalCloseBtn.addEventListener('click', () => {
    successModal.classList.add('hidden');
  });

  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) successModal.classList.add('hidden');
  });

  // Secret 5-Tap on Brand Logo for Admin Portal
  let logoTaps = 0;
  let logoTapTimer = null;
  const brandLogo = document.getElementById('brandLogoClickable');
  if (brandLogo) {
    brandLogo.addEventListener('click', () => {
      logoTaps++;
      clearTimeout(logoTapTimer);
      if (logoTaps >= 5) {
        logoTaps = 0;
        showToast('🔓 Opening Admin Portal...');
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 600);
      }
      logoTapTimer = setTimeout(() => {
        logoTaps = 0;
      }, 2000);
    });
  }

  setupPhotoUpload();
  setStream('coding'); // Initial stream
  setRating(5); // Default 5 Stars
}

document.addEventListener('DOMContentLoaded', initializeApp);
