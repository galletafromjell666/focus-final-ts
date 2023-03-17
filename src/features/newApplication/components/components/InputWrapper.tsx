import { Controller, Control, FieldError } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

interface InputWrapperProps {
  name: string;
  control: Control<any>;
  rules?: any;
  label: string;
  type: string;
}

function InputWrapper({ name, control, rules, label, type }: InputWrapperProps): JSX.Element {
  const fieldError = control.errors[name] as FieldError | undefined;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            className="form-control"
            id={name}
            type={type}
            {...field}
            value={field.value ?? ''}
            onChange={(e) => {
              field.onChange(e);
            }}
          />
        )}
      />
      <ErrorMessage error={fieldError} />
    </div>
  );
}

export default InputWrapper;
