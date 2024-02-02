import { ChangeEvent } from "react";
import classNames from "classnames";
import "./Input.scss";

type TInputProps = {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  className: string;
};

const Input = ({ value, setValue, placeholder, className }: TInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="input">
      <input
        className={classNames("input__field", className)}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default Input;
