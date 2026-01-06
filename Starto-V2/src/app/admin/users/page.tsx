"use client"

import { useEffect, useState } from "react"
import { AdminMobileNav } from "@/components/admin/AdminMobileNav"
import { toast } from "sonner" // Assuming sonner is installed/used as per package.json

// --- Types ---
interface User {
    id: string
    name: string
    email: string
    phoneNumber: string | null
    image: string | null
    role: string
    activeRole: string | null
    city: string | null
    state: string | null
    country: string | null
    createdAt: string
}

interface Meta {
    total: number
    page: number
    limit: number
    totalPages: number
}

// --- Icons ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
)
const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
)
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
)
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
)
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
)
const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
)

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [meta, setMeta] = useState<Meta | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // -- Filters --
    const [activeTab, setActiveTab] = useState("ALL")
    const [search, setSearch] = useState("")
    const [location, setLocation] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [debouncedLocation, setDebouncedLocation] = useState("")
    const [page, setPage] = useState(1)

    // Debounce effects
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 500)
        return () => clearTimeout(handler)
    }, [search])

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedLocation(location), 500)
        return () => clearTimeout(handler)
    }, [location])

    // Fetch Trigger
    useEffect(() => {
        fetchUsers()
    }, [page, activeTab, debouncedSearch, debouncedLocation])

    async function fetchUsers() {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            params.set("page", page.toString())
            params.set("limit", "20")
            if (activeTab !== "ALL") params.set("role", activeTab)
            if (debouncedSearch) params.set("search", debouncedSearch)
            if (debouncedLocation) params.set("location", debouncedLocation)

            const res = await fetch(`/api/admin/users?${params.toString()}`)
            if (!res.ok) throw new Error("Failed to fetch users")
            const data = await res.json()

            // Client-side sort fallback if needed, but API should sort by createdAt desc
            data.data.sort((a: User, b: User) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

            setUsers(data.data)
            setMeta(data.meta)
        } catch (err) {
            setError("Error loading users")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const isNewUser = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        return diffInHours < 24 // 24 Hours
    }

    const handleCopyEmail = (email: string) => {
        navigator.clipboard.writeText(email);
        toast.success("Email copied to clipboard");
    }

    const roles = [
        { id: "ALL", label: "All Users" },
        { id: "STARTUP", label: "Startups" },
        { id: "INVESTOR", label: "Investors" },
        { id: "FREELANCER", label: "Freelancers" },
        { id: "PROVIDER", label: "Providers" },
        { id: "ADMIN", label: "Admins" },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-background border-b border-border sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <AdminMobileNav />
                        <div>
                            <h1 className="text-xl font-bold text-foreground">User Management</h1>
                            <p className="text-sm text-muted-foreground">View and manage all platform users</p>
                        </div>
                    </div>
                </div>

                {/* Role Tabs */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
                    <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide py-2">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => { setActiveTab(role.id); setPage(1); }}
                                className={`
                                    px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border
                                    ${activeTab === role.id
                                        ? "bg-foreground text-background border-foreground"
                                        : "bg-background text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"}
                                `}
                            >
                                {role.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Filters Bar */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all text-sm text-foreground placeholder:text-muted-foreground"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors">
                            <FilterIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Filter by location..."
                            className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all text-sm text-foreground placeholder:text-muted-foreground"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                </div>

                {/* Users List */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-card border border-border p-6 rounded-xl animate-pulse h-48"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg text-center">
                        {error}
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed border-border">
                        <div className="max-w-xs mx-auto text-muted-foreground">
                            <p className="text-lg font-medium text-foreground">No users found</p>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((user) => (
                            <div key={user.id} className="group bg-card border border-border rounded-xl hover:border-foreground/20 transition-all duration-200 p-5 flex flex-col shadow-sm relative overflow-hidden">
                                {isNewUser(user.createdAt) && (
                                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm z-10">
                                        NEW
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-lg border border-border overflow-hidden">
                                            {user.image ? (
                                                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                user.name?.[0]?.toUpperCase() || "?"
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors" title={user.name}>{user.name || "Unknown User"}</h3>
                                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                {user.activeRole || user.role || "USER"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 flex-1 text-sm text-muted-foreground">
                                    <div className="flex items-start gap-2">
                                        <div className="mt-0.5 shrink-0"><MapPinIcon /></div>
                                        <span className="line-clamp-1 text-foreground/80" title={user.city || "Not set"}>
                                            {user.city ? `${user.city}, ${user.country}` : <span className="text-muted-foreground italic">No location set</span>}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="mt-0.5 shrink-0"><PhoneIcon /></div>
                                        {user.phoneNumber ? (
                                            <a href={`tel:${user.phoneNumber}`} className="text-foreground/80 hover:text-primary hover:underline transition-colors">
                                                {user.phoneNumber}
                                            </a>
                                        ) : (
                                            <span className="text-muted-foreground italic">No phone available</span>
                                        )}
                                    </div>
                                    <div className="pt-3 border-t border-border mt-2 flex items-center gap-2 justify-between group/email">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <div className="mt-0.5 shrink-0"><MailIcon /></div>
                                            <p className="text-foreground/80 truncate" title={user.email}>{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => handleCopyEmail(user.email)}
                                            className="opacity-0 group-hover/email:opacity-100 p-1 hover:bg-secondary rounded transition-all text-muted-foreground hover:text-foreground"
                                            title="Copy Email"
                                        >
                                            <CopyIcon />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-5 pt-0 flex gap-2">
                                    {user.phoneNumber && (
                                        <a
                                            href={`https://wa.me/${user.phoneNumber.replace(/[^0-9]/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center bg-green-50 text-green-700 border border-green-200 py-2 rounded-lg text-xs font-medium hover:bg-green-100 transition-all dark:bg-green-900/20 dark:text-green-400 dark:border-green-900"
                                        >
                                            WhatsApp
                                        </a>
                                    )}
                                    <div className="flex-1 flex gap-1">
                                        <a
                                            href={`mailto:${user.email}`}
                                            className="flex-1 text-center bg-secondary text-secondary-foreground py-2 rounded-lg text-xs font-semibold hover:bg-secondary/80 transition-colors border border-border"
                                        >
                                            Email
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Check Pagination */}
                {meta && meta.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-6 pb-12">
                        <button
                            disabled={page === 1 || loading}
                            onClick={() => setPage(p => p - 1)}
                            className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-secondary disabled:opacity-50 disabled:hover:bg-transparent text-sm font-medium transition-colors"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-muted-foreground">Page {page} of {meta.totalPages}</span>
                        <button
                            disabled={page >= meta.totalPages || loading}
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-secondary disabled:opacity-50 disabled:hover:bg-transparent text-sm font-medium transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}
