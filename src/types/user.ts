export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: Role[];
};

export type Role = {
  id: string;
  name: string;
};
