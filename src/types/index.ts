export type { BusinessConfigData } from "./businessConfig";
export type {
  AllBusinessHoursData,
  BusinessHoursData,
  BusinessHoursDataWithId,
} from "./businessHours";
export {
  familyLabels,
  familyOptions,
  type Category,
  type Family,
} from "./category";
export type {
  ClassCapacityData,
  ClassLanguageData,
  ClassPriceConfigData,
  ClassRegistrationData,
  ClassScheduleData,
  TypeClassCapacitiesData,
  TypeClassPricesData,
} from "./classConfigs";
export type { Client } from "./client";
export type { CustomErrorData, ErrorFormData } from "./error";
export type { Credentials, UserLogin } from "./login";
export type {
  CategoryData,
  ProductData,
  ProductFilters,
  ProductVariationData,
  TopProduct,
  TopProductFilters,
} from "./product";
export type {
  Module,
  ModulePermissions,
  Permission,
  Role,
  RolPermissions,
} from "./roles";
export type { User } from "./user";

export { OrderStatus } from "./orders";
export type {
  Order,
  OrderDetails,
  OrderFilters,
  OrderReportData,
} from "./orders";

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export {
  MethodPayment,
  TypeClass,
  typeClassColors,
  typeClassLabels,
  type ClassData,
  type ClassesDataAdmin,
} from "./class";

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
