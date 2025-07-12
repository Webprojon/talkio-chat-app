import { useState, type ChangeEvent } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

interface AuthUploadImageProps {
	userImage: File | null;
	setUserImage: (file: File | null) => void;
}

export default function AuthUploadImage({ setUserImage, userImage }: AuthUploadImageProps) {
	const [preview, setPreview] = useState<string | null>(null);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setUserImage(file);
			const reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="relative w-30">
			{preview && <img alt="avatar img" src={preview} className="w-30 h-20 object-cover border rounded-md" />}
			<input required type="file" id="avatarimg" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
			{!userImage && (
				<button type="button" className="flex-center flex-col gap-y-2 py-1 px-2 w-30 h-20 font-extralight border rounded-md text-slate-400">
					<MdOutlineCloudUpload className="size-5" />
					Profile Image
				</button>
			)}
		</div>
	);
}
