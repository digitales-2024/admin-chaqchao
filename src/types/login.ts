export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  roles: { id: string; name: string }[];
  token: string;
};
