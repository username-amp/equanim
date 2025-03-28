import AppLogo from '@/components/app-logo';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion, useInView, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Leaf, Sparkles, Star, Sun, Users, type LucideIcon } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Custom hook for scroll animations
function useScrollAnimation(threshold = 0.2) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold });

    return { ref, isInView };
}

// Floating animation for background elements
function FloatingElement({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, index }: { icon: LucideIcon; title: string; description: string; index: number }) {
    const { ref, isInView } = useScrollAnimation();

    const bgColor = index === 0 ? 'bg-violet-500/10' : index === 1 ? 'bg-purple-500/10' : 'bg-violet-600/10';
    const textColor = index === 0 ? 'text-violet-600' : index === 1 ? 'text-purple-600' : 'text-violet-700';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group relative rounded-2xl bg-white p-8 shadow-md transition-all hover:shadow-xl"
        >
            <div className="absolute -inset-4 z-0 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 opacity-0 blur transition-all group-hover:opacity-10"></div>
            <div className="relative z-10">
                <div className={`mb-6 inline-flex rounded-xl ${bgColor} p-3`}>
                    <Icon className={`h-6 w-6 ${textColor}`} />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </motion.div>
    );
}

// Testimonial Card Component
function TestimonialCard({ content, author, role, image, index }: { content: string; author: string; role: string; image: string; index: number }) {
    const { ref, isInView } = useScrollAnimation();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-md"
        >
            <div>
                <div className="flex gap-0.5 text-violet-500">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                </div>
                <p className="mt-4 text-lg text-gray-600 italic">{content}</p>
            </div>
            <div className="mt-8 flex items-center gap-4">
                <img
                    src={image}
                    alt={author}
                    onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${author}&background=6366f1&color=fff`;
                    }}
                    className="h-12 w-12 rounded-full object-cover bg-indigo-100"
                />
                <div>
                    <h4 className="font-semibold">{author}</h4>
                    <p className="text-sm text-gray-600">{role}</p>
                </div>
            </div>
        </motion.div>
    );
}

const teachers = [
    {
        name: "Ryl Mariel Buntag",
        role: "Psychiatrist",
        image: "/images/carousel/ryl.jpg"
    },
    {
        name: "Juliana Marie Albao",
        role: "Psychiatrist",
        image: "/images/carousel/juliana.jpg"
    },
    {
        name: "Charisse Giellan Aprigillo",
        role: "Psychiatrist",
        image: "/images/carousel/charisse.jpg"
    },
    {
        name: "Louisse Fetalver",
        role: "Psychiatrist",
        image: "/images/carousel/louisse.jpg"
    },
    {
        name: "Marielle L. Batoon",
        role: "Psychometrician",
        image: "/images/carousel/marielle.jpg"
    }
];

export default function LandingPage() {
    const { auth } = usePage<SharedData>().props;
    const { scrollYProgress } = useScroll();
    const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Progress indicator
    const progressScale = useTransform(scaleProgress, [0, 1], [0.8, 1]);
    const progressOpacity = useTransform(scaleProgress, [0, 0.1], [0, 1]);

    const features = [
        {
            icon: Star,
            title: 'Progress Insights',
            description: 'Track your mood, streaks, and personal growth with detailed analytics.',
        },
        {
            icon: Users,
            title: 'Community Support',
            description: 'Join live sessions and connect with mindful peers worldwide.',
        },
        {
            icon: Heart,
            title: 'Mindful Moments',
            description: 'Find calm and clarity with guided meditations and relaxing sounds.',
        },
    ];

    const testimonials = [
        {
            id: 1,
            name: "Charisse Giellan Aprigillo",
            role: "Psychiatrist",
            content: "Equanim has transformed my daily meditation practice. The interface is so intuitive and the guided sessions are perfect for both beginners and advanced practitioners.",
            avatar: "/images/testimonials/avatar1.jpg",
            fallbackAvatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff"
        },
        {
            id: 2,
            name: "Juliana Marie Albao",
            role: "Psychiatrist",
            content: "As someone with a busy schedule, Equanim helps me stay grounded. The short meditation sessions are perfect for quick breaks during work.",
            avatar: "/images/testimonials/avatar2.jpg",
            fallbackAvatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=6366f1&color=fff"
        },
        {
            id: 3,
            name: "Ryl Mariel Buntag",
            role: "Psychiatrist",
            content: "The variety of meditation styles and the progress tracking feature have helped me maintain a consistent practice. It's been life-changing!",
            avatar: "/images/testimonials/avatar3.jpg",
            fallbackAvatar: "https://ui-avatars.com/api/?name=Emma+Thompson&background=6366f1&color=fff"
        },
        {
            id: 4,
            name: "Marielle",
            role: "Business Executive",
            content: "I was skeptical at first, but Equanim's guided meditations have significantly reduced my stress levels and improved my focus at work.",
            avatar: "/images/testimonials/avatar4.jpg",
            fallbackAvatar: "https://ui-avatars.com/api/?name=David+Rodriguez&background=6366f1&color=fff"
        },
        {
            id: 5,
            name: "Louisse Fetalver",
            role: "Psychiatrist",
            content: "The app's calming interface and customizable sessions have made meditation an enjoyable part of my daily routine. Highly recommend!",
            avatar: "/images/testimonials/avatar5.jpg",
            fallbackAvatar: "https://ui-avatars.com/api/?name=Lisa+Park&background=6366f1&color=fff"
        }
    ];

    const [currentTestimonials, setCurrentTestimonials] = useState([0, 1]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonials(prev => {
                const next = [(prev[0] + 2) % testimonials.length, (prev[1] + 2) % testimonials.length];
                return next;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Progress Indicator */}
            <motion.div
                className="fixed right-8 bottom-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg"
                style={{ scale: progressScale, opacity: progressOpacity }}
            >
                <motion.div className="h-12 w-12 rounded-full bg-white" style={{ scale: scaleProgress }} />
            </motion.div>

            <div className="flex min-h-screen flex-col bg-gradient-to-b from-indigo-50 to-white">
                {/* Header Section */}
                <motion.header
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg"
                >
                    <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2">
                                <AppLogo />
                                <Link
                                    href={route('home')}
                                    className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent"
                                >
                                    Equanim
                                </Link>
                            </div>
                            <div className="ml-8 hidden space-x-6 md:flex">
                                <Link href="#features" className="text-gray-600 transition hover:text-violet-600">
                                    Features
                                </Link>
                                <Link href="#about" className="text-gray-600 transition hover:text-violet-600">
                                    About
                                </Link>
                                <Link href="#testimonials" className="text-gray-600 transition hover:text-violet-600">
                                    Testimonials
                                </Link>
                                <Link href="#contact" className="text-gray-600 transition hover:text-violet-600">
                                    Contact
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-2 text-sm text-white transition-all hover:shadow-lg hover:shadow-violet-500/25"
                                >
                                    Dashboard
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-gray-600 transition hover:text-violet-600">
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-2 text-sm text-white transition-all hover:shadow-lg hover:shadow-violet-500/25"
                                    >
                                        Get Started
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </motion.header>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 sm:py-32">
                    <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
                        <FloatingElement delay={0}>
                            <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-indigo-500/20 blur-xl" />
                        </FloatingElement>
                        <FloatingElement delay={1}>
                            <div className="absolute top-3/4 right-1/4 h-24 w-24 rounded-full bg-purple-500/20 blur-xl" />
                        </FloatingElement>
                    </div>
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="max-w-2xl text-center lg:text-left"
                            >
                                <div className="mb-6 inline-flex rounded-full bg-violet-500/10 px-4 py-2">
                                    <div className="flex items-center gap-2 text-sm font-medium text-violet-600">
                                        <Sparkles className="h-4 w-4" />
                                        <span>Your journey to mindfulness begins here</span>
                                    </div>
                                </div>
                                <h1 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
                                    Find Peace in a <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text">Chaotic World</span>
                                </h1>
                                <p className="mb-8 text-xl leading-relaxed text-gray-600">
                                    Discover tranquility through guided meditations, mindful exercises, and soothing sounds. Your daily companion for
                                    mental wellness and inner peace.
                                </p>
                                <div className="flex flex-col items-center gap-4 sm:flex-row">
                                    {!auth.user && (
                                        <>
                                            <Link
                                                href={route('register')}
                                                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-3 text-white transition-all hover:shadow-lg hover:shadow-violet-500/25 sm:w-auto"
                                            >
                                                Start Free Trial
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="group flex w-full items-center justify-center gap-2 rounded-full border-2 border-gray-300 px-8 py-3 transition-colors text-gray-600 hover:border-indigo-500 hover:text-indigo-600 sm:w-auto"
                                            >
                                                Watch Demo
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </Link>
                                        </>
                                    )}
                                    {auth.user && (
                                        <Link
                                            href={route('dashboard')}
                                            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-3 text-white transition-all hover:shadow-lg hover:shadow-violet-500/25 sm:w-auto"
                                        >
                                            Go to Dashboard
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="w-full max-w-lg lg:w-1/2"
                            >
                                <div className="relative">
                                    <div className="absolute -inset-4">
                                        <div className="h-full w-full rotate-6 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-30 blur-xl"></div>
                                    </div>
                                    <img
                                        src="https://www.popsci.com/wp-content/uploads/2020/12/29/IQ5IWHE4XFBEDAJNTTGWPWMDVA.jpg?quality=85&w=1748"
                                        alt="Meditation app interface"
                                        className="relative rounded-2xl shadow-xl transition duration-500 hover:scale-[1.01]"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
                            <p className="text-lg text-gray-600">Join thousands of satisfied meditators on their journey to mindfulness</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {currentTestimonials.map((index) => (
                                <motion.div
                                    key={testimonials[index].id}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ 
                                        duration: 0.5,
                                        ease: "easeOut"
                                    }}
                                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <motion.img
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            src={testimonials[index].avatar}
                                            alt={testimonials[index].name}
                                            onError={(e) => {
                                                e.currentTarget.src = testimonials[index].fallbackAvatar;
                                            }}
                                            className="w-12 h-12 rounded-full object-cover bg-indigo-100"
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <h3 className="font-semibold text-gray-900">{testimonials[index].name}</h3>
                                            <p className="text-sm text-gray-600">{testimonials[index].role}</p>
                                        </motion.div>
                                    </div>
                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-gray-700 italic"
                                    >
                                        {testimonials[index].content}
                                    </motion.p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Teachers Carousel */}
                <section className="relative overflow-hidden bg-gradient-to-b from-white to-purple-50 py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 text-center">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                        >
                            Learn from Expert Teachers
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 text-lg text-gray-600"
                        >
                            Join sessions with our experienced meditation and mindfulness instructors
                        </motion.p>
                    </div>
                    
                    <div className="relative w-full overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
                        
                        <div className="teacher-track flex">
                            {[...teachers, ...teachers, ...teachers, ...teachers].map((teacher, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="teacher-slide flex-none w-[280px] px-4"
                                >
                                    <div className="relative group rounded-xl overflow-hidden shadow-lg">
                                        <div className="aspect-[3/4] overflow-hidden bg-purple-100">
                                            <img
                                                src={teacher.image}
                                                alt={teacher.name}
                                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/95 via-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                            <h3 className="text-xl font-semibold text-white mb-1">{teacher.name}</h3>
                                            <p className="text-purple-200 text-sm">{teacher.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <style>{`
                    .teacher-track {
                        animation: slide 40s linear infinite;
                        width: calc(280px * 20); /* 5 teachers * 4 copies */
                    }

                    @keyframes slide {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(calc(-280px * 10)); /* Move back by half of total width */
                        }
                    }

                    .teacher-slide {
                        min-width: 280px;
                    }

                    @media (max-width: 640px) {
                        .teacher-track {
                            animation-duration: 30s;
                        }
                    }
                `}</style>

                {/* Features Section */}
                <section id="features" className="py-20 sm:py-32 bg-gradient-to-b from-purple-50 to-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Transform Your Life
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Discover powerful tools and practices to enhance your mental well-being.
                            </p>
                        </motion.div>

                        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative p-6 bg-white rounded-2xl shadow-xl"
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="inline-flex p-3 rounded-xl bg-purple-600 text-white shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">Progress Insights</h3>
                                <p className="mt-2 text-gray-600 text-center">Track your mood, streaks, and personal growth with detailed analytics.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative p-6 bg-white rounded-2xl shadow-xl"
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="inline-flex p-3 rounded-xl bg-purple-600 text-white shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">Community Support</h3>
                                <p className="mt-2 text-gray-600 text-center">Join live sessions and connect with mindful peers worldwide.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative p-6 bg-white rounded-2xl shadow-xl"
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="inline-flex p-3 rounded-xl bg-purple-600 text-white shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">Mindful Moments</h3>
                                <p className="mt-2 text-gray-600 text-center">Find calm and clarity with guided meditations and relaxing sounds.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative p-6 bg-white rounded-2xl shadow-xl"
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="inline-flex p-3 rounded-xl bg-purple-600 text-white shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">Transform Your Life</h3>
                                <p className="mt-2 text-gray-600 text-center">Discover powerful tools and practices to enhance your mental well-being.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="relative overflow-hidden bg-white py-20 sm:py-32">
                    <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center gap-16 lg:flex-row">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="w-full max-w-lg lg:w-1/2"
                            >
                                <div className="relative">
                                    <div className="absolute -inset-4">
                                        <div className="h-full w-full -rotate-6 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-30 blur-xl"></div>
                                    </div>
                                    <img
                                        src="https://media.post.rvohealth.io/wp-content/uploads/sites/4/2022/03/264356-Meditation-for-Beginners_-A-Guide-1296x728-header-1024x576.jpg"
                                        alt="App interface"
                                        className="relative rounded-2xl shadow-xl transition duration-500 hover:scale-[1.01]"
                                    />
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="w-full lg:w-1/2"
                            >
                                <h2 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                                    Your Pocket Sanctuary
                                </h2>
                                <p className="mb-8 text-lg text-gray-600">
                                    Equanim combines ancient wisdom with modern technology to help you find peace in your daily life.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <div className="rounded-full bg-indigo-500/10 p-1">
                                            <Leaf className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <span className="text-gray-600">Reduce stress and anxiety naturally</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="rounded-full bg-purple-500/10 p-1">
                                            <Sun className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <span className="text-gray-600">Improve focus and productivity</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="rounded-full bg-rose-500/10 p-1">
                                            <Heart className="h-5 w-5 text-rose-600" />
                                        </div>
                                        <span className="text-gray-600">Develop lasting mindfulness habits</span>
                                    </li>
                                </ul>
                                <div className="mt-8">
                                    <Link
                                        href={route('register')}
                                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-3 text-white transition-all hover:shadow-lg hover:shadow-violet-500/25"
                                    >
                                        Start Your Journey
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    id="contact"
                    className="bg-gradient-to-b from-violet-50 to-purple-100 dark:from-gray-900 dark:to-gray-800"
                >
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-xl bg-white/10 p-2">
                                        <AppLogo />
                                    </div>
                                    <h3 className="text-lg font-semibold">Equanim</h3>
                                </div>
                                <p className="mt-4 text-gray-400">Making mindfulness accessible to everyone</p>
                            </div>
                            <div>
                                <h4 className="mb-4 font-semibold">Resources</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <Link href="#features" className="transition hover:text-purple-500">
                                            Features
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#testimonials" className="transition hover:text-purple-500">
                                            Success Stories
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#about" className="transition hover:text-purple-500">
                                            About
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-4 font-semibold">Support</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <Link href="#" className="transition hover:text-purple-500">
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="transition hover:text-purple-500">
                                            FAQ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="transition hover:text-purple-500">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-4 font-semibold">Connect</h4>
                                <div className="flex space-x-4">
                                    <Link
                                        href="#"
                                        className="rounded-full bg-white/10 p-2 text-gray-400 transition-colors hover:bg-white/20 hover:text-purple-500"
                                    >
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="rounded-full bg-white/10 p-2 text-gray-400 transition-colors hover:bg-white/20 hover:text-purple-500"
                                    >
                                        <span className="sr-only">Instagram</span>
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.227-1.664 4.771-4.919 4.919-1.266-.058 1.644-.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.267.058 1.645.07 4.849.07zm0-2.163c-3.204 0-3.584-.012-4.849-.07-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.849 0-3.205.012-3.584.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07zm0 11.664c-3.204 0-3.584-.012-4.849-.07-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.849 0-3.205.012-3.584.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} Equanim. All rights reserved.
                        </div>
                    </div>
                </motion.footer>
            </div>
        </>
    );
}

<style>{`
    @keyframes carousel {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(calc(-100% / 4));
        }
    }
    .animate-carousel {
        animation: carousel 30s linear infinite;
        will-change: transform;
    }
    @media (max-width: 640px) {
        .animate-carousel {
            animation-duration: 25s;
        }
    }
`}</style>
