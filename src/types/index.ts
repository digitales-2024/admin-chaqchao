export type { Credentials, UserLogin } from "./login";
export type { CustomErrorData, ErrorFormData } from "./error";
export type { User } from "./user";
export type { Role, RolPermissions, Module, Permission } from "./roles";
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
} from "./classConfigs";

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}
