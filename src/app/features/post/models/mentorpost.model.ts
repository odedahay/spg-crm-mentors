import { Timestamp } from "@angular/fire/firestore";

export interface MentorPost{
    id?: string;
    firstname:string;
    lastname: string;
    email: string;
    phoneNumber: string;
    program:string;
    numOfMentor: number;
    note: string;
    profileImageUrl: string;
    status: string;
    publishedOn:Timestamp;
    userId: string;
    createdAt: string; // ISO string date
    followUpInterval: number; // e.g., 2 or 3
    lastUpdated?: Timestamp; 
}