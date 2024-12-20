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
  comments: string;
};

export type ClassesDataAdmin = {
  dateClass: string;
  scheduleClass: string;
  totalParticipants: number;
  classLanguage: string;
  classes: ClassData[];
};

export enum TypeClass {
  NORMAL = "NORMAL",
  PRIVATE = "PRIVATE",
  GROUP = "GROUP",
}

// Translate los label de tipo de clase
export const typeClassLabels = {
  [TypeClass.NORMAL]: "Normal",
  [TypeClass.PRIVATE]: "Privada",
  [TypeClass.GROUP]: "Grupal",
};

export const typeClassColors = {
  [TypeClass.NORMAL]: "border-emerald-500 text-emerald-500",
  [TypeClass.PRIVATE]: "border-cyan-500 text-cyan-500",
  [TypeClass.GROUP]: "border-blue-500 text-blue-500",
};
