export interface User {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termCondition: string;
  img: string | null | FileList;
  country: string;
}
