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
  typeClass: TypeClass;
  methodPayment: MethodPayment;
};

export type ClassesDataAdmin = {
  id?: string;
  dateClass: string;
  scheduleClass: string;
  totalParticipants: number;
  languageClass: string;
  typeClass: TypeClass;
  isClosed: boolean;
  registers: ClassData[];
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
  [TypeClass.NORMAL]: "border-emerald-200  text-emerald-500",
  [TypeClass.PRIVATE]: "border-cyan-200  text-cyan-500",
  [TypeClass.GROUP]: "border-blue-200  text-blue-500",
};

export enum MethodPayment {
  PAYPAL = "PAYPAL",
  IZIPAY = "IZIPAY",
}
