export const orderInputs = [
  {
    id: 1,
    name: 'firstName',
    type: 'text',
    errorMessageAr: 'يجب ألا يحتوي الاسم على أية أرقام أو حروف خاصة',
    errorMessageFr: 'Le prénom ne doit comporter aucun caractère spécial',
    errorMessageEn: 'First name should not include any special characters',
    labelTextAr: 'الاسم',
    labelTextFr: 'Prénom',
    labelTextEn: 'First name',
    error: false
  },
  {
    id: 2,
    name: 'lastName',
    type: 'text',
    errorMessageAr: 'يجب ألا يحتوي الاسم على أية أرقام أو حروف خاصة',
    errorMessageFr: 'Le prénom ne doit comporter aucun caractère spécial',
    errorMessageEn: 'First name should not include any special characters',
    labelTextAr: 'اللقب',
    labelTextFr: 'Nom',
    labelTextEn: 'Last name',
    error: false
  },
  {
    id: 3,
    name: 'address',
    type: 'text',
    errorMessageAr: 'يرجى كتابة العنوان',
    errorMessageFr: "Veuillez entrer l'adresse. longueur minimale 5 caractères",
    errorMessageEn: 'Please enter the address. minimum length 5 characters',
    labelTextAr: 'العنوان',
    labelTextFr: 'Adresse',
    labelTextEn: 'Address',
    isWide: true,
    error: false
  },
  {
    id: 4,
    name: 'phone',
    type: 'text',
    errorMessageAr: 'يرجى إدخال رقم هاتف خليوي جزائري ',
    errorMessageFr: "Veuillez saisir un numéro de téléphone mobile algérien valide",
    errorMessageEn: 'Please enter a valid algerian mobile phone number',
    labelTextAr: 'رقم الهاتف',
    labelTextFr: 'Téléphone',
    labelTextEn: 'Phone',
    error: false
  },
  {
    id: 5,
    name: 'email',
    type: 'email',
    errorMessageAr: 'يرجى إدخال بريد إلكتروني صالح',
    errorMessageFr: "Veuillez entrer un email valide",
    errorMessageEn: 'Please enter a vaild email',
    labelTextAr: 'البريد الإلكتروني',
    labelTextFr: 'Email',
    labelTextEn: 'Email',
    error: false
  },
  {
    id: 6,
    name: 'notes',
    labelTextAr: 'ملاحظات إضافية',
    labelTextFr: 'Remarques',
    labelTextEn: 'Additional notes',
    isWide: true,
    textarea: true,
  }
]