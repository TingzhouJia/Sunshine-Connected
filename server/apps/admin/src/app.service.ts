import { Injectable } from '@nestjs/common';
import {v4} from 'uuid'
import {Storage} from '@google-cloud/storage'
@Injectable()
export class AppService {

  //s3: AWS.S3
  storage:Storage
  constructor(){
  
    this.storage=new Storage(
      {projectId:"sunshineconnect"}
    )
  }


  getHello(): string {
    return 'Hello World!';
  }



  public async upload(file:any){
    const rand=v4()
   const blob= this.storage.bucket('cover_url').file(`${rand}_${file.originalname}`,{

   })
   const blobStream = blob.createWriteStream();

    blobStream.on('error',(e)=>{
      console.log(e)
    })

  blobStream.on('finish', () => {

    // The public URL can be used to directly access the file via HTTP.
    
   
   
  });
  const publicUrl =  `https://storage.googleapis.com/cover_url/${blob.name}`
  blobStream.end(file.buffer);
  
  return publicUrl
  }

  
}
