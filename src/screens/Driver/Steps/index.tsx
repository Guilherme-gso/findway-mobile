import React from 'react';
import Steps from './layout';
import RegisterDriverProvider from '../hooks';

const StepProvider: React.FC = () => {
  return (
    <RegisterDriverProvider>
      <Steps />
    </RegisterDriverProvider>
  );
};

export default StepProvider;
