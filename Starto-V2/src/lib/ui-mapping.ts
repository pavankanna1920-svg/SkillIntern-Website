export const ROLE_LABELS: Record<string, string> = {
    FOUNDER: "Help for my business",
    FREELANCER: "I want work",
    INVESTOR: "I want to invest",
    PROVIDER: "I have space",
    // Fallbacks
    STARTUP: "Help for my business",
};

export const BUSINESS_TYPES = [
    { label: "Shop / Store Business", value: "ECOMMERCE" },
    { label: "Service Business", value: "SERVICES" },
    { label: "Food / Restaurant / Hotel", value: "ECOMMERCE" }, // Mapping multiple to ECOMMERCE/SERVICES if needed, or specific enums if they exist. Based on Onboarding.
    { label: "Education / Training", value: "EDTECH" },
    { label: "Hospital / Medical", value: "HEALTHTECH" },
    { label: "Transport / Delivery", value: "LOGISTICS" },
    { label: "Land / Building / Office", value: "REAL_ESTATE" },
    { label: "Factory / Farming", value: "AGRITECH" },
    { label: "Online / App / Software", value: "SAAS" },
    { label: "Other", value: "OTHER" },
];

export const BUSINESS_STAGES = [
    { label: "Just planning / Starting", value: "IDEA" },
    { label: "Started small work", value: "MVP" },
    { label: "Running normally", value: "GROWTH" },
    { label: "Big business", value: "SCALE" },
];

export const getRoleLabel = (role?: string) => {
    if (!role) return "";
    return ROLE_LABELS[role.toUpperCase()] || role;
};

export const getBusinessTypeLabel = (value?: string) => {
    if (!value) return "";
    const found = BUSINESS_TYPES.find(t => t.value === value);
    return found ? found.label : value;
};

export const getBusinessStageLabel = (value?: string) => {
    if (!value) return "";
    const found = BUSINESS_STAGES.find(s => s.value === value);
    return found ? found.label : value;
};
