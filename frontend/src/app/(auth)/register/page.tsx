'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import FormItem from "@/features/ui/form/FormItem";
import InputField from "@/features/ui/form/InputField";
import Button from "@/features/ui/Button";
import Form from "@/features/ui/form/Form";
import {validateEmail, validateFullName, validateHandle, validatePassword} from "@/utils/validation";
import {EyeOffIcon} from "@/features/ui/icons/EyeOffIcon";
import {EyeIcon} from "@/features/ui/icons/EyeIcon";

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        handle: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
    });

    const [formErrors, setFormErrors] = useState({
        handle: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        submit: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setFormErrors({
            handle: '',
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            submit: '',
        });

        let valid = true;
        const newErrors = {
            handle: '',
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            submit: '',
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
            const res = await fetch((process.env.NEXT_PUBLIC_API_URL ?? '') + "/auth/register", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    handle: formData.handle,
                    email: formData.email,
                    password: formData.password,
                    fullName: formData.fullName,
                }),
            });

            if (res.ok) {
                router.push('/login');
            } else {
                const data = await res.json();
                if (data.field === "email") {
                    newErrors.email = "A user with this email already exists";
                }
                if (data.field === "handle") {
                    newErrors.handle = "This handle is already taken";
                }
                newErrors.submit = data.message || 'Signup failed';
                setFormErrors(newErrors);
            }
        } catch {
            setFormErrors(prev => ({...prev, submit: 'Network error'}));
        }

        setLoading(false);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setFormData(prev => ({...prev, [name]: value}));
        setFormErrors(prev => ({...prev, [name]: '', submit: ''}));
    };

    return (
        <div className="flex flex-col gap-16 min-h-screen items-center justify-center background-dark">
            <Form onSubmit={handleRegister} noValidate>
                <h1 className="text-4xl font-bold text-mono-50">Register</h1>

                <FormItem label="Handle" error={formErrors.handle}>
                    <InputField
                        name={'handle'}
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
                        name={'email'}
                        type="email"
                        value={formData.email}
                        onChange={onChange}
                        error={formErrors.email}
                        required
                    />
                </FormItem>
                <FormItem label="Password" error={formErrors.password}>
                    <InputField
                        name={'password'}
                        type={showPassword ? 'text' : 'password'}
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
                                    <EyeOffIcon className="h-5 w-5"/>
                                ) : (
                                    <EyeIcon className="h-5 w-5"/>
                                )}
                            </button>
                        }
                    />
                </FormItem>
                <FormItem label="Confirm Password" error={formErrors.confirmPassword}>
                    <InputField
                        name={'confirmPassword'}
                        type={showConfirmPassword ? 'text' : 'password'}
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
                            >
                                {showConfirmPassword ? (
                                    <EyeOffIcon className="h-5 w-5"/>
                                ) : (
                                    <EyeIcon className="h-5 w-5"/>
                                )}
                            </button>
                        }
                    />
                </FormItem>
                <FormItem label="Full Name" error={formErrors.fullName}>
                    <InputField
                        name={'fullName'}
                        type="text"
                        value={formData.fullName}
                        onChange={onChange}
                        error={formErrors.fullName}
                        required
                    />
                </FormItem>
                <Button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</Button>
            </Form>
        </div>
    );
}
