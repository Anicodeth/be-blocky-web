

export const plans = [
    {
        name: "Free",
        price: {
            monthly: 0,
            yearly: 0
        },
        quota: {

        },
        description: "You can try it for free and upgrade later."
    },
    {
        name: "Standard",
        price: {
            monthly: 1000,
            yearly: 10000
        },
        quota: {
            studentCount: 3
        },
        description: "Unlocks access to some of our best courses."
    },
    {
        name: "Gold",
        price: {
            monthly: 2500,
            yearly: 25000
        },
        quota: {
            studentCount: 5
        },
        description: "Provides access to premium courses."
    },
    {
        name: "Premium",
        price: {
            monthly: 5000,
            yearly: 50000
        },
        quota: {
            studentCount: 10
        },
        description: "For the best learning experience."
    },
] as const


export type Plan = {
    name: string,
    price: {
        monthly: number,
        yearly: number
    },
    quota: Record<string, string>,
    description: string
}
