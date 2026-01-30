"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, UserPlus, Search, MapPin, Check, X, Calendar, Edit2, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { useSession } from "next-auth/react"

export default function ConnectionsPage() {
    const { data: session } = useSession();
    const activeRole = (session?.user as any)?.activeRole as string | undefined;

    const [activeTab, setActiveTab] = useState<"inbox" | "network">("inbox");

    // Real Data State
    const [network, setNetwork] = useState<any[]>([]);
    const [inbox, setInbox] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters & Search
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState<"ALL" | "FOUNDER" | "FREELANCER" | "INVESTOR">("ALL");

    // Filtered Network
    const filteredNetwork = network.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.company?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "ALL" || user.role?.toUpperCase() === roleFilter;
        return matchesSearch && matchesRole;
    });

    // Fetch Real Data
    React.useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await fetch("/api/connections");
                if (res.ok) {
                    const data = await res.json();
                    setNetwork(data.network || []);
                    setInbox(data.inbox || []);
                }
            } catch (error) {
                console.error("Failed to fetch connections", error);
            } finally {
                setLoading(false);
            }
        };
        fetchConnections();
    }, []);

    // Mock Data for Todos (Keep for now as requested)
    const [todos, setTodos] = useState([
        { id: 1, text: "Hire UI/UX Designer", completed: false },
        { id: 2, text: "Review Q3 Marketing Plan", completed: true },
    ]);
    const [newTodo, setNewTodo] = useState("");
    const [isAddingTodo, setIsAddingTodo] = useState(false);

    const toggleTodo = (id: number) => {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(t => t.id !== id));
    }

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
        setNewTodo("");
        setIsAddingTodo(false);
    }

    return (
        <div className="min-h-full bg-white dark:bg-[#050505] font-sans relative overflow-hidden">

            {/* Graph Paper Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto p-8 md:p-12">

                {/* Header */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-6xl font-serif text-black dark:text-white mb-2 md:mb-4">Connections</h1>
                    <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Manage your network & requests</p>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-8 mb-12 border-b border-gray-100 dark:border-white/10 pb-4">
                    <button
                        onClick={() => setActiveTab("inbox")}
                        className={`text-sm font-bold tracking-widest uppercase transition-colors relative ${activeTab === "inbox" ? "text-black dark:text-white" : "text-gray-400 hover:text-gray-600"}`}
                    >
                        Inbox
                        {activeTab === "inbox" && <motion.div layoutId="underline" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-black dark:bg-white" />}
                    </button>
                    <button
                        onClick={() => setActiveTab("network")}
                        className={`text-sm font-bold tracking-widest uppercase transition-colors relative ${activeTab === "network" ? "text-black dark:text-white" : "text-gray-400 hover:text-gray-600"}`}
                    >
                        My Network
                        {activeTab === "network" && <motion.div layoutId="underline" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-black dark:bg-white" />}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN: Main Content (Inbox/Network) */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {activeTab === "inbox" && (
                                <motion.div
                                    key="inbox"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    {inbox.length === 0 ? (
                                        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/10 rounded-[2rem] p-8 md:p-16 text-center shadow-sm flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px]">
                                            <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 rotate-3">
                                                <UserPlus className="w-8 h-8 text-black dark:text-white" />
                                            </div>
                                            <h3 className="text-3xl font-serif text-black dark:text-white mb-2">Inbox is empty</h3>
                                            <p className="text-gray-400 max-w-xs mx-auto text-sm mb-8">No pending connection requests. Explore the map to find new peers!</p>
                                            <Button
                                                onClick={() => window.location.href = '/explore'}
                                                className="bg-black text-white dark:bg-white dark:text-black rounded-none h-12 px-8 text-xs font-bold tracking-widest uppercase hover:opacity-80"
                                            >
                                                Go to Explore
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {inbox.map((req: any) => (
                                                <div key={req.id} className="p-6 bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/10 rounded-xl flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center font-bold text-lg overflow-hidden">
                                                            {req.sender.image ? <img src={req.sender.image} alt={req.sender.name} className="w-full h-full object-cover" /> : req.sender.name[0]}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-black dark:text-white">{req.sender.name}</h4>
                                                            <p className="text-sm text-gray-400">{req.message || "Wants to connect"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-9 px-3 border-gray-200 dark:border-white/10 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                                                            onClick={async () => {
                                                                try {
                                                                    const res = await fetch("/api/connections", {
                                                                        method: "PATCH",
                                                                        headers: { "Content-Type": "application/json" },
                                                                        body: JSON.stringify({ requestId: req.id, action: "REJECT" })
                                                                    });
                                                                    if (res.ok) {
                                                                        setInbox(prev => prev.filter(i => i.id !== req.id));
                                                                    }
                                                                } catch (err) { console.error(err); }
                                                            }}
                                                        >
                                                            <X className="w-4 h-4" />
                                                            <span className="ml-2 text-xs font-bold uppercase hidden md:inline">Reject</span>
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="h-9 px-4 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 rounded-md"
                                                            onClick={async () => {
                                                                try {
                                                                    const res = await fetch("/api/connections", {
                                                                        method: "PATCH",
                                                                        headers: { "Content-Type": "application/json" },
                                                                        body: JSON.stringify({ requestId: req.id, action: "ACCEPT" })
                                                                    });
                                                                    if (res.ok) {
                                                                        // Optimistic update: Remove from inbox, logic will re-fetch or user will switch tab
                                                                        setInbox(prev => prev.filter(i => i.id !== req.id));
                                                                        // Optionally re-fetch full list to update Network tab as well?
                                                                        // For now, let's keep it simple. User switches tab -> usually triggers refresh if we use proper state, 
                                                                        // but here `activeTab` transition doesn't re-fetch.
                                                                        // We should ideally append to network or prompt refresh.
                                                                        // We'll append optimistic friend to network to be smart:
                                                                        setNetwork(prev => [...prev, {
                                                                            id: req.sender.id,
                                                                            name: req.sender.name,
                                                                            image: req.sender.image,
                                                                            role: req.sender.role,
                                                                            company: req.sender.company,
                                                                            city: req.sender.city,
                                                                            // Phone number might be missing in optimistic update as inbox payload didn't have it.
                                                                            // But standard user flow assumes they just want it out of inbox.
                                                                            // We will just remove from inbox for now.
                                                                        }]);
                                                                    }
                                                                } catch (err) { console.error(err); }
                                                            }}
                                                        >
                                                            <Check className="w-4 h-4" />
                                                            <span className="ml-2 text-xs font-bold uppercase hidden md:inline">Accept</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === "network" && (
                                <motion.div
                                    key="network"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-4"
                                >
                                    {/* Filters & Search */}
                                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                placeholder="Search by name or company..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-9 bg-white dark:bg-black"
                                            />
                                        </div>
                                        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-white/5 rounded-lg w-max overflow-x-auto">
                                            {["ALL", "FOUNDER", "FREELANCER", "INVESTOR"].map((role) => (
                                                <button
                                                    key={role}
                                                    onClick={() => setRoleFilter(role as any)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${roleFilter === role ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm" : "text-gray-500 hover:text-black dark:hover:text-white"}`}
                                                >
                                                    {role === "ALL" ? "All" : role.charAt(0) + role.slice(1).toLowerCase() + "s"}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {network.length === 0 ? (
                                        <div className="p-12 text-center border border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
                                            <p className="text-gray-400 italic">You haven't connected with anyone yet.</p>
                                        </div>
                                    ) : (
                                        filteredNetwork.length === 0 ? (
                                            <div className="p-12 text-center border border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
                                                <p className="text-gray-400 italic">No connections found matching criteria.</p>
                                            </div>
                                        ) :
                                            filteredNetwork.map((user: any) => (
                                                <div key={user.id} className="group flex items-center justify-between p-6 bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/10 rounded-xl hover:border-black/20 dark:hover:border-white/30 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center font-bold text-lg overflow-hidden">
                                                            {user.image ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" /> : user.name[0]}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-black dark:text-white">{user.name}</h4>
                                                            <p className="text-xs text-gray-400">{user.role} @ {user.company}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-[10px] text-gray-400 font-normal uppercase tracking-wide">
                                                            {user.city || "Remote"}
                                                        </Badge>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className={`h-8 w-8 rounded-full ${user.phoneNumber ? "text-[#25D366] hover:bg-[#25D366]/10" : "text-gray-300 cursor-not-allowed"}`}
                                                            onClick={() => {
                                                                if (user.phoneNumber) {
                                                                    window.open(`https://wa.me/${user.phoneNumber.replace(/[^0-9]/g, '')}`, '_blank');
                                                                } else {
                                                                    alert("This user hasn't added a phone number yet.");
                                                                }
                                                            }}
                                                            title={user.phoneNumber ? "Chat on WhatsApp" : "No Phone Number"}
                                                        >
                                                            {/* WhatsApp-like Icon (MessageCircle is close enough for generic) or we construct SVG */}
                                                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 fill-current">
                                                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5u" />
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                </div>
                                            )))
                                    }
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN: Founder To-Do Widget */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/10 rounded-2xl p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                {/* Dynamic Focus Header */}
                                <h3 className="font-serif text-2xl text-black dark:text-white">
                                    {(() => {
                                        const role = activeRole?.toUpperCase();
                                        if (role === "FREELANCER") return "Freelancer Goal";
                                        if (role === "INVESTOR") return "Investor Goal";
                                        if (role === "PROVIDER") return "Provider Space Pending";
                                        return "Founder Focus";
                                    })()}
                                </h3>
                                <button
                                    onClick={() => setIsAddingTodo(true)}
                                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/20 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {isAddingTodo && (
                                <form onSubmit={addTodo} className="mb-4">
                                    <div className="flex gap-2">
                                        <Input
                                            autoFocus
                                            placeholder="What's critical today?"
                                            className="h-9 text-xs"
                                            value={newTodo}
                                            onChange={(e) => setNewTodo(e.target.value)}
                                        />
                                        <Button type="submit" size="sm" className="h-9 w-9 p-0 bg-black text-white dark:bg-white dark:text-black">
                                            <Check className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {todos.length === 0 && !isAddingTodo && (
                                <p className="text-xs text-gray-400 italic text-center py-4">Nothing on the list. Enjoy the calm.</p>
                            )}

                            {todos.map(todo => (
                                <div key={todo.id} className="group flex items-start gap-3 text-sm">
                                    <Checkbox
                                        id={`todo-${todo.id}`}
                                        checked={todo.completed}
                                        onCheckedChange={() => toggleTodo(todo.id)}
                                        className="mt-0.5 rounded-full border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black dark:border-gray-600 dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-white"
                                    />
                                    <div className="flex-1">
                                        <label
                                            htmlFor={`todo-${todo.id}`}
                                            className={`block leading-tight cursor-pointer transition-all ${todo.completed ? "text-gray-300 line-through" : "text-gray-700 dark:text-gray-300"}`}
                                        >
                                            {todo.text}
                                        </label>
                                    </div>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center">
                                {Math.round((todos.filter(t => t.completed).length / (todos.length || 1)) * 100)}% Complete
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
