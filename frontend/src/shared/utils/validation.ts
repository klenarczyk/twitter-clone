export function isNotBlank(str: string): boolean {
	return str.trim().length > 0;
}

export function validateEmail(email: string): { isValid: boolean; error: string } {
	const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

	if (!regex.test(email)) {
		return {
			isValid: false,
			error: "Please enter a valid email address",
		};
	}

	return { isValid: true, error: "" };
}

export function validatePassword(password: string): { isValid: boolean; error: string } {
	const checks = [
		{ regex: /[a-z]/, message: "Password must contain at least one lowercase letter" },
		{ regex: /[A-Z]/, message: "Password must contain at least one uppercase letter" },
		{ regex: /\d/, message: "Password must contain at least one digit" },
		{
			regex: /[!@#$%^&*(),.?":{}|<>]/,
			message: "Password must contain at least one special character",
		},
		{ regex: /.{8,}/, message: "Password must be at least 8 characters long" },
	];

	for (const check of checks) {
		if (!check.regex.test(password)) {
			return { isValid: false, error: check.message };
		}
	}

	return { isValid: true, error: "" };
}

export function validateHandle(handle: string): { isValid: boolean; error: string } {
	const regex = /^[a-zA-Z0-9._]+$/;

	if (!isNotBlank(handle)) {
		return {
			isValid: false,
			error: "Handle cannot be blank",
		};
	}

	if (!regex.test(handle)) {
		return {
			isValid: false,
			error: "Handle can only contain letters, numbers, '.', and '_'",
		};
	}

	return { isValid: true, error: "" };
}

export function validateFullName(fullName: string): { isValid: boolean; error: string } {
	if (!isNotBlank(fullName)) {
		return {
			isValid: false,
			error: "Full Name cannot be blank",
		};
	}

	return { isValid: true, error: "" };
}
