import { Question } from "./question";
import { User } from "./user";
import { Progress } from "./progress";

export interface Video {
    id:string
    stage:string
    time:number
    title:string
    questions:Partial<Question>[]
    cover:string
    questionCount: number
    format:string,
    file: string,

    author: Partial<User>,
  

    category:string[],
  
  
  

    progress: Partial<Progress>;
  

    viewedCount: number;
  
    createdAt:string;
    updatedAt:Date;
    likeCount: number;
}