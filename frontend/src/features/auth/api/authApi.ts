import {apiClient} from "@/shared/api/apiClient";
import {LoginRequest, RegisterRequest, User} from "@/features/auth/types/auth";

export const fetchLogin = async (body: LoginRequest) => apiClient<void>(
    "/auth/login",
    "POST",
    body
);


export const fetchRegister = async (body: RegisterRequest) => apiClient<void>(
    "/auth/register",
    "POST",
    body
);

export const fetchCurrentUser = async () => apiClient<User>(
    "/users/me"
)