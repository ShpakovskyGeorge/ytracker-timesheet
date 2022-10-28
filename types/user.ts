export type User = {
  self: string;
  uid: number;
  login: string;
  trackerUid: number;
  passportUid: number;
  firstName: string;
  lastName: string;
  display: string;
  email: string;
  external: boolean;
  hasLicense: boolean;
  dismissed: boolean;
  useNewFilters: boolean;
  disableNotifications: boolean;
  firstLoginDate: string;
  lastLoginDate: string;
  welcomeMailSent: boolean;
};
