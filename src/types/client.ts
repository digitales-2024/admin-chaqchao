export type Client = {
  id: string; // ID del cliente
  name: string; // Nombre del cliente
  email: string; // Correo electrónico del cliente
  phone: string; // Teléfono del cliente
  password: string; // Contraseña del cliente
  birthDate: Date; // Fecha de nacimiento (timestamp)
  isGoogleAuth: boolean; // Indica si el cliente se autenticó con Google
  token: string; // Token de autenticación
  lastLogin: string; // Último inicio de sesión (timestamp con zona horaria)
  isActive: boolean; // Indica si la cuenta está activa
  createdAt: string; // Fecha de creación (timestamp con zona horaria)
  updatedAt: string; // Fecha de última actualización (timestamp con zona horaria)
};
