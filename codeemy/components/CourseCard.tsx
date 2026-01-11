import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock, Star } from "lucide-react";

interface CourseCardProps {
    id: string;
    title: string;
    category: string;
    rating: number;
    students: number;
    duration: string;
    image: string;
    price: string;
}

export default function CourseCard({ id, title, category, rating, students, duration, image, price }: CourseCardProps) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-primary/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Image Thumbnail */}
            <Link href={`/courses/${id}`} className="h-48 relative block overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                <Image
                    src={image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                    alt={title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {rating}
                </div>
            </Link>

            <div className="p-6">
                <div className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">
                    {category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition-colors">
                    <Link href={`/courses/${id}`}>
                        {title}
                    </Link>
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {duration}
                    </div>
                    <div>
                        {students}+ Students
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="font-bold text-lg text-gray-900">
                        {price}
                    </div>
                    <Link
                        href={`/courses/${id}`}
                        className="inline-flex items-center gap-2 font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                    >
                        View Course <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
