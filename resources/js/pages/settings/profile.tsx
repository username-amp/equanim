import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Mail, User } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

interface ProfileForm {
    name: string;
    email: string;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-400 via-fuchsia-500 to-violet-600 p-8 text-white shadow-lg shadow-purple-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/50">
                        <div className="relative z-10">
                            <div className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
                                <User className="mr-2 h-5 w-5 animate-pulse text-violet-200" />
                                <span className="text-sm font-medium">Your Profile ✨</span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">Profile Settings</h1>
                            <p className="mt-2 max-w-md text-lg text-white/90">Manage your account information and email preferences.</p>
                        </div>
                        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 opacity-50 blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-violet-400 to-purple-400 opacity-50 blur-2xl animate-pulse" />
                    </div>

                    {/* Profile Form */}
                    <Card className="overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-purple-500/5 hover:ring-2 hover:ring-purple-400/50 hover:ring-offset-4 dark:hover:bg-purple-500/10">
                        <CardContent className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent" htmlFor="name">
                                            Full Name
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="pl-10 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2"
                                                required
                                                autoComplete="name"
                                                placeholder="Enter your full name"
                                            />
                                            <User className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5 group-focus-within:text-purple-500" />
                                        </div>
                                        <InputError className="mt-2" message={errors.name} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-base font-semibold bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent" htmlFor="email">
                                            Email Address
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="pl-10 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2"
                                                required
                                                autoComplete="username"
                                                placeholder="Enter your email address"
                                            />
                                            <Mail className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5 group-focus-within:text-purple-500" />
                                        </div>
                                        <InputError className="mt-2" message={errors.email} />
                                    </div>

                                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                                        <div className="text-sm mt-2 text-gray-800">
                                            <p className="text-sm mt-2 text-gray-800">
                                                Your email address is unverified.
                                                <Link
                                                    href={route('verification.send')}
                                                    method="post"
                                                    as="button"
                                                    className="underline text-purple-500 hover:text-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                >
                                                    Click here to re-send the verification email.
                                                </Link>
                                            </p>

                                            {status === 'verification-link-sent' && (
                                                <div className="mt-2 font-medium text-sm text-green-600">
                                                    A new verification link has been sent to your email address.
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="submit"
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
                                            Saved successfully
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Delete Account Section */}
                    <Card className="border-destructive/50 hover:ring-offset-background overflow-hidden transition-all hover:ring-2 hover:ring-red-500/30 hover:ring-offset-2">
                        <CardContent className="p-6">
                            <DeleteUser />
                        </CardContent>
                    </Card>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
