export const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'fr', title: 'French' },
  { id: 'ar', title: 'Arabic' }
]

export const baseLanguage = supportedLanguages.find(l => l.isDefault)
