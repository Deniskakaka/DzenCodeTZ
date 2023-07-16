import "./field.scss";

type Props = {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  title: string;
  type: string;
  error: any;
};

export const Field: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  name,
  title,
  type,
  error,
}) => {
  return (
    <label className="field">
      <span>{title}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      <div className="field_error">{error && <span>{error}</span>}</div>
    </label>
  );
};
