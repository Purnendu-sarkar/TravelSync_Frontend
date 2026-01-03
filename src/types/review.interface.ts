export interface Reviewer {
    name: string;
    profilePhoto?: string;
    location?: string;
}

export interface Review {
    id: string;
    rating: number;
    comment: string;
    reviewer: Reviewer;
}
