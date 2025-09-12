"use client";

import { Eye, EyeOff } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchLogin } from "@/features/auth/api/authApi";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ApiError } from "@/lib/api/httpTypes";
import Form from "@/shared/components/form/Form";
import FormItem from "@/shared/components/form/FormItem";
import InputField from "@/shared/components/form/InputField";
import Button from "@/shared/components/ui/Button";
import { useToast } from "@/shared/toast/useToast";
import { validateEmail } from "@/shared/utils/validation";
import Image from "next/image";

export default function LoginForm() {
	const { login } = useAuth();
	const router = useRouter();
	const { addToast } = useToast();

	const [formData, setFormData] = useState({ email: "", password: "" });
	const [formErrors, setFormErrors] = useState({ email: "", password: "", global: "" });
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setFormErrors({ email: "", password: "", global: "" });

		const newErrors = { email: "", password: "", global: "" };
		let valid = true;

		const email = validateEmail(formData.email);
		if (!email.isValid) {
			newErrors.email = email.error;
			valid = false;
		}
		if (!formData.password.trim()) {
			newErrors.password = "Please enter your password";
			valid = false;
		}

		if (!valid) {
			setFormErrors(newErrors);
			setLoading(false);
			return;
		}

		try {
			const user = await fetchLogin({
				email: formData.email.trim(),
				password: formData.password.trim(),
			});
			login(user);
			router.push("/");
		} catch (err: unknown) {
			const newErrors = { email: "", password: "", global: "" };
			if (err instanceof ApiError) {
				if (err.status === 401) newErrors.global = "Invalid email or password";
				else if (err.status === 500)
					addToast({ text: "Server error. Please try again later.", type: "error" });
				else
					addToast({
						text: (newErrors.global = err.message || "Login failed"),
						type: "error",
					});
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

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setFormErrors((prev) => ({ ...prev, [name]: "", global: "" }));
	};

	return (
		<Form onSubmit={handleLogin} noValidate>
			<div className="mb-8 flex justify-between items-center">
				<h1 className="text-3xl sm:text-4xl font-bold text-mono-50 text-center">Login</h1>
				<Image
					src="/images/logo.png"
					alt="Logo"
					width={50}
					height={50}
					priority
					className="invert"
				/>
			</div>

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
							className="text-mono-50 focus:outline-none"
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

			{formErrors.global && (
				<div className="text-red-500 text-sm mb-4 text-center">{formErrors.global}</div>
			)}

			<Button type="submit" disabled={loading} className="w-full">
				{loading ? "Logging in..." : "Login"}
			</Button>
		</Form>
	);
}
