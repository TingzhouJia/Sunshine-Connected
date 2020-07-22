interface Progress {
    status: string;
   
    message: string;
   
    obj_id: string;
  
    auditer_id?: string;
   
    auditer?: Partial<User>;
}