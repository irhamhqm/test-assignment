import { useFormContext } from "react-hook-form";

type FormTextInputProps = {
  name: string;
  label: string;
  type?: "text" | "password" | "number";
  placeholder?: string;
  isRequired?: boolean;
  registerOption?: object;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
};

export default function FormTextInput(props: FormTextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${props.containerClass} flex flex-col`}>
      <label
        className={props.labelClass}
        htmlFor={props.name}
      >
        {props.label}
        {props.isRequired ? (
          <span className="text-red-500"> *</span>
        ) : (
          <span className="text-[#8898aa]"> (Opsional)</span>
        )}
      </label>
      <input
        className={props.inputClass}
        {...register(props.name, props.registerOption || {})}
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
        required={props.isRequired}
      />
      {errors[props.name] && (
        <span className="text-red-500 mt-2">{`${
          errors[props.name]?.message
        }`}</span>
      )}
    </div>
  );
}
