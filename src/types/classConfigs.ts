import { TypeClass } from "./class";

export type ClassPriceConfigData = {
  id: string;
  typeClass: TypeClass;
  classTypeUser: string;
  price: number;
  typeCurrency: string;
  businessId: string;
};
export type ClassLanguageData = {
  id: string;
  languageName: string;
  businessId: string;
};
export type ClassRegistrationData = {
  id: string;
  closeBeforeStartInterval: number;
  finalRegistrationCloseInterval: number;
  businessId: string;
};
export type ClassScheduleData = {
  id: string;
  startTime: string;
  typeClass: TypeClass;
  businessId: string;
};

export type TypeClassScheduleData = {
  [key in TypeClass]: ClassScheduleData[];
};

export type TypeClassPricesData = {
  [key in TypeClass]: ClassPriceConfigData;
};

export type ClassCapacityData = {
  id: string;
  typeClass: TypeClass;
  minCapacity: number;
  maxCapacity: number;
};

export type TypeClassCapacitiesData = {
  [key in TypeClass]: ClassCapacityData;
};
