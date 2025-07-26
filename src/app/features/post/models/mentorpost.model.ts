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
}