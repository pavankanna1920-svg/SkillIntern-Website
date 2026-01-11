import CourseCard from "./CourseCard";

export default function TrendingCourses() {
    const courses = [
        {
            id: "1",
            title: "Full Stack Web Development",
            category: "Development",
            rating: 4.8,
            students: 1200,
            duration: "6 Months",
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            price: "₹14999",
        },
        {
            id: "2",
            title: "Cyber Security & Ethical Hacking",
            category: "Security",
            rating: 4.8,
            students: 850,
            duration: "6 Months",
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            price: "₹14999",
        },
        {
            id: "3",
            title: "Android & iOS App Development",
            category: "Mobile",
            rating: 4.8,
            students: 900,
            duration: "6 Months",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            price: "₹14999",
        },
        {
            id: "4",
            title: "Artificial Intelligence",
            category: "AI & ML",
            rating: 4.8,
            students: 750,
            duration: "6 Months",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            price: "₹14999",
        },
        {
            id: "5",
            title: "Digital Marketing",
            category: "Marketing",
            rating: 4.8,
            students: 1100,
            duration: "3 Months",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            price: "₹14999",
        },
        {
            id: "6",
            title: "Data Analytics",
            category: "Data Science",
            rating: 4.8,
            students: 650,
            duration: "5 Months",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            price: "₹14999",
        },
        {
            id: "7",
            title: "AutoCAD & CATIA",
            category: "Design",
            rating: 4.8,
            students: 500,
            duration: "4 Months",
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            price: "₹14999",
        },
        {
            id: "8",
            title: "AWS Cloud Computing",
            category: "Cloud",
            rating: 4.8,
            students: 400,
            duration: "4 Months",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            price: "₹14999",
        },
        {
            id: "9",
            title: "HR Analytics & Recruitment",
            category: "Business",
            rating: 4.8,
            students: 300,
            duration: "3 Months",
            image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            price: "₹14999",
        },
    ];

    return (
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Trending Courses
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Explore our most popular programs designed to help you launch your career in technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))}
                </div>
            </div>
        </section>
    );
}
