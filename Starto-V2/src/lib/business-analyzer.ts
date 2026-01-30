
export type AnalysisResult = {
    demand: {
        score: number; // 0-100
        trend: "up" | "down" | "stable";
        label: string;
        details: string;
    };
    competition: {
        density: "low" | "medium" | "high";
        count: number; // Estimated nearby
        insight: string;
    };
    risk: {
        level: "low" | "medium" | "high";
        factors: string[];
    };
    suggestions: string[];
    market_size: string; // e.g. "Large", "Niche"
};

type BusinessCategory = "retail" | "food" | "service" | "tech" | "industrial" | "other";

function detectCategory(query: string): BusinessCategory {
    const q = query.toLowerCase();
    if (q.includes("shop") || q.includes("store") || q.includes("mart") || q.includes("boutique") || q.includes("kirana")) return "retail";
    if (q.includes("cafe") || q.includes("restaurant") || q.includes("tea") || q.includes("food") || q.includes("bakery") || q.includes("dhaba")) return "food";
    if (q.includes("cafe") || q.includes("restaurant") || q.includes("tea") || q.includes("food") || q.includes("bakery") || q.includes("dhaba") || q.includes("chai")) return "food";
    if (q.includes("plumber") || q.includes("electrician") || q.includes("consultant") || q.includes("agency") || q.includes("service") || q.includes("repair") || q.includes("gym")) return "service";
    if (q.includes("app") || q.includes("software") || q.includes("saas") || q.includes("tech") || q.includes("ai")) return "tech";
    if (q.includes("factory") || q.includes("manufacturing")) return "industrial";
    return "other";
}

export function analyzeBusiness(domain: string, location: string, budget: string, realCompetitors: any[] = []): AnalysisResult {
    const category = detectCategory(domain);
    const budgetLevel = budget.toLowerCase(); // low, med, high
    const compCount = realCompetitors.length;

    // Simulation Seeds (make it feel dynamic but consistent for same input)
    let demandScoreBase = 70;

    // Logic Branching based on Real Data
    let density: "low" | "medium" | "high" = "low";
    if (compCount > 15) density = "high";
    else if (compCount > 5) density = "medium";

    // Adjust Demand based on density (Validation of market)
    if (density === "high") demandScoreBase += 15; // Proven market
    else if (density === "medium") demandScoreBase += 5;

    let result: AnalysisResult = {
        demand: { score: Math.min(98, demandScoreBase), trend: "up", label: "Good", details: "" },
        competition: { density: density, count: compCount, insight: "" },
        risk: { level: "medium", factors: [] },
        suggestions: [],
        market_size: "Growing"
    };

    // 1. Demand Logic
    if (category === "food") {
        result.demand.details = `Food sector in ${location.split(',')[0]} is active. Found ${compCount} similar businesses nearby.`;
        if (density === "high") result.demand.label = "Very High";
    } else if (category === "tech") {
        result.demand.details = `Tech demand is global, but local ecosystem has ${compCount} players.`;
        result.demand.trend = "up";
    } else {
        result.demand.details = `Market activity is ${density} based on ${compCount} existing businesses in this domain.`;
    }

    // 2. Competition Logic
    if (density === "high") {
        result.competition.insight = "highly competitive. You need a strong unique differentiator to survive.";
        result.market_size = "Saturated";
    } else if (density === "medium") {
        result.competition.insight = "moderately active. Good balance of demand and opportunity.";
        result.market_size = "Healthy";
    } else {
        result.competition.insight = "low. You could be a first mover, but verify if there is demand.";
        result.market_size = "Niche / Empty";
    }

    // 3. Risk Logic
    if (budgetLevel === "low") {
        result.risk.level = "high";
        result.risk.factors.push("Limited marketing budget in a competitive area");
        result.risk.factors.push("Cash flow sensitivity");
    } else {
        result.risk.level = "medium";
        result.risk.factors.push("Talent retention costs");
    }

    if (category === "food") {
        result.risk.factors.push("High inventory spoilage risk");
        if (density === "high") result.risk.factors.push("Price wars with existing cafes");
    }
    if (category === "retail") result.risk.factors.push("Rising commercial rent");

    // 4. Starto Suggestions (Localized & Dynamic)
    const topCompetitor = realCompetitors[0]?.name;

    if (category === "food") {
        result.suggestions = [
            `Scout for a location at least 500m away from ${topCompetitor || "major competitors"}.`,
            "Partner with Zomato/Swiggy immediately for delivery coverage.",
            "Offer a 'Chai & Snacks' combo to attract office crowds nearby."
        ];
    } else if (category === "service") {
        result.suggestions = [
            "Register on Google My Business and WhatsApp Business immediately.",
            "Print flyers for nearby apartment complexes.",
            topCompetitor ? `Analyze ${topCompetitor}'s reviews to find what customers are complaining about.` : "Offer a 'first-time' discount to build local trust."
        ];
    } else {
        result.suggestions = [
            "Conduct a small survey in the neighborhood before signing a lease.",
            "Focus on building a loyal community on Instagram/WhatsApp Status.",
            "Collaborate with complementary local businesses."
        ];
    }

    return result;
}
