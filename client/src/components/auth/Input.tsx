import type { InputProps } from "../../lib/types";

export default function Input({ type, name, id, text, className, value, onChange }: InputProps) {
	return (
		<input
			id={id}
			type={type}
			name={name}
			value={value}
			autoComplete="off"
			placeholder={text}
			onChange={onChange}
			className={`bg-transparent py-3 sm:py-2 px-3 text-md rounded-md outline-none border font-extralight text-slate-400 placeholder-color ${className}`}
		/>
	);
}
