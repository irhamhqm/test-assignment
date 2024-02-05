import { useFormContext } from "react-hook-form";

type FormSelectInputProps = {
  name: string;
  label: string;
  disabled?: boolean;
  data: Array<{ id: number; name: string }>;
  isRequired?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
};

export default function FormSelectInput(props: FormSelectInputProps) {
  const { register } = useFormContext();
  return (
    <div className={`${props.containerClass} flex flex-col`}>
      <label
        className={props.labelClass}
        htmlFor="province"
      >
        {props.label}
        {props.isRequired ? (
          <span className="text-red-500"> *</span>
        ) : (
          <span className="text-[#8898aa]"> (Opsional)</span>
        )}
      </label>
      <select
        className={props.inputClass}
        {...register(props.name)}
        id={props.name}
        disabled={props.disabled}
      >
        <option
          disabled
          hidden
          value=""
        >
          - Pilih -
        </option>
        {props.data.map((value) => (
          <option
            key={value.id}
            value={value.id}
          >
            {value.name}
          </option>
        ))}
      </select>
    </div>
  );
}
