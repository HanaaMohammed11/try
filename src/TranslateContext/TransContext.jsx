import { createContext } from "react";
import { useTranslation } from "react-i18next";

const TranslateContext = createContext();

function TranslateProvider({ children }) {
  const { i18n } = useTranslation("global");

  function handleChangeLanguage(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <TranslateContext.Provider value={{ handleChangeLanguage }}>
      {children}
    </TranslateContext.Provider>
  );
}

export { TranslateContext, TranslateProvider };
