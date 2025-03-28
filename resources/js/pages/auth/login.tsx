import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { KeyRound, LoaderCircle, Mail } from 'lucide-react';
import { FormEventHandler } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />
            <div className="flex min-h-screen">
                {/* Left Side - Form Section */}
                <div className="flex w-full items-center justify-center bg-white px-4 md:w-1/2">
                    <div className="w-full max-w-md space-y-8">
                        <div className="flex flex-col items-center gap-6 text-center">
                            <h1 className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                                Welcome Back
                            </h1>
                            <p className="text-gray-500">Sign in to continue your journey</p>
                        </div>

                        {status && <div className="rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-600">{status}</div>}

                        <form className="space-y-6" onSubmit={submit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm leading-none text-gray-500">
                                        Email address
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="email@example.com"
                                            className="bg-white pl-10 text-gray-900 ring-1 ring-gray-200"
                                        />
                                        <Mail className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                                        <span className="absolute -top-2 right-3 text-red-500">*</span>
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm leading-none text-gray-500">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink href={route('password.request')} className="text-sm text-gray-500 hover:text-violet-600">
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Enter your password"
                                            className="bg-white pl-10 text-gray-900 ring-1 ring-gray-200"
                                        />
                                        <KeyRound className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                                        <span className="absolute -top-2 right-3 text-red-500">*</span>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" checked={data.remember} onCheckedChange={(checked) => setData('remember', !!checked)} />
                                    <Label htmlFor="remember" className="text-sm text-gray-500">
                                        Remember me
                                    </Label>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white transition-all hover:from-violet-600 hover:to-purple-700"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Log in
                            </Button>
                        </form>

                        <p className="text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <TextLink href={route('register')} className="text-violet-600 hover:text-violet-700">
                                Sign up
                            </TextLink>
                        </p>
                    </div>
                </div>

                {/* Right Side - Image Section */}
                <div className="hidden md:block md:w-1/2">
                    <div className="relative h-full w-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/90 to-purple-600/90" />
                        <img
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
                            alt="Meditation"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <blockquote className="space-y-4 rounded-2xl bg-black/10 p-8 backdrop-blur-sm">
                                <p className="text-2xl font-medium text-balance text-white">
                                    "Meditation is not about stopping thoughts, but recognizing that we are more than our thoughts and our feelings."
                                </p>
                                <footer className="text-white/80">— Thich Nhat Hanh</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
