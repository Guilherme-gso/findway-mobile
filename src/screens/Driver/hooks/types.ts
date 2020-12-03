export interface IDriverRegister {
  currentStep: number;
  user: IUser;
  company: ICompany;
  resources: IResources;

  toggleSteps(step: number): void;
  handleUser(user: IUser): void;
  handleCompany(company: ICompany): void;
  handleResources(resources: IResources): void;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  token: string;
  id: string;
}

export interface ICompany {
  company: string;
  phone: string;
  city: string;
  cpf?: string;
  cnpj?: string;
}

export interface IResources {
  uf: string;
  phone: string;
}
