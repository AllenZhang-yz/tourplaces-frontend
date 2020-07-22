import { useCallback, useReducer } from 'react';

interface IInput {
  [inputId: string]: {
    value: string | File | undefined;
    isValid: boolean;
  };
}

interface IState {
  inputs: IInput;
  isValid: boolean;
}

const formReducer = (state: IState, action: any) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialState: IState) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const inputHandler = useCallback(
    (id: string, value: string | File | undefined, isValid: boolean) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value,
        isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback((inputData: IState) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData.inputs,
      formIsValid: inputData.isValid,
    });
  }, []);

  return [formState, inputHandler, setFormData] as const;
};
