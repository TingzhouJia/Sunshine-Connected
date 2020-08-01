import { Progress } from "./progress";
import { Video } from "./video";
import { User } from "./user";
import { Workshop } from "./workshop";

export interface Audit {
  id:string
  auditer?: Partial<User>;
 
  auditor_id: string;
 
  type: string;
 
  object: Partial<Workshop | Video>;
 
  obj_id: string;
 
  deadline: Date;
 
  progress: Partial<Progress>;

  updatedAt:string,
  
  progress_id: string;

 
  message: string;
}
