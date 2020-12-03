import React, { createContext, useCallback, useContext, useState } from 'react';
import { ICompany, IDriverRegister, IResources, IUser } from './types';

export const RegisterDriverContext = createContext({} as IDriverRegister);

const RegisterDriverProvider: React.FC = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [company, setCompany] = useState<ICompany>({} as ICompany);
  const [resources, setResources] = useState<IResources>({} as IResources);

  const toggleSteps = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const handleUser = useCallback((userData: IUser) => {
    setUser(userData);
  }, []);

  const handleCompany = useCallback((companyData: ICompany) => {
    setCompany(companyData);
  }, []);

  const handleResources = useCallback((resourcesData: IResources) => {
    setResources(resourcesData);
  }, []);

  return (
    <RegisterDriverContext.Provider
      value={{
        currentStep,
        user,
        company,
        resources,
        toggleSteps,
        handleUser,
        handleCompany,
        handleResources,
      }}
    >
      {children}
    </RegisterDriverContext.Provider>
  );
};

export const useRegisterDriver = (): IDriverRegister =>
  useContext(RegisterDriverContext);

export default RegisterDriverProvider;
