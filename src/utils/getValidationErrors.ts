import { ValidationError } from 'yup';

interface IValidateErrors {
  [key: string]: string;
}

export function getValidationErrors(errors: ValidationError): IValidateErrors {
  const validationErrors: IValidateErrors = {};

  errors.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
