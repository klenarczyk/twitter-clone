"use client";

import {ChangeEvent, FormEvent, useState} from "react";
import Form from "@/features/ui/form/Form";
import FormItem from "@/features/ui/form/FormItem";
import InputField from "@/features/ui/form/InputField";
import Button from "@/features/ui/Button";
import {validateEmail} from "@/lib/utils/validation";
import {useRouter} from "next/navigation";
import {useAuth} from "@/features/auth/hooks/useAuth";
import {Eye, EyeOff} from "lucide-react";

export default function LoginPage() {
    const {login} = useAuth();
    const router = useRouter();

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
            const res = await fetch((process.env.NEXT_PUBLIC_API_URL ?? '') + "/auth/login", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    email: formData.email.trim(), password: formData.password.trim()
                }),
            });

            if (res.ok) {
                const userRes = await fetch((process.env.NEXT_PUBLIC_API_URL ?? '') + "/auth/me", {
                    credentials: 'include'
                });

                if (userRes.ok) {
                    const {user} = await userRes.json();
                    login(user);
                    router.push('/');
                } else {
                    newErrors.global = "Failed to fetch user after login";
                    setFormErrors(newErrors);
                }
            } else {
                const data = await res.json();
                if (data.field === "credentials") {
                    newErrors.email = "Invalid email or password";
                }
                newErrors.global = data.message || 'Login failed';
                setFormErrors(newErrors);
            }
        } catch {
            setFormErrors(prev => ({...prev, global: "Network error"}));
        }

        setLoading(false);
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
                <Button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </Form>
        </div>
    );
}
