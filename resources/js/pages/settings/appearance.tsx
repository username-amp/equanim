import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import { type BreadcrumbItem } from '@/types';

import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Monitor, Moon, Palette, Sun } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-8">
                    {/* Header Section */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-400 via-fuchsia-500 to-violet-600 p-8 text-white shadow-lg shadow-purple-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/50">
                        <div className="relative z-10">
                            <div className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
                                <Palette className="mr-2 h-5 w-5 animate-pulse text-violet-200" />
                                <span className="text-sm font-medium">Personalize Your Experience ✨</span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">Appearance Settings</h1>
                            <p className="mt-2 max-w-md text-lg text-white/90">
                                Customize the look and feel of your meditation space to match your preferences.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 opacity-50 blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-violet-400 to-purple-400 opacity-50 blur-2xl animate-pulse" />
                    </div>

                    {/* Theme Options */}
                    <Card className="group overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-purple-500/5 hover:ring-2 hover:ring-purple-400/50 hover:ring-offset-4 dark:hover:bg-purple-500/10">
                        <CardContent className="p-6">
                            <div className="grid gap-8">
                                <div className="flex flex-col space-y-2">
                                    <h2 className="text-xl font-semibold bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent">Theme Preferences</h2>
                                    <p className="text-muted-foreground text-sm">Choose how Equanim appears to you</p>
                                </div>
                                <div className="grid gap-6">
                                    <AppearanceTabs />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Theme Selection */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Card className="group cursor-pointer overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-purple-500/5 hover:ring-2 hover:ring-purple-400/50 hover:ring-offset-4 dark:hover:bg-purple-500/10">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-gradient-to-br from-purple-400/80 to-violet-600/80 p-2.5 text-white shadow-lg ring-1 ring-white/50 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/30">
                                        <Sun className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent">Light Mode</h3>
                                        <p className="text-muted-foreground text-sm">Perfect for daytime meditation</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group cursor-pointer overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-purple-500/5 hover:ring-2 hover:ring-purple-400/50 hover:ring-offset-4 dark:hover:bg-purple-500/10">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-gradient-to-br from-purple-400/80 to-violet-600/80 p-2.5 text-white shadow-lg ring-1 ring-white/50 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/30">
                                        <Moon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent">Dark Mode</h3>
                                        <p className="text-muted-foreground text-sm">Easier on the eyes at night</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group cursor-pointer overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-purple-500/5 hover:ring-2 hover:ring-purple-400/50 hover:ring-offset-4 dark:hover:bg-purple-500/10">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 p-2.5 text-white shadow-lg ring-1 ring-white/50 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/30">
                                        <Monitor className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">System</h3>
                                        <p className="text-muted-foreground text-sm">Match your system theme</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
