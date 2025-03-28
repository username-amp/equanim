import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface OnboardingForm {
    preferred_time: string;
    daily_goal_minutes: number;
    notifications_enabled: boolean;
    initial_mood: number;
    interests: string[];
    [key: string]: string | number | boolean | string[];
}

export default function Onboard() {
    const [step, setStep] = useState(1);
    const [bgImage, setBgImage] = useState('https://cdn.prod.website-files.com/62f12835ca91e9749643da9d/66841886a696ea14d0ef5ad4_why_you_should_remember.webp');
    const { data, setData, post, processing } = useForm<OnboardingForm>({
        preferred_time: 'morning',
        daily_goal_minutes: 10,
        notifications_enabled: true,
        initial_mood: 3,
        interests: [],
    });

    const handleSubmit = () => {
        post(route('onboarding.save'), {
            onSuccess: () => {
                window.location.href = route('dashboard');
            },
        });
    };

    const timePreferences = [
        { value: 'morning', label: 'Morning', icon: '🌅', description: 'Start your day mindfully' },
        { value: 'afternoon', label: 'Afternoon', icon: '☀️', description: 'Take a midday break' },
        { value: 'evening', label: 'Evening', icon: '🌙', description: 'Wind down before bed' },
    ];

    const goalOptions = [
        { value: 5, label: '5 minutes', description: 'Perfect for beginners', icon: '⏰' },
        { value: 10, label: '10 minutes', description: 'Most popular choice', icon: '⏰' },
        { value: 15, label: '15 minutes', description: 'For deeper practice', icon: '⏰' },
        { value: 20, label: '20 minutes', description: 'Advanced practitioners', icon: '⏰' },
    ];

    const interestOptions = [
        { value: 'stress_relief', label: 'Stress Relief', icon: '🍃' },
        { value: 'better_sleep', label: 'Better Sleep', icon: '😴' },
        { value: 'focus', label: 'Focus & Productivity', icon: '🎯' },
        { value: 'anxiety', label: 'Anxiety Management', icon: '🧘' },
        { value: 'happiness', label: 'Happiness', icon: '😊' },
        { value: 'self_growth', label: 'Personal Growth', icon: '🌱' },
    ];

    return (
        <>
            <Head title="Welcome to Equanim" />
            <div className="relative min-h-screen overflow-hidden bg-[#2D1B69]">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-3xl"></div>
                    <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-600/30 blur-3xl"></div>
                    <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/20 blur-3xl"></div>
                </div>
                
                {/* Content */}
                <div className="relative mx-auto max-w-4xl px-4 py-12">
                    {/* Progress bar */}
                    <div className="mb-8">
                        <div className="h-2 w-full rounded-full bg-white/10 backdrop-blur-sm">
                            <div
                                className="h-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 shadow-lg shadow-purple-500/50 transition-all duration-300"
                                style={{ width: `${(step / 4) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Current Image */}
                    {bgImage && (
                        <div className="mb-8 flex justify-center">
                            <img 
                                src={bgImage} 
                                alt="Meditation" 
                                className="h-64 w-auto rounded-2xl object-cover shadow-lg shadow-purple-500/50 transition-all duration-500 backdrop-blur-sm bg-white/10"
                            />
                        </div>
                    )}

                    {/* Step 1: Welcome */}
                    {step === 1 && (
                        <div className="space-y-8 text-center">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold text-white">Welcome to Your Mindfulness Journey</h1>
                                <p className="text-lg text-white/90">Let's personalize your experience in a few simple steps</p>
                            </div>
                            <div className="mx-auto max-w-md">
                                <img src="https://www.mindful.org/content/uploads/how-to-meditate.jpg" alt="Welcome" className="w-full" />
                            </div>
                            <Button onClick={() => setStep(2)} className="bg-gradient-to-r from-amber-500 to-yellow-600 px-8 py-6 text-lg text-white">
                                Let's Begin
                            </Button>
                        </div>
                    )}

                    {/* Step 2: Time Preference */}
                    {step === 2 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-white">When do you prefer to meditate?</h2>
                                <p className="mt-2 text-white/90">Choose your ideal meditation time</p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-3">
                                {timePreferences.map((time) => (
                                    <button
                                        key={time.value}
                                        onClick={() => {
                                            setData('preferred_time', time.value);
                                        }}
                                        className={`group flex flex-col items-center gap-4 rounded-xl border-2 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
                                            data.preferred_time === time.value
                                                ? 'border-fuchsia-500 bg-white/10 shadow-lg shadow-purple-500/50'
                                                : 'border-white/20 bg-white/5 hover:bg-white/10'
                                        }`}
                                    >
                                        <div className="p-6">
                                            <span className="text-3xl">{time.icon}</span>
                                            <div className="text-center mt-4">
                                                <h3 className="font-semibold text-white">{time.label}</h3>
                                                <p className="text-sm text-white/75">{time.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <Button 
                                    onClick={() => setStep(1)} 
                                    variant="outline"
                                    className="bg-gray-500/10 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-500 border-white/20 text-white hover:text-white backdrop-blur-sm hover:bg-white/10"
                                >
                                    Back
                                </Button>
                                <Button 
                                    onClick={() => setStep(3)} 
                                    className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-500"
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Daily Goal */}
                    {step === 3 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-white">Set Your Daily Goal</h2>
                                <p className="mt-2 text-white/90">How long would you like to meditate each day?</p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                {goalOptions.map((goal) => (
                                    <button
                                        key={goal.value}
                                        onClick={() => {
                                            setData('daily_goal_minutes', goal.value);
                                        }}
                                        className={`group flex items-center gap-4 rounded-xl border-2 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
                                            data.daily_goal_minutes === goal.value
                                                ? 'border-fuchsia-500 bg-white/10 shadow-lg shadow-purple-500/50'
                                                : 'border-white/20 bg-white/5 hover:bg-white/10'
                                        }`}
                                    >
                                        <div className="p-6 w-full">
                                            <span className="text-3xl">{goal.icon}</span>
                                            <div className="text-left mt-4">
                                                <h3 className="font-semibold text-white">{goal.label}</h3>
                                                <p className="text-sm text-white/75">{goal.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <Button 
                                    onClick={() => setStep(2)} 
                                    variant="outline"
                                    className="bg-gray-500/10 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-500 border-white/20 text-white hover:text-white backdrop-blur-sm hover:bg-white/10"
                                >
                                    Back
                                </Button>
                                <Button 
                                    onClick={() => setStep(4)} 
                                    className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-500"
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Initial Mood & Interests */}
                    {step === 4 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-white">How are you feeling today?</h2>
                                <p className="mt-2 text-white/90">Let's track your mood and interests</p>
                            </div>

                            {/* Mood Rating */}
                            <div className="space-y-4">
                                <label className="block text-center text-lg font-medium text-white">Your Current Mood</label>
                                <div className="flex justify-center gap-4">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() => setData('initial_mood', rating)}
                                            className={`rounded-full bg-white/10 p-4 backdrop-blur-md transition-all duration-500 hover:scale-110 ${
                                                data.initial_mood === rating ? 'scale-110 ring-2 ring-fuchsia-500 ring-offset-2 ring-offset-transparent' : ''
                                            }`}
                                        >
                                            <span className="text-2xl">{
                                                rating === 1 ? '😢' :
                                                rating === 2 ? '😕' :
                                                rating === 3 ? '😐' :
                                                rating === 4 ? '😊' :
                                                '😄'
                                            }</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Interests */}
                            <div className="space-y-4">
                                <label className="block text-center text-lg font-medium text-white">What interests you?</label>
                                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    {interestOptions.map((interest) => (
                                        <button
                                            key={interest.value}
                                            onClick={() => {
                                                const newInterests = data.interests.includes(interest.value)
                                                    ? data.interests.filter((i) => i !== interest.value)
                                                    : [...data.interests, interest.value];
                                                setData('interests', newInterests);
                                            }}
                                            className={`group flex items-center gap-3 rounded-xl border-2 p-4 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
                                                data.interests.includes(interest.value)
                                                    ? 'border-fuchsia-500 bg-white/10 shadow-lg shadow-purple-500/50'
                                                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                                            }`}
                                        >
                                            <span className="text-2xl">{interest.icon}</span>
                                            <span className="text-white">{interest.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <Button 
                                    onClick={() => setStep(3)} 
                                    variant="outline"
                                    className="bg-gray-500/10 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-500 border-white/20 text-white hover:text-white backdrop-blur-sm hover:bg-white/10"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-500 disabled:opacity-50"
                                >
                                    Complete Setup
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
