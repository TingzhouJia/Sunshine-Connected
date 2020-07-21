import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk'
@Injectable()
export class AppService {

  s3: AWS.S3

  constructor(){
    this.s3=new AWS.S3({
      accessKeyId:process.env.ACCESS_KEY_AWS,
      secretAccessKey:process.env.ACESS_VALUE_AWS
    })
  }


  getHello(): string {
    return 'Hello World!';
  }



  public async upload(file:any){
    const urlKey=`filepath/${file.name}`
    const params={
      Body:file.buffer,
      Bucket:process.env.BUCKET_NAME,
      Key:urlKey
    }
    const data=await this.s3.putObject(params).promise().then(
      data=>{
        return urlKey
      },
      err=>{
        return err;
      }
    )
    return data
  }

  
}
