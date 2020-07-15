import NextI18Next from 'next-i18next'
import { NextComponentType, NextPageContext } from 'next'
import { useTranslation as originalUseTranslation } from 'react-i18next'
export const useTranslation = originalUseTranslation
export const nextI18next = new NextI18Next({
  defaultLanguage: 'en',
  localeSubpaths: {
    en: 'en',
    fr: 'fr',
  },
  localePath: typeof window === 'undefined' ? 'public/locales' : 'locales',
  fallbackLng: 'en',
  otherLanguages: ['fr'],
})

export const appWithTranslation = nextI18next.appWithTranslation
export const Trans = nextI18next.Trans

export const includeDefaultNamespaces = (namespaces: string[]) =>
  ["common", "_error"].concat(namespaces);

export type I18nPage<P = {}> = NextComponentType<
  NextPageContext,
  { namespacesRequired: string[] },
  P & { namespacesRequired: string[] }
>
