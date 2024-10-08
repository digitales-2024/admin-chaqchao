export type ClassPriceConfigData = {
  id: string;
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
  businessId: string;
};
