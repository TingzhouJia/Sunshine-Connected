import { Flexbox } from "../../style"
import React, { useState, useEffect } from "react"
import {Editor} from '@tinymce/tinymce-react'
import { Button, message, Modal } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState, createDraft, createAnswer, updateAnswer } from "../../redux"
import { useHistory, useParams, useLocation } from "react-router"
import { ExclamationCircleOutlined } from "@ant-design/icons"

const { confirm } = Modal;
export const AnswerEditor:React.FC<{selected:Partial<Answer>}>=({selected})=>{
    const [content,setContent]=useState(selected.content?selected.content:'')
    const [saved, setsaved] = useState(false)
    const dispatch=useDispatch()
    
    const route=useHistory()
    const param=useLocation()
  
    const makesureLeave=()=>{
        confirm({
            title: 'Do you Want to leave page without save it?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                setsaved(true)
              route.goBack()
            },
            onCancel() {
             
            },
          });
    }
    useEffect(() => {
        
        return route.listen((localtion)=>{
            if(!saved){
                route.block('')
                makesureLeave()
            }
        })
    }, [route])
    const handleEditorChange = (content: any, editor: any) => {
        setContent(content)
        console.log('Content was updated:', content);
      }
    
      const handleSave=()=>{
          if(content===''){
              message.error('no answer provided!')
              return
          }
            const answer:Partial<Answer>={
                ...selected,
                content
               

            }
            setsaved(true)
        param.pathname==='/answers/edit'? dispatch(createDraft(answer)):(selected._id?dispatch(updateAnswer(selected._id,answer)):'')
            route.goBack()
      }
      const handleReply=()=>{
        if(content===''){
            message.error('no answer provided!')
            return
        }
        const answer:Partial<Answer>={
            ...selected,
            content,
           

        }
        setsaved(true)
        dispatch(createAnswer(answer))
        route.goBack()
      }
    return <Flexbox direction="column" just="flex-start" align="space-between" h="90%" >
            <Editor apiKey={process.env.REACT_APP_EDITOR_KEY} init={{
                height:"80%",
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
            }}
            inline={false}
            initialValue={content}
            onEditorChange={(content,editor)=>handleEditorChange(content,editor)}
            >
            </Editor>
            <Flexbox direction="row" just="flex-end" align="center" h="10%">
                    <Flexbox direction="row" w="50%" just="space-between" align="center"> 
                        <Button onClick={handleSave} style={{background:"#61BAFD",color:"white"}}>Save</Button>
                        <Button onClick={handleReply} type="primary">Reply Question</Button>
                    </Flexbox>
            </Flexbox>
    </Flexbox>
} 