"use client";

import { Search } from "lucide-react";

interface SearchAndFilterProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export default function SearchAndFilter({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }: SearchAndFilterProps) {
    const categories = ["All", "Programming", "Technology", "Data Science", "AI & ML", "Mobile Dev"];

    return (
        <div className="py-8 bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-[500px]">
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 bg-gray-50/50 focus:bg-white shadow-sm placeholder-gray-400"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${selectedCategory === cat
                                    ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/25"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
