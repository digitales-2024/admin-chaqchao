export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: {
    id: string;
    name: string;
  }[];
};
