import { Flexbox } from "../../style"
import React, { useState, useEffect } from "react"
import {Editor} from '@tinymce/tinymce-react'
import { Button, message, Modal } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState, createDraft, createAnswer, updateAnswer, turnDtoA } from "../../redux"
import { useHistory, useParams, useLocation } from "react-router"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Answer } from "../../model"

const { confirm } = Modal;
export const AnswerEditor:React.FC=()=>{
    const {loading,selectedAnswer}=useSelector((state:RootState)=>state.answer)
    const [content,setContent]=useState(selectedAnswer?selectedAnswer.content:'')
    const [saved, setsaved] = useState(false)
    const dispatch=useDispatch()
    
    const route=useHistory()
    const param=useLocation()
  
    const makesureLeave=()=>{
        // confirm({
        //     title: 'Do you Want to leave page without save it?',
        //     icon: <ExclamationCircleOutlined />,
        //     content: 'Some descriptions',
        //     onOk() {
        //     setsaved(true)
        //       route.goBack()
        //     },
        //     onCancel() {
             
        //     },
        //   });
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
      
      }
    
      const handleSave=()=>{
          if(content===''){
              message.error('no answer provided!')
              return
          }
            const answer:Partial<Answer>={
                ...selectedAnswer,
                content
            }
            setsaved(true)
            if(param.pathname==='/workshop/answers/create'){
            
                dispatch(createDraft({...answer,isDraft:true}))
            }else{
                if(selectedAnswer&&selectedAnswer._id){
                    dispatch(updateAnswer(selectedAnswer._id,answer))
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
        const answer:Partial<Answer>={
            ...selectedAnswer,
            content,
           

        }
        setsaved(true)
       if(param.pathname==='/workshop/answers/edit'){
        if(selectedAnswer&&selectedAnswer._id){
            dispatch(turnDtoA(selectedAnswer._id,answer))
        }
           
       }else{
        dispatch(createAnswer(answer))
       }
       message.success('answer question success')
        route.goBack()
      }
    return <Flexbox direction="column" just="flex-start" align="space-between" h="90%" >
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