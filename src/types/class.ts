export type ClassData = {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  totalParticipants: number;
  totalAdults: number;
  totalChildren: number;
  totalPrice: number;
  totalPriceAdults: number;
  totalPriceChildren: number;
  languageClass: string;
  typeCurrency: string;
  dateClass: Date;
  scheduleClass: string;
};

export type ClassesDataAdmin = {
  dateClass: string;
  scheduleClass: string;
  totalParticipants: number;
  classLanguage: string;
  classes: ClassData[];
};
