"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

import { fetchRegister } from "@/features/auth/api/authApi";
import { ApiError } from "@/lib/api/httpTypes";
import Form from "@/shared/components/form/Form";
import FormItem from "@/shared/components/form/FormItem";
import InputField from "@/shared/components/form/InputField";
import Button from "@/shared/components/ui/Button";
import { useToast } from "@/shared/toast/ToastContext";
import {
	validateEmail,
	validateFullName,
	validateHandle,
	validatePassword,
} from "@/shared/utils/validation";

export default function RegisterForm() {
	const router = useRouter();
	const { addToast } = useToast();

	const [formData, setFormData] = useState({
		handle: "",
		email: "",
		password: "",
		confirmPassword: "",
		fullName: "",
	});
	const [formErrors, setFormErrors] = useState({
		handle: "",
		email: "",
		password: "",
		confirmPassword: "",
		fullName: "",
		global: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setFormErrors((prev) => ({ ...prev, [name]: "", global: "" }));
	};

	const handleRegister = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setFormErrors({
			handle: "",
			email: "",
			password: "",
			confirmPassword: "",
			fullName: "",
			global: "",
		});

		let valid = true;
		const newErrors = {
			handle: "",
			email: "",
			password: "",
			confirmPassword: "",
			fullName: "",
			global: "",
		};

		const handleValidation = validateHandle(formData.handle);
		if (!handleValidation.isValid) {
			newErrors.handle = handleValidation.error;
			valid = false;
		}

		const emailValidation = validateEmail(formData.email);
		if (!emailValidation.isValid) {
			newErrors.email = emailValidation.error;
			valid = false;
		}

		const passwordValidation = validatePassword(formData.password);
		if (!passwordValidation.isValid) {
			newErrors.password = passwordValidation.error;
			valid = false;
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.password = "Passwords do not match";
			newErrors.confirmPassword = "Passwords do not match";
			valid = false;
		}

		const fullNameValidation = validateFullName(formData.fullName);
		if (!fullNameValidation.isValid) {
			newErrors.fullName = fullNameValidation.error;
			valid = false;
		}

		if (!valid) {
			setFormErrors(newErrors);
			setLoading(false);
			return;
		}

		try {
			await fetchRegister({
				handle: formData.handle,
				email: formData.email,
				password: formData.password,
				fullName: formData.fullName,
			});
			addToast({ text: "Account created successfully! Please log in.", type: "success" });
			router.push("/login");
		} catch (err: unknown) {
			if (err instanceof ApiError) {
				switch (err.status) {
					case 409:
						if (err.details?.field === "email") newErrors.email = err.details.issue;
						else if (err.details?.field === "handle")
							newErrors.handle = err.details.issue;
						else newErrors.global = err.details?.issue || "Conflict error";
						break;
					case 500:
						addToast({ text: "Server error. Please try again later.", type: "error" });
						break;
					default:
						newErrors.global = err.message || "Registration failed";
				}
			} else {
				addToast({
					text: "An unexpected error occurred. Please try again.",
					type: "error",
				});
			}
			setFormErrors(newErrors);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center w-full py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md sm:max-w-lg bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-lg">
				<Form onSubmit={handleRegister} noValidate>
					<div className="mb-6 flex flex-row items-center justify-between gap-4">
						<h1 className="text-3xl sm:text-4xl font-bold text-mono-50 text-center sm:text-left">
							Register
						</h1>
						<Image
							src="/images/logo.png"
							alt="Logo"
							width={50}
							height={50}
							priority
							className="invert"
						/>
					</div>

					<FormItem label="Handle" error={formErrors.handle}>
						<InputField
							name="handle"
							type="text"
							value={formData.handle}
							onChange={onChange}
							error={formErrors.handle}
							required
							prefix="@"
						/>
					</FormItem>

					<FormItem label="Email" error={formErrors.email}>
						<InputField
							name="email"
							type="email"
							value={formData.email}
							onChange={onChange}
							error={formErrors.email}
							required
						/>
					</FormItem>

					<FormItem label="Password" error={formErrors.password}>
						<InputField
							name="password"
							type={showPassword ? "text" : "password"}
							value={formData.password}
							onChange={onChange}
							error={formErrors.password}
							required
							suffix={
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="text-mono-50 focus:outline-none cursor-pointer"
									tabIndex={-1}
									aria-label={showPassword ? "Hide password" : "Show password"}
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							}
						/>
					</FormItem>

					<FormItem label="Confirm Password" error={formErrors.confirmPassword}>
						<InputField
							name="confirmPassword"
							type={showConfirmPassword ? "text" : "password"}
							value={formData.confirmPassword}
							onChange={onChange}
							error={formErrors.confirmPassword}
							required
							suffix={
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="text-mono-50 focus:outline-none cursor-pointer"
									tabIndex={-1}
									aria-label={
										showConfirmPassword ? "Hide password" : "Show password"
									}
								>
									{showConfirmPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							}
						/>
					</FormItem>

					<FormItem label="Full Name" error={formErrors.fullName}>
						<InputField
							name="fullName"
							type="text"
							value={formData.fullName}
							onChange={onChange}
							error={formErrors.fullName}
							required
						/>
					</FormItem>

					{formErrors.global && (
						<div className="text-red-500 text-sm mb-4 text-center">
							{formErrors.global}
						</div>
					)}

					<Button type="submit" disabled={loading} className="w-full">
						{loading ? "Registering..." : "Register"}
					</Button>

					<div className="text-center mt-4 text-sm text-gray-400">
						Already have an account?{" "}
						<button
							type="button"
							onClick={() => router.push("/login")}
							className="text-blue-500 hover:underline cursor-pointer"
						>
							Log In
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
}
