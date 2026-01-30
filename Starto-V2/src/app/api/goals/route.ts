import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { goals: { include: { todos: true } } },
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json({ goals: user.goals });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching goals" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { type, title, goalId, todoId, status, completed } = await req.json();
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        if (type === "CREATE_GOAL") {
            const goal = await prisma.founderGoal.create({
                data: { founderId: user.id, title, status: "ACTIVE" }
            });
            return NextResponse.json({ success: true, goal });
        }

        if (type === "CREATE_TODO") {
            const todo = await prisma.founderTodo.create({
                data: { goalId, title, completed: false }
            });
            return NextResponse.json({ success: true, todo });
        }

        if (type === "UPDATE_GOAL") {
            const goal = await prisma.founderGoal.update({
                where: { id: goalId },
                data: { status }
            });
            return NextResponse.json({ success: true, goal });
        }

        if (type === "UPDATE_TODO") {
            const todo = await prisma.founderTodo.update({
                where: { id: todoId },
                data: { completed } // Expects boolean
            });
            return NextResponse.json({ success: true, todo });
        }

        if (type === "DELETE_GOAL") {
            await prisma.founderGoal.delete({ where: { id: goalId } });
            return NextResponse.json({ success: true });
        }

        if (type === "DELETE_TODO") {
            await prisma.founderTodo.delete({ where: { id: todoId } });
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Invalid type" }, { status: 400 });

    } catch (error) {
        console.error("Goals API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
