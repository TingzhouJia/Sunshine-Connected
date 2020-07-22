interface Video {
    id:string,
    stage:string,
    time:number,
    title:string,
    question?:Partial<Question>[],

    questionCount: number,

    file: string,

    author: Partial<User>,
  

    category:string[],
  
  
  

    progress?: Partial<Progress>,
  

    viewedCount: number;
  
    createdAt:string,
    likeCount: number;
}