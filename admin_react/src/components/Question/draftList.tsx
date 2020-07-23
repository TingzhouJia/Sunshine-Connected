import { Flexbox, Span } from "../../style"
import React from 'react'
import {List} from 'react-virtualized'
import { Space, Button } from "antd"
export const DraftList=()=>{
    const list:Partial<Answer>[] =[]
    function rowRenderer({
        key,
        index, 
        isScrolling, 
        isVisible, 
        style, 
      }:{key:string,index:number,isScrolling:boolean,isVisible:boolean,style:any}) {
          let content:Partial<Answer>=list[index]
        return (
          <div key={key} style={{...style,borderRadius:"5px", boxShadow:"4px 4px 12px #ddd",padding:"1vw"}}>
              <Flexbox w="50vw" h="20vh" direction="row" just="flex-start" align="space-between">
                    <img width="25vw" height="15vh" style={{objectFit:'contain'}}/>
                    <Flexbox w="23vw" direction="column" just="flex-start" align="space-between">
                        <Flexbox h="70%" direction="column" just="flex-start" align="space-between">
                            <Span weight="600" w="100%" color="black">{content.content}</Span>
                           
                        <Span weight="500" color="#eee">Last Edit:{content.updatedAt}</Span>
                        </Flexbox>
                        <Space direction="horizontal">
                            <Button color="black" type="primary">Edit</Button>
                            <Button danger>Delete</Button>
                        </Space>
                    </Flexbox>
              </Flexbox>
          </div>
        );
      } 
    return <Flexbox h="60vh" direction="column" just="flex-start" align="flex-start">
            <Span weight="700" size="1.4rem" color="black">Draft Box</Span>
            <List
            width={window.innerWidth*0.65}
            height={window.innerHeight*0.65}
            rowCount={list.length}
            rowHeight={window.innerHeight*0.2}
            rowRenderer={rowRenderer}
            >
                
            </List>
    </Flexbox>
}