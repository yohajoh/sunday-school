import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'am' | 'gez';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.users': 'Manage Users',
    'nav.assets': 'Manage Assets',
    'nav.posts': 'Post News',
    'nav.profile': 'Update Profile',
    'nav.whatsNew': "What's New",
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.welcome': 'Welcome to Sunday School Portal',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
  },
  am: {
    'nav.dashboard': 'ዳሽቦርድ',
    'nav.users': 'ተጠቃሚዎችን ያስተዳድሩ',
    'nav.assets': 'ንብረቶችን ያስተዳድሩ',
    'nav.posts': 'ዜና ያስተዳድሩ',
    'nav.profile': 'መገለጫ አዘምን',
    'nav.whatsNew': 'አዲስ ምንድን ነው',
    'auth.login': 'ግባ',
    'auth.signup': 'ተመዝገብ',
    'auth.email': 'ኢሜይል',
    'auth.password': 'የይለፍ ቃል',
    'auth.welcome': 'ወደ የእሁድ ትምህርት ቤት ፖርታል እንኳን በደህና መጡ',
    'common.save': 'አስቀምጥ',
    'common.cancel': 'ሰርዝ',
    'common.delete': 'አጥፋ',
    'common.edit': 'አርትዕ',
  },
  gez: {
    'nav.dashboard': 'ዳሽቦርድ',
    'nav.users': 'ተጠቃሚዎችን ያስተዳድሩ',
    'nav.assets': 'ንብረቶችን ያስተዳድሩ',
    'nav.posts': 'ዜና ያስተዳድሩ',
    'nav.profile': 'መገለጫ አዘምን',
    'nav.whatsNew': 'አዲስ ምንድን ነው',
    'auth.login': 'ግባ',
    'auth.signup': 'ተመዝገብ',
    'auth.email': 'ኢሜይል',
    'auth.password': 'የይለፍ ቃል',
    'auth.welcome': 'ወደ የእሁድ ትምህርት ቤት ፖርታል እንኳን በደህና መጡ',
    'common.save': 'አስቀምጥ',
    'common.cancel': 'ሰርዝ',
    'common.delete': 'አጥፋ',
    'common.edit': 'አርትዕ',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
