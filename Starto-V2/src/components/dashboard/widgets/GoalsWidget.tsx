"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Target } from "lucide-react";
import { toast } from "sonner";

type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

type Goal = {
    id: string;
    title: string;
    status: string;
    todos: Todo[];
};

export function GoalsWidget() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [newGoalTitle, setNewGoalTitle] = useState(""); // For new Goal
    const [newTodoTitles, setNewTodoTitles] = useState<Record<string, string>>({}); // Map goalId -> input text

    const fetchGoals = async () => {
        try {
            const res = await fetch("/api/goals");
            const data = await res.json();
            if (data.goals) setGoals(data.goals);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const addGoal = async () => {
        if (!newGoalTitle.trim()) return;
        try {
            const res = await fetch("/api/goals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "CREATE_GOAL", title: newGoalTitle })
            });
            if (res.ok) {
                setNewGoalTitle("");
                fetchGoals();
                toast.success("Goal added");
            }
        } catch (e) { toast.error("Error adding goal"); }
    };

    const deleteGoal = async (id: string) => {
        try {
            await fetch("/api/goals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "DELETE_GOAL", goalId: id })
            });
            fetchGoals();
        } catch (e) { toast.error("Error deleting goal"); }
    };

    const addTodo = async (goalId: string) => {
        const title = newTodoTitles[goalId];
        if (!title?.trim()) return;

        try {
            const res = await fetch("/api/goals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "CREATE_TODO", goalId, title })
            });
            if (res.ok) {
                setNewTodoTitles(prev => ({ ...prev, [goalId]: "" }));
                fetchGoals();
            }
        } catch (e) { toast.error("Error adding task"); }
    };

    const toggleTodo = async (todoId: string, completed: boolean) => {
        // Optimistic Update
        const newGoals = goals.map(g => ({
            ...g,
            todos: g.todos.map(t => t.id === todoId ? { ...t, completed } : t)
        }));
        setGoals(newGoals);

        try {
            await fetch("/api/goals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "UPDATE_TODO", todoId, completed })
            });
        } catch (e) {
            fetchGoals(); // Revert on error
        }
    };

    return (
        <Card className="border-white/10 bg-[#0A0A0A]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Current Focus
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Add Goal Input */}
                <div className="flex gap-2">
                    <Input
                        placeholder="Add a high-level goal (e.g. Launch MVP)"
                        value={newGoalTitle}
                        onChange={e => setNewGoalTitle(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && addGoal()}
                        className="bg-white/5 border-white/10"
                    />
                    <Button onClick={addGoal} size="icon" variant="secondary">
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>

                {/* Goals List */}
                <div className="space-y-6">
                    {goals.map(goal => (
                        <div key={goal.id} className="space-y-2">
                            <div className="flex items-center justify-between group">
                                <h4 className="font-semibold text-white">{goal.title}</h4>
                                <button onClick={() => deleteGoal(goal.id)} className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>

                            {/* Todos */}
                            <div className="pl-0 space-y-1">
                                {goal.todos.map(todo => (
                                    <div key={todo.id} className="flex items-center gap-2 text-sm text-gray-400 group/todo">
                                        <Checkbox
                                            checked={todo.completed}
                                            onCheckedChange={(c) => toggleTodo(todo.id, c as boolean)}
                                            className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:text-black"
                                        />
                                        <span className={todo.completed ? "line-through opacity-50 transition-all" : ""}>{todo.title}</span>
                                        <button
                                            onClick={async () => {
                                                await fetch("/api/goals", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ type: "DELETE_TODO", todoId: todo.id })
                                                });
                                                fetchGoals();
                                            }}
                                            className="ml-auto text-gray-700 hover:text-red-400 opacity-0 group-hover/todo:opacity-100 text-xs"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}

                                {/* Add Todo Input */}
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="w-4 h-4 border border-white/10 rounded ml-0.5 shrink-0" /> {/* Ghost Checkbox */}
                                    <Input
                                        placeholder="Add step..."
                                        value={newTodoTitles[goal.id] || ""}
                                        onChange={e => setNewTodoTitles(prev => ({ ...prev, [goal.id]: e.target.value }))}
                                        onKeyDown={e => e.key === "Enter" && addTodo(goal.id)}
                                        className="h-7 text-xs bg-transparent border-none p-0 placeholder:text-gray-700 focus-visible:ring-0"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {goals.length === 0 && <p className="text-sm text-gray-500 italic text-center py-4">Set a goal to start tracking progress.</p>}
                </div>

            </CardContent>
        </Card>
    );
}
