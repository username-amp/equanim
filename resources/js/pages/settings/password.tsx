import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { CheckCircle2, KeyRound, Shield } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password settings" />

            <SettingsLayout>
                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-400 via-fuchsia-500 to-violet-600 p-8 text-white shadow-lg shadow-purple-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/50">
                        <div className="relative z-10">
                            <div className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
                                <Shield className="mr-2 h-5 w-5 animate-pulse text-violet-200" />
                                <span className="text-sm font-medium">Security First ✨</span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">Update Password</h1>
                            <p className="mt-2 max-w-md text-lg text-white/90">Keep your account secure with a strong, unique password.</p>
                        </div>
                        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 opacity-50 blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-violet-400 to-purple-400 opacity-50 blur-2xl animate-pulse" />
                    </div>

                    {/* Password Form */}
                    <Card className="overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-purple-500/5 hover:ring-2 hover:ring-purple-400/50 hover:ring-offset-4 dark:hover:bg-purple-500/10">
                        <CardContent className="p-6">
                            <form onSubmit={updatePassword} className="space-y-6">
                                <div className="grid gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent" htmlFor="current_password">
                                            Current Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="current_password"
                                                ref={currentPasswordInput}
                                                value={data.current_password}
                                                onChange={(e) => setData('current_password', e.target.value)}
                                                type="password"
                                                className="pl-10 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2"
                                                autoComplete="current-password"
                                                placeholder="Enter your current password"
                                            />
                                            <KeyRound className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5 group-focus-within:text-purple-500" />
                                        </div>
                                        <InputError message={errors.current_password} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent" htmlFor="password">
                                            New Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                ref={passwordInput}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                type="password"
                                                className="pl-10 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2"
                                                autoComplete="new-password"
                                                placeholder="Enter your new password"
                                            />
                                            <KeyRound className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5 group-focus-within:text-purple-500" />
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent" htmlFor="password_confirmation">
                                            Confirm Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                type="password"
                                                className="pl-10 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2"
                                                autoComplete="new-password"
                                                placeholder="Confirm your new password"
                                            />
                                            <KeyRound className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5 group-focus-within:text-purple-500" />
                                        </div>
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        className="bg-gradient-to-br from-purple-400 to-violet-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-500"
                                    >
                                        Save Changes
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <CheckCircle2 className="h-4 w-4 text-purple-500" />
                                            Password updated
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
