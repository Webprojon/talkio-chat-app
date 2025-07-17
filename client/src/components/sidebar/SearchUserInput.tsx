import { IoSearchOutline } from "react-icons/io5";

interface SearchUserInputProps {
	value: string;
	onChange: (value: string) => void;
}

export default function SearchUserInput({ value, onChange }: SearchUserInputProps) {
	return (
		<div className="flex items-center gap-2 py-2 px-1 mb-2 border-b">
			<IoSearchOutline className="size-6 sm:size-5" />
			<input
				type="text"
				name="search"
				id="search"
				autoComplete="off"
				value={value}
				placeholder="Search"
				className="w-full outline-none placeholder-color text-sm"
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}
