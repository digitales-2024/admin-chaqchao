export type BusinessHoursData = {
  id: string;
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
};

export type BusinessHoursDataWithId = BusinessHoursData & {
  businessId: string;
};

export type AllBusinessHoursData = {
  businessHours: BusinessHoursData[];
  businessInfo: {
    id: string;
    businessName: string;
    contactNumber: string;
    email: string;
    address: string;
  };
};
