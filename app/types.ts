
export enum Category {
    serviceAndSacrifice = 'Service and Sacrifice',
    spiritualPractices = 'Spiritual Practices',
    emotionalHealth = 'Emotional Health',
    alignmentWithGodsHeart = 'Alignment With God\'s Heart',
    community = 'Community',
}

export type Question = {
    question: string;
    category: Category;
};

export type Result = {
    question: Question;
    score: number;
};

export type Results = {
    results: Result[];
    serviceAndSacrifice: number;
    spiritualPractices: number;
    emotionalHealth: number;
    alignmentWithGodsHeart: number;
    community: number;
    date: string;
};