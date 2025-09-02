"use client";

import {ChangeEvent, FormEvent, useState} from "react";
import Form from "@/shared/components/form/Form";
import FormItem from "@/shared/components/form/FormItem";
import InputField from "@/shared/components/form/InputField";
import Button from "@/shared/components/Button";
import {validateEmail} from "@/shared/utils/validation";
import {useRouter} from "next/navigation";
import {useAuth} from "@/features/auth/hooks/useAuth";
import {Eye, EyeOff} from "lucide-react";
import {fetchCurrentUser, fetchLogin} from "@/features/auth/api/authApi";
import {ApiError} from "@/lib/api/httpTypes";
import {useToast} from "@/shared/toast/useToast";

export default function LoginPage() {
    const {login} = useAuth();
    const router = useRouter();
    const {addToast} = useToast();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        global: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({email: '', password: '', global: ''});

        let valid = true;
        const newErrors = {email: '', password: '', global: ''};

        const email = validateEmail(formData.email);
        if (!email.isValid) {
            newErrors.email = email.error;
            valid = false;
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Please enter your password';
            valid = false;
        }

        if (!valid) {
            setFormErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            await fetchLogin({
                email: formData.email.trim(),
                password: formData.password.trim(),
            });

            const user = await fetchCurrentUser();
            login(user);
            router.push('/');
        } catch (err: unknown) {
            const newErrors = {email: '', password: '', global: ''};

            if (err instanceof ApiError) {
                switch (err.status) {
                    case 401:
                        newErrors.global = "Invalid email or password";
                        break;
                    case 500:
                        addToast({
                            text: "Server error. Please try again later.",
                            type: "error"
                        });
                        break;
                    default:
                        addToast({
                            text: newErrors.global = err.message || "Login failed",
                            type: "error"
                        });
                }
            } else {
                addToast({
                    text: "An unexpected error occurred. Please try again.",
                    type: "error"
                });
            }

            setFormErrors(newErrors);
        } finally {
            setLoading(false);
        }

    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setFormData(prev => ({...prev, [name]: value}));
        setFormErrors(prev => ({...prev, [name]: '', global: ''}));
    };

    return (
        <div className="flex flex-col gap-16 min-h-screen items-center justify-center bg-mono-950">
            <Form onSubmit={handleLogin} noValidate>
                <h1 className="text-4xl font-bold text-mono-50">Login</h1>

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
                        type={`${showPassword ? 'text' : 'password'}`}
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
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5"/>
                                ) : (
                                    <Eye className="h-5 w-5"/>
                                )}
                            </button>
                        }
                    />
                </FormItem>
                {formErrors.global && (
                    <div className="text-red-500 text-sm mb-4">{formErrors.global}</div>
                )}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </Form>
        </div>
    );
}
