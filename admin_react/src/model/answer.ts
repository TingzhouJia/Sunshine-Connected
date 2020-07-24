interface Answer{

  question: Partial<Question>;

 
  question_id: string;

  
  author: Partial<User>;
  
  author_id: string;
 
  content: string;
  
  isDraft: boolean;

  _id:string,

  updatedAt:string
}