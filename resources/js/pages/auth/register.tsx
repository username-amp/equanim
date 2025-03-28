import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { KeyRound, LoaderCircle, Lock, Mail, User } from 'lucide-react';
import { FormEventHandler } from 'react';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

interface RegisterProps {
    status?: string;
}

export default function Register({ status }: RegisterProps) {
    const { data, setData, post, processing, errors } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />
            <div className="flex min-h-screen">
                {/* Left Side - Form Section */}
                <div className="flex w-full items-center justify-center bg-white px-4 md:w-1/2">
                    <div className="w-full max-w-md space-y-8">
                        <div className="flex flex-col items-center gap-6 text-center">
                            <Link href={route('home')} className="group flex flex-col items-center gap-2 transition-transform hover:scale-105">
                                <div className="relative">
                                    <div className="absolute inset-0 animate-pulse rounded-full bg-violet-500/20 blur-xl" />
                                    <div className="relative rounded-full bg-gradient-to-br from-violet-500 to-purple-600 p-4">
                                        <AppLogoIcon className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                                    Create Account
                                </span>
                            </Link>
                            <p className="text-sm text-gray-500">Join our community of mindful individuals</p>
                        </div>

                        {status && (
                            <div className="rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-600 dark:bg-green-900/50 dark:text-green-400">
                                {status}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={submit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm leading-none text-gray-500">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Your Name"
                                            className="bg-white pl-10 text-gray-900 ring-1 ring-gray-200"
                                        />
                                        <User className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                                        <span className="absolute -top-2 right-3 text-red-500">*</span>
                                    </div>
                                    <InputError message={errors.name} />
                                </div>

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
                                    <Label htmlFor="password" className="text-sm leading-none text-gray-500">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Create a secure password"
                                            className="bg-white pl-10 text-gray-900 ring-1 ring-gray-200"
                                        />
                                        <KeyRound className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                                        <span className="absolute -top-2 right-3 text-red-500">*</span>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className="text-sm leading-none text-gray-500">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Confirm your password"
                                            className="bg-white pl-10 text-gray-900 ring-1 ring-gray-200"
                                        />
                                        <Lock className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                                        <span className="absolute -top-2 right-3 text-red-500">*</span>
                                    </div>
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white transition-all hover:from-violet-600 hover:to-purple-700"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Create Account
                            </Button>
                        </form>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <TextLink href={route('login')} className="text-violet-600 hover:text-violet-700">
                                Log in
                            </TextLink>
                        </p>
                    </div>
                </div>

                {/* Right Side - Image Section */}
                <div className="hidden md:block md:w-1/2">
                    <div className="relative h-full w-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/90 to-purple-600/90" />
                        <img
                            src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7"
                            alt="Meditation"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <blockquote className="space-y-4 rounded-2xl bg-black/10 p-8 backdrop-blur-sm">
                                <p className="text-2xl font-medium text-balance text-white">
                                    "The journey of a thousand miles begins with a single step."
                                </p>
                                <footer className="text-white/80">— Lao Tzu</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
