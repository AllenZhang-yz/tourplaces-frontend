import React, { FC, ChangeEvent, useReducer, useEffect } from 'react';
import { validate } from '../../util/validators';
import { IInput, IValidators } from '../../../interfaces/other/Input';
import './Input.scss';

type ActionType = {
  type: 'CHANGE' | 'TOUCH';
  val?: string;
  validators?: IValidators[];
};

interface IState {
  inputValue: string;
  isValid: boolean;
  isTouched: boolean;
}

const inputReducer = (state: IState, action: ActionType) => {
  switch (action.type) {
    case 'CHANGE':
      if (action.val && action.validators) {
        return {
          ...state,
          inputValue: action.val,
          isValid: validate(action.val, action.validators),
        };
      } else if (!action.val && action.validators) {
        return {
          ...state,
          inputValue: '',
          isValid: validate('', action.validators),
        };
      } else {
        return state;
      }

    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input: FC<IInput> = ({
  id,
  label,
  element,
  type,
  placeholder,
  rows,
  errorText,
  validators,
  onInput,
  initialValue,
  initialIsValid,
}) => {
  const initialState: IState = {
    inputValue: initialValue || '',
    isValid: initialIsValid || false,
    isTouched: false,
  };

  const [inputState, dispatch] = useReducer(inputReducer, initialState);
  const { inputValue, isValid } = inputState;

  useEffect(() => {
    onInput(id, inputValue, isValid);
  }, [onInput, id, inputValue, isValid]);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };
  const el =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.inputValue}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.inputValue}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {el}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
