import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flower2, Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function BreathePage() {
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
    const [isActive, setIsActive] = useState(false);
    const countRef = useRef(0); // Use a ref to track count without triggering re-renders

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive) {
            timer = setInterval(() => {
                countRef.current++;
                if (phase === 'inhale' && countRef.current >= 4) {
                    setPhase('hold');
                    countRef.current = 0;
                } else if (phase === 'hold' && countRef.current >= 7) {
                    setPhase('exhale');
                    countRef.current = 0;
                } else if (phase === 'exhale' && countRef.current >= 8) {
                    setPhase('rest');
                    countRef.current = 0;
                } else if (phase === 'rest' && countRef.current >= 4) {
                    setPhase('inhale');
                    countRef.current = 0;
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isActive, phase]);

    const circleVariants = {
        inhale: {
            scale: 2,
            transition: { duration: 4, ease: 'easeInOut' },
        },
        hold: {
            scale: 2,
            transition: { duration: 7, ease: 'linear' },
        },
        exhale: {
            scale: 1,
            transition: { duration: 8, ease: 'easeInOut' },
        },
        rest: {
            scale: 1,
            transition: { duration: 4, ease: 'linear' },
        },
    };

    const textVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <AppLayout>
            <Head title="Breathing Exercise" />

            <div className="container space-y-8 px-4 py-8 md:px-6">
                {/* Welcome Section */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-400 via-fuchsia-500 to-violet-600 p-8 text-white shadow-lg shadow-purple-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/50">
                    <div className="relative z-10">
                        <div className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
                            <Flower2 className="mr-2 h-5 w-5 animate-pulse text-violet-200" />
                            <span className="text-sm font-medium">Breathe & Relax ✨</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">4-7-8 Breathing Technique</h1>
                        <p className="mt-2 max-w-md text-lg text-white/90">
                            A natural tranquilizer for the nervous system, helping reduce anxiety and improve sleep quality.
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 opacity-50 blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-violet-400 to-purple-400 opacity-50 blur-2xl animate-pulse" />
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Breathing Exercise */}
                    <Card className="group col-span-2 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-purple-500/5 hover:ring-2 hover:ring-purple-400/50 hover:ring-offset-4 dark:hover:bg-purple-500/10">
                        <CardContent className="p-6">
                            <div className="mb-6">
                                <h2 className="text-foreground flex items-center gap-2 text-xl font-semibold">
                                    <div className="rounded-lg bg-gradient-to-br from-purple-400/20 to-violet-600/20 p-1.5">
                                        <Flower2 className="h-5 w-5 text-purple-400 animate-pulse" />
                                    </div>
                                    Breathing Exercise
                                </h2>
                                <p className="text-muted-foreground text-sm">Follow the circle's movement to guide your breath</p>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <div className="relative mb-8 flex h-64 w-64 items-center justify-center">
                                    <motion.div
                                        className="absolute h-32 w-32 rounded-full border-4 border-purple-500 bg-gradient-to-br from-purple-400/20 to-violet-600/20 backdrop-blur-sm shadow-lg shadow-purple-500/30"
                                        variants={circleVariants}
                                        animate={phase}
                                    />
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={phase}
                                            className="absolute text-2xl font-semibold bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent"
                                            variants={textVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            transition={{ duration: 0.5 }}
                                        >
                                            {phase.charAt(0).toUpperCase() + phase.slice(1)}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        onClick={() => setIsActive(!isActive)}
                                        className="bg-gradient-to-r from-purple-400 to-violet-600 px-6 py-2 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                                    >
                                        {isActive ? 'Pause' : 'Start'}
                                    </Button>
                                    {isActive && (
                                        <Button
                                            onClick={() => {
                                                setIsActive(false);
                                                setPhase('inhale');
                                                countRef.current = 0;
                                            }}
                                            variant="outline"
                                            className="border-purple-400 px-6 py-2 text-purple-400 transition-all hover:scale-105 hover:bg-purple-50 hover:shadow-lg hover:shadow-purple-500/30"
                                        >
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Instructions */}
                    <Card className="group overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-purple-500/5 hover:ring-2 hover:ring-purple-400/50 hover:ring-offset-4 dark:hover:bg-purple-500/10">
                        <CardContent className="p-6">
                            <div className="mb-6">
                                <h2 className="text-foreground flex items-center gap-2 text-xl font-semibold">
                                    <div className="rounded-lg bg-gradient-to-br from-purple-400/20 to-violet-600/20 p-1.5">
                                        <Info className="h-5 w-5 text-purple-400 animate-pulse" />
                                    </div>
                                    Instructions
                                </h2>
                                <p className="text-muted-foreground text-sm">How to perform the exercise</p>
                            </div>

                            <ul className="text-muted-foreground list-inside list-disc space-y-4">
                                <li>
                                    <span className="font-medium bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent">Inhale (4s):</span>
                                    <br />
                                    Breathe in quietly through the nose
                                </li>
                                <li>
                                    <span className="font-medium bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent">Hold (7s):</span>
                                    <br />
                                    Hold your breath
                                </li>
                                <li>
                                    <span className="font-medium bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent">Exhale (8s):</span>
                                    <br />
                                    Exhale forcefully through the mouth
                                </li>
                                <li>
                                    <span className="font-medium bg-gradient-to-br from-purple-400 to-violet-600 bg-clip-text text-transparent">Rest (4s):</span>
                                    <br />
                                    Pause before the next cycle
                                </li>
                            </ul>

                            <div className="mt-6 rounded-lg bg-gradient-to-br from-purple-400/10 to-violet-600/10 p-4 backdrop-blur-sm">
                                <p className="text-sm text-purple-700 dark:text-purple-300">
                                    This technique is particularly helpful for managing anxiety, reducing stress, and improving sleep quality.
                                    Practice it at least twice a day for best results.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
