import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { updateProfile, uploadProfileImage } from "@/features/profile/api/profileApi";
import type { Profile } from "@/features/profile/types/user";
import { getProfileImage } from "@/features/profile/utils/getProfileImage";
import { useToast } from "@/shared/toast/ToastContext";

export default function EditProfileModal({
	profile,
	isOpen,
	onClose,
}: {
	profile: Profile;
	isOpen: boolean;
	onClose: () => void;
}) {
	const { addToast } = useToast();

	const [fullName, setFullName] = useState(profile.fullName || "");
	const [bio, setBio] = useState(profile.bio || "");
	const [imageUrl, setImageUrl] = useState(profile.imageUrl || "");
	const [imageFile, setImageFile] = useState<File | null>(null);

	const closeModal = useCallback(() => {
		setFullName(profile.fullName);
		setBio(profile.bio || "");
		setImageUrl(profile.imageUrl || "");
		setImageFile(null);
		onClose();
	}, [onClose, profile.bio, profile.fullName, profile.imageUrl]);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeModal();
			}
		};
		if (isOpen) {
			document.addEventListener("keydown", onKeyDown);
		}
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [closeModal, isOpen]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setImageFile(file);
			setImageUrl(URL.createObjectURL(file));
		}
	};

	const handleSave = async () => {
		try {
			if (imageFile) {
				await uploadProfileImage(imageFile);
			}
			if (fullName !== profile.fullName || bio !== profile.bio) {
				await updateProfile({ fullName, bio });
			}
			onClose();
			window.location.reload();
		} catch {
			addToast({ type: "error", text: "Failed to update profile." });
		}
	};

	const handleDelete = async () => {
		console.log("Delete profile functionality to be implemented.");
	};

	const profileImageUrl = getProfileImage(imageUrl);

	return (
		<AnimatePresence>
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
					onClick={(e) => {
						if (e.target === e.currentTarget) closeModal();
					}}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md text-white shadow-lg"
					>
						<h2 className="text-xl font-bold mb-4">Edit Profile</h2>

						<label className="block mb-2">Profile Picture</label>
						<Image
							src={imageFile ? imageUrl : profileImageUrl!}
							alt="Preview"
							height={50}
							width={50}
							className="w-24 h-24 rounded-full object-cover mb-4"
						/>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="mb-4 block w-full text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0 file:text-sm file:font-semibold
                file:bg-zinc-700 file:text-white hover:file:bg-zinc-600 file:cursor-pointer"
						/>

						<label className="block mb-2">Full Name</label>
						<input
							type="text"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							className="w-full mb-4 px-3 py-2 rounded bg-zinc-800"
						/>

						<label className="block mb-2">Bio</label>
						<textarea
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							className="w-full mb-4 px-3 py-2 rounded bg-zinc-800"
						/>

						<div className="flex justify-between mt-6">
							<button
								onClick={handleDelete}
								className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 cursor-pointer"
							>
								Delete Profile
							</button>
							<div className="flex gap-2">
								<button
									onClick={onClose}
									className="px-4 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
								>
									Cancel
								</button>
								<button
									onClick={handleSave}
									className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 cursor-pointer"
								>
									Save
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
