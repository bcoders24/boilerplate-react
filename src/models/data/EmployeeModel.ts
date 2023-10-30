export interface EmployeeValues {
  id?: string;
  fullName: string;
  email: string;
  mobile: string;
  city?: string;
  gender?: string;
  departmentId?: string;
  hireDate?: Date | null;
  isPermanent?: boolean;
}
