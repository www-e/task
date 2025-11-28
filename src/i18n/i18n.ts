import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Default translations (English)
const resources = {
  en: {
    translation: {
      // Common
      'welcome': 'Welcome',
      'login': 'Login',
      'logout': 'Logout',
      'dashboard': 'Dashboard',
      'announcements': 'Announcements',
      'quizzes': 'Quizzes',
      'courses': 'Courses',
      'schedule': 'Schedule',
      'gradebook': 'Gradebook',
      'performance': 'Performance',

      // Dashboard
      'examsTime': 'EXAMS TIME',
      'readyForExams': 'Here we are, Are you ready to fight? Don\'t worry, we prepared some tips to be ready for your exams.',
      'whatsDue': 'What\'s due',
      'all': 'All',

      // Announcements
      'announcementsManagement': 'Announcements Management',
      'createEditAnnouncements': 'Create, edit, and manage all announcements from this dedicated page.',
      'newAnnouncement': 'New Announcement',
      'editAnnouncement': 'Edit Announcement',
      'addAnnouncement': 'Add Announcement',
      'updateAnnouncement': 'Update Announcement',
      'deleteAnnouncement': 'Delete Announcement',
      'author': 'Author',
      'subject': 'Subject',
      'content': 'Content',
      'avatarUrl': 'Avatar URL',
      'confirmDelete': 'Are you sure you want to delete this announcement?',
      'cancel': 'Cancel',
      'create': 'Create',
      'save': 'Save',

      // Quizzes
      'quizzesManagement': 'Quizzes & Assignments Management',
      'createEditQuizzes': 'Create, edit, and manage all quizzes and assignments from this dedicated page.',
      'newQuiz': 'New Quiz',
      'editQuiz': 'Edit Quiz',
      'addQuiz': 'Add Quiz',
      'updateQuiz': 'Update Quiz',
      'deleteQuiz': 'Delete Quiz',
      'title': 'Title',
      'course': 'Course',
      'topic': 'Topic',
      'dueDate': 'Due Date',
      'type': 'Type',
      'quiz': 'Quiz',
      'assignment': 'Assignment',
      'isCompleted': 'Is Completed',
      'confirmDeleteQuiz': 'Are you sure you want to delete this quiz?',
      'quizType': 'Quiz',
      'assignmentType': 'Assignment',

      // Errors
      'error': 'Error',
      'success': 'Success',
      'loading': 'Loading...',

      // Form validation
      'required': 'This field is required',
      'minLength': 'Minimum length is {{count}} characters',
      'maxLength': 'Maximum length is {{count}} characters',
      'invalidUrl': 'Please enter a valid URL',
      'invalidDate': 'Please select a valid date',

      // Other
      'close': 'Close',
      'yes': 'Yes',
      'no': 'No',
      'back': 'Back',
      'next': 'Next',
      'search': 'Search...',
      'user': 'User',
      'student': 'Student',
      'failedToLoadDashboard': 'Failed to load dashboard data. Is the backend running?',
    }
  },
  ar: { // Arabic translations
    translation: {
      // Common
      'welcome': 'مرحبا',
      'login': 'تسجيل الدخول',
      'logout': 'تسجيل الخروج',
      'dashboard': 'لوحة التحكم',
      'announcements': 'الإعلانات',
      'quizzes': 'الاختبارات',
      'courses': 'الدورات',
      'schedule': 'الجدول',
      'gradebook': 'سجل الدرجات',
      'performance': 'الأداء',

      // Dashboard
      'examsTime': 'وقت الامتحانات',
      'readyForExams': 'ها نحن ذا، هل أنت مستعد للقتال؟ لا تقلق، لقد قمنا بإعداد بعض النصائح للتحضير لامتحاناتك.',
      'whatsDue': 'ما هو المستحق',
      'all': 'الكل',

      // Announcements
      'announcementsManagement': 'إدارة الإعلانات',
      'createEditAnnouncements': 'إنشاء وتحرير وإدارة جميع الإعلانات من هذه الصفحة المخصصة.',
      'newAnnouncement': 'إعلان جديد',
      'editAnnouncement': 'تحرير الإعلان',
      'addAnnouncement': 'إضافة إعلان',
      'updateAnnouncement': 'تحديث الإعلان',
      'deleteAnnouncement': 'حذف الإعلان',
      'author': 'المؤلف',
      'subject': 'الموضوع',
      'content': 'المحتوى',
      'avatarUrl': 'رابط الصورة',
      'confirmDelete': 'هل أنت متأكد أنك تريد حذف هذا الإعلان؟',
      'cancel': 'إلغاء',
      'create': 'إنشاء',
      'save': 'حفظ',

      // Quizzes
      'quizzesManagement': 'إدارة الاختبارات والمهام',
      'createEditQuizzes': 'إنشاء وتحرير وإدارة جميع الاختبارات والمهام من هذه الصفحة المخصصة.',
      'newQuiz': 'اختبار جديد',
      'editQuiz': 'تحرير الاختبار',
      'addQuiz': 'إضافة اختبار',
      'updateQuiz': 'تحديث الاختبار',
      'deleteQuiz': 'حذف الاختبار',
      'title': 'العنوان',
      'course': 'الدورة',
      'topic': 'الموضوع',
      'dueDate': 'تاريخ الاستحقاق',
      'type': 'النوع',
      'quiz': 'اختبار',
      'assignment': 'مهمة',
      'isCompleted': 'مكتمل',
      'confirmDeleteQuiz': 'هل أنت متأكد أنك تريد حذف هذا الاختبار؟',
      'quizType': 'اختبار',
      'assignmentType': 'مهمة',

      // Errors
      'error': 'خطأ',
      'success': 'نجاح',
      'loading': 'جاري التحميل...',

      // Form validation
      'required': 'هذا الحقل مطلوب',
      'minLength': 'الحد الأدنى للطول هو {{count}} حرف',
      'maxLength': 'الحد الأقصى للطول هو {{count}} حرف',
      'invalidUrl': 'الرجاء إدخال رابط صالح',
      'invalidDate': 'الرجاء تحديد تاريخ صالح',

      // Other
      'close': 'إغلاق',
      'yes': 'نعم',
      'no': 'لا',
      'back': 'رجوع',
      'next': 'التالي',
      'search': 'بحث...',
      'user': 'المستخدم',
      'student': 'الطالب',
      'failedToLoadDashboard': 'فشل تحميل بيانات لوحة التحكم. هل الخادم يعمل؟',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    debug: process.env.NODE_ENV === 'development'
  });

export default i18n;