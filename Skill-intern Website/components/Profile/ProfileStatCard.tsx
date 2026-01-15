import { LucideIcon } from "lucide-react";

interface StatProps {
    icon: LucideIcon;
    label: string;
    value: string;
    color: string;
}

export default function ProfileStatCard({ icon: Icon, label, value, color }: StatProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white shadow-lg`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
            </div>
        </div>
    );
}
