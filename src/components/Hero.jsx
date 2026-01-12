import { FaPlay, FaApple, FaGooglePlay } from "react-icons/fa";
import { GiMuscleUp } from "react-icons/gi";

const Hero = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Background linear */}
            <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-purple-900 to-pink-800 opacity-90"></div>

            {/* Animated linear Orbs */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>


            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                            <GiMuscleUp className="text-yellow-400 text-xl" />
                            <span className="text-sm font-semibold text-white">
                                #1 Fitness App 2024
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Track Your
                            <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">
                                Moves. Transform
                            </span>
                            Your Body.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg text-gray-200 mb-8 max-w-lg">
                            Join 5M+ users who track workouts, set goals, and achieve fitness
                            milestones with our AI-powered move detection technology.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-6 mb-8">
                            <div>
                                <div className="text-3xl font-bold text-white">500k+</div>
                                <div className="text-gray-300 text-sm">Active Users</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">4.9★</div>
                                <div className="text-gray-300 text-sm">App Store Rating</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">10M+</div>
                                <div className="text-gray-300 text-sm">Workouts Logged</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button className="group relative bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2">
                                <FaPlay className="text-sm" />
                                Start Free Trial
                                <span className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></span>
                            </button>

                            <button className="group bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-2">
                                Watch Demo
                            </button>
                        </div>

                        {/* App Store Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button className="flex items-center gap-3 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white py-3 px-6 rounded-xl transition-all duration-300 border border-white/10">
                                <FaApple className="text-2xl" />
                                <div className="text-left">
                                    <div className="text-xs">Download on the</div>
                                    <div className="font-semibold">App Store</div>
                                </div>
                            </button>

                            <button className="flex items-center gap-3 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white py-3 px-6 rounded-xl transition-all duration-300 border border-white/10">
                                <FaGooglePlay className="text-xl" />
                                <div className="text-left">
                                    <div className="text-xs">Get it on</div>
                                    <div className="font-semibold">Google Play</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right Content - App Preview */}
                    <div className="relative">
                        {/* Floating Phone Mockup */}
                        <div className="relative mx-auto max-w-md">
                            {/* Main Phone */}
                            <div className="relative bg-gray-900 rounded-[40px] p-6 shadow-2xl border-[14px] border-gray-800">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-2xl"></div>

                                {/* Screen Content */}
                                <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-[26px] overflow-hidden mt-6">
                                    {/* App Header */}
                                    <div className="bg-linear-to-r from-purple-600 to-pink-600 p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                                <GiMuscleUp className="text-white text-2xl" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-xl">Moves Pro</h3>
                                                <p className="text-white/80 text-sm">Today's Workout</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="p-6 grid grid-cols-2 gap-4">
                                        <div className="bg-gray-800/50 rounded-xl p-4">
                                            <div className="text-2xl font-bold text-white">2,540</div>
                                            <div className="text-gray-400 text-sm">Calories</div>
                                        </div>
                                        <div className="bg-gray-800/50 rounded-xl p-4">
                                            <div className="text-2xl font-bold text-cyan-400">12,890</div>
                                            <div className="text-gray-400 text-sm">Steps</div>
                                        </div>
                                        <div className="bg-gray-800/50 rounded-xl p-4">
                                            <div className="text-2xl font-bold text-purple-400">45</div>
                                            <div className="text-gray-400 text-sm">Workouts</div>
                                        </div>
                                        <div className="bg-gray-800/50 rounded-xl p-4">
                                            <div className="text-2xl font-bold text-pink-400">28</div>
                                            <div className="text-gray-400 text-sm">Days Streak</div>
                                        </div>
                                    </div>

                                    {/* Workout Progress */}
                                    <div className="px-6 pb-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-white">Today's Goal</span>
                                            <span className="text-cyan-400 font-semibold">85%</span>
                                        </div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-linear-to-r from-cyan-500 to-purple-500 w-[85%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-6 -right-6 bg-linear-to-r from-cyan-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl">
                                <GiMuscleUp className="text-white text-3xl" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-linear-to-r from-purple-500 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center transform -rotate-12 shadow-2xl">
                                <div className="text-white text-xs font-bold text-center">
                                    500+<br />Moves
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-linear-to-b from-cyan-400 to-purple-400 rounded-full mt-2 animate-bounce"></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;