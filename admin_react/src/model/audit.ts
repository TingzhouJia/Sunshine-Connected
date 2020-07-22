interface Audit {

  auditer?: Partial<User>;
 
  auditor_id: string;
 
  type: string;
 
  object: Partial<Workshop | Video>;
 
  obj_id: string;
 
  deadline: Date;
 
  progress: Partial<Progress>;

 
  progress_id: string;

 
  message: string;
}