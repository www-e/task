'use client';

import { useTranslation } from 'react-i18next';

// Custom hook to access translations
export const useAppTranslation = () => {
  const { t, i18n } = useTranslation();
  
  // Function to change language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  // Current language
  const currentLanguage = i18n.language;
  
  return {
    t,                    // Translation function
    changeLanguage,       // Function to change language
    currentLanguage,      // Current language code
    availableLanguages: ['en', 'ar'], // Available languages
  };
};

export default useAppTranslation;