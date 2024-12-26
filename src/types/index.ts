export type { Credentials, UserLogin } from "./login";
export type { CustomErrorData, ErrorFormData } from "./error";
export type { User } from "./user";
export type {
  Role,
  RolPermissions,
  Module,
  Permission,
  ModulePermissions,
} from "./roles";
export type { BusinessConfigData } from "./businessConfig";
export type {
  BusinessHoursData,
  AllBusinessHoursData,
  BusinessHoursDataWithId,
} from "./businessHours";
export type {
  ClassPriceConfigData,
  ClassLanguageData,
  ClassRegistrationData,
  ClassScheduleData,
  TypeClassPricesData,
  ClassCapacityData,
  TypeClassCapacitiesData,
} from "./classConfigs";
export {
  type Category,
  type Family,
  familyLabels,
  familyOptions,
} from "./category";
export type {
  ProductData,
  ProductVariationData,
  CategoryData,
  ProductFilters,
  TopProductFilters,
  TopProduct,
} from "./product";
export type { Client } from "./client";

export type {
  Order,
  OrderDetails,
  OrderReportData,
  OrderFilters,
} from "./orders";
export { OrderStatus } from "./orders";

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export {
  type ClassData,
  type ClassesDataAdmin,
  TypeClass,
  typeClassLabels,
  typeClassColors,
} from "./class";
