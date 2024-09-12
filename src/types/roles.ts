export type Role = {
  id: number;
  name: string;
  description: string;
  rolPermissions: RolPermissions[];
};

export type RolPermissions = {
  id: number;
  module: Module;
  permissions: Permission[];
};

export interface Module {
  id: number;
  cod: string;
  name: string;
  description: string;
}

export interface Permission {
  id: number;
  cod: string;
  name: string;
  description: string;
}
