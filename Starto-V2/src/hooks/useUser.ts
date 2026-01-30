import { useQuery } from "@tanstack/react-query";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { useSession } from "next-auth/react";

export interface DbUser {
    id: string;
    email: string;
    name: string | null;
    role: "STARTUP" | "FREELANCER" | "INVESTOR" | "PROVIDER" | "ADMIN" | null;
    onboarded: boolean;
    firebaseUid: string | null;
    image: string | null;
    // Location Fields
    latitude?: number | null;
    longitude?: number | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    pincode?: string | null;
    phoneNumber?: string | null;
    freelancerProfile: any;
    startupProfile: any;
    investorProfile: any;
    providerProfile: any;
}

export function useUser() {
    const { data: session, status } = useSession();
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(auth.currentUser);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setFirebaseUser(user);
            setIsLoadingAuth(false);
        });
        return () => unsubscribe();
    }, []);

    const email = session?.user?.email || firebaseUser?.email;

    const { data: dbUser, isLoading: isLoadingDb } = useQuery<DbUser>({
        queryKey: ["user", email], // Key by email is more stable if UID varies
        queryFn: async () => {
            if (!email) return null;
            // Add cache-busting timestamp
            const res = await fetch(`/api/users/me?email=${email}&_t=${Date.now()}`);
            if (!res.ok) return null;
            return res.json();
        },
        enabled: !!email,
    });

    return {
        user: firebaseUser, // access to raw firebase user if needed
        sessionUser: session?.user,
        dbUser,
        role: dbUser?.role?.toLowerCase(), // normalized to lowercase for routing
        isLoading: (status === "loading" && isLoadingAuth) || isLoadingDb,
        isAuthenticated: !!email
    };
}
