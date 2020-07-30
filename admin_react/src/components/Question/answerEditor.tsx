import { Flexbox } from "../../style"
import React, { useState, useEffect } from "react"
import {Editor} from '@tinymce/tinymce-react'
import { Button, message, Modal } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState, createDraft, createAnswer, updateAnswer, turnDtoA } from "../../redux"
import { useHistory, useParams, useLocation, Prompt } from "react-router"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Answer, Question } from "../../model"


const { confirm } = Modal;

export const AnswerEditor:React.FC<{resource:Partial<Question>|undefined,an:Partial<Answer>|undefined}>=({resource,an})=>{
    

    const param=useLocation()
    const createdOrEdit=param.pathname==="/workshop/answers/create"
    const [content,setContent]=useState(createdOrEdit?'':an?.content)
    const [saved, setsaved] = useState(false)
    const dispatch=useDispatch()
    
    const route=useHistory()
    const location=useLocation()
    const makesureLeave=()=>{
      confirm({
          title: 'Do you Want to leave page without save it?',
          icon: <ExclamationCircleOutlined />,
          content: 'Some descriptions',
          onOk() {
            setsaved(true)
           route.block(true)
           route.goBack()
           return
          },
          onCancel() {
           
          },
        });
  }
    useEffect(() => {
     
        route.block(false)
        if(saved){
          route.block(true)
        }
        route.listen((location)=>{
        if(location.pathname==="/workshop/answers/create"){
          makesureLeave()
        }
        })
     
    }, [])

    const handleEditorChange = (content: string, editor: any) => {
        setContent(content)
      
      }
    
      const handleSave=()=>{
          if(content===''){
              message.error('no answer provided!')
              return
          }
            let answer:Partial<Answer>={}
            setsaved(true)
            if(createdOrEdit){
                answer={question_id:resource?.id,content,isDraft:true}
                dispatch(createDraft(answer))
            }else{
               
                if(an&&an._id){
                    answer={...an,content}
                    dispatch(updateAnswer(an._id,answer))
                }
            }
          
         
            message.success('save answer success')
            route.goBack()
      }
      const handleReply=()=>{
        if(content===''){
            message.error('no answer provided!')
            return
        }
        let answer:Partial<Answer>={}
        setsaved(true)
       if(createdOrEdit){
        answer={question_id:resource?.id,content,isDraft:false}
        dispatch(createAnswer(answer))
           
       }else{
        if(an&&an._id){
            answer={...an,content,isDraft:false}
            dispatch(turnDtoA(an._id,answer))
        }
       
       }
       message.success('answer question success')
        route.goBack()
      }
    return <Flexbox direction="column" just="flex-start" align="space-between" h="90%" >
      <Prompt when={false} message="Are sure to leave without save answer?" />

      
            <Editor apiKey={process.env.REACT_APP_EDITOR_KEY} init={{
                height:"60vh",
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
            <Flexbox direction="row" just="flex-end" align="center" h="20%">
                    <Flexbox direction="row" w="30%" just="space-between" align="center"> 
                        <Button onClick={handleSave} style={{background:"#61BAFD",color:"white"}}>Save</Button>
                        <Button onClick={handleReply} type="primary">Reply Question</Button>
                    </Flexbox>
            </Flexbox>
    </Flexbox>
} 