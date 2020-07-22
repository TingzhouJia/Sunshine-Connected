interface Question{

  course?: Partial<Video>,

  course_id: string,

  author?: Partial<User>,

 
  author_id: string;

 
  isAnswered: boolean,

  
  content: string,


  timing: string,

  createdAt:string,
  id:string,
  answer?: Partial<Answer>[];
}