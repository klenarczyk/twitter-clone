import { LoginRequest, RegisterRequest, User } from "@/features/auth/types/auth";
import { apiClient } from "@/lib/api/apiClient";

export const fetchLogin = async (body: LoginRequest) =>
	apiClient<User>("/auth/login", "POST", body);

export const fetchRegister = async (body: RegisterRequest) =>
	apiClient<void>("/auth/register", "POST", body);

export const fetchCurrentUser = async () => apiClient<User>("/users/me");
