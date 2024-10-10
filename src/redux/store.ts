import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { adminApi } from "./services/adminApi";
import { authApi } from "./services/authApi";
import { businessConfigApi } from "./services/businessConfigApi";
import { businessHoursApi } from "./services/businessHoursApi";
import { categoriesApi } from "./services/categoriesApi";
import { classApi } from "./services/classApi";
import { classLanguageApi } from "./services/classLanguageConfigApi";
import { classPriceApi } from "./services/classPriceApi";
import { classRegistrationApi } from "./services/classRegistrationApi";
import { classScheduleApi } from "./services/classScheduleApi";
import { clientsApi } from "./services/clientsApi";
import { dataApi } from "./services/dataApi";
import { ordersApi } from "./services/ordersApi";
import { productsApi } from "./services/productsApi";
import { reportsApi } from "./services/reportsApi";
import { rolesApi } from "./services/rolesApi";
import { usersApi } from "./services/usersApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [businessConfigApi.reducerPath]: businessConfigApi.reducer,
    [businessHoursApi.reducerPath]: businessHoursApi.reducer,
    [classPriceApi.reducerPath]: classPriceApi.reducer,
    [classLanguageApi.reducerPath]: classLanguageApi.reducer,
    [classScheduleApi.reducerPath]: classScheduleApi.reducer,
    [classRegistrationApi.reducerPath]: classRegistrationApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configuración para evitar errores de "non-serializable value"
      serializableCheck: {
        // Ignorar las acciones que no son serializables, específicamente de classApi
        ignoredActions: [
          "classApi/executeMutation/fulfilled",
          "reportsApi/executeMutation/fulfilled",
          "ordersApi/executeMutation/fulfilled",
        ],
        // Ignorar las rutas en el estado que contienen valores no serializables
        ignoredPaths: ["classApi.mutations"],
      },
    })
      .concat(authApi.middleware)
      .concat(adminApi.middleware)
      .concat(usersApi.middleware)
      .concat(rolesApi.middleware)
      .concat(clientsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(businessConfigApi.middleware)
      .concat(businessHoursApi.middleware)
      .concat(classPriceApi.middleware)
      .concat(classLanguageApi.middleware)
      .concat(classScheduleApi.middleware)
      .concat(classRegistrationApi.middleware)
      .concat(productsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(classApi.middleware)
      .concat(reportsApi.middleware)
      .concat(dataApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
