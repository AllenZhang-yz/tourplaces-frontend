export interface IValidators {
  type: string;
  val?: number;
}

export interface IInput {
  id: string;
  label: string;
  element: string;
  type?: any;
  placeholder?: string;
  rows?: number;
  errorText?: string;
  validators: IValidators[];
  onInput: (
    id: string,
    value: string | File | undefined,
    isValid: boolean
  ) => void;
  initialValue?: string;
  initialIsValid?: boolean;
}
