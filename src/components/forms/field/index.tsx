import "./field.scss";

type Props = {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  title: string;
  type: string;
  error: any;
  touched: boolean | undefined;
};

export const Field: React.FC<Props> = ({
  value,
  onChange,
  onBlur,
  placeholder,
  name,
  title,
  type,
  error,
  touched,
}) => {
  return (
    <label className="field">
      <span>{title}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
      {touched && (
        <div className="field_error">
          <span>{error}</span>
        </div>
      )}
    </label>
  );
};
