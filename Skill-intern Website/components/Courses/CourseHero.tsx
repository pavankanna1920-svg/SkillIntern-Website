"use client";

export default function CourseHero() {
    return (
        <section className="pt-32 pb-16 bg-[#0f1025] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                    Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Courses</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Master the most in-demand skills with our industry-designed curriculum and expert mentorship.
                </p>

                {/* Stats Bar */}
                <div className="inline-flex flex-wrap justify-center gap-4 md:gap-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <StatItem value="2000+" label="Students" />
                    <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                    <StatItem value="10+" label="Courses" />
                    <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                    <StatItem value="Industry" label="Certified" />
                    <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                    <StatItem value="Available" label="Worldwide" />
                </div>
            </div>
        </section>
    );
}

function StatItem({ value, label }: { value: string, label: string }) {
    return (
        <div className="text-center px-4">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
        </div>
    )
}
