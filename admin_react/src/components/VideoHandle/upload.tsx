import { RadiusBoard, Flexbox, Span } from "../../style"
import React, { useState, useReducer, createRef, useRef } from "react"
import { useFormik } from 'formik'
import { Input, message, Select, Button, Skeleton, Space } from "antd"
import { LoadingOutlined, PlusOutlined, RestOutlined, ToTopOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { RootState } from "../../redux"

interface source {
    video: string,
    cover: string,
    title: string,
    category: string[]
}

export const UploadPage: React.FC<{ callback: () => void }> = ({ callback }) => {
    const { loading, curVideo } = useSelector((state: RootState) => state.video)
    const inputref=useRef<HTMLInputElement>(null)

    const handleSubmit = (values: source) => {
        const { video, category, cover, title } = values
        if (video === '' || cover === '' || title === '' || category.length == 0) {
            message.error('you cannot submit video with blank fields')
            return;
        } else {

            callback()
        }
    }
    const reducer = (state: any,
        action: { type: 'load' } | { type: 'finish-source', source: any }
            | { type: 'finish-cover', cover: any } | { type: 'clean-cover' } | { type: 'clean-video' }) => {
        switch (action.type) {
            case "load":
                return { ...state, loading: true }
            case "finish-source":
                return { ...state, source: action.source, loading: false }
            case "finish-cover":
                return { ...state, loading: false, cover: action.cover }
            case 'clean-cover':
                return { ...state, cover: '' }
            case 'clean-video':
                return { ...state, source: '' }
        }
    }

    const [Imgstate, dispatchImg] = useReducer(reducer, { source: '', loading: false, cover: '' })
    const handleCoverUpload = (e: any) => {
        let reader = new FileReader();
        let file = e.target.files[0]
        reader.onload = () => {
            dispatchImg({ type: 'finish-cover', cover: reader.result })
        }
        reader.readAsDataURL(file)


    }
    const list=(<input type="file" onChange={handleCoverUpload} ref={inputref} style={{display:"none"}} />)
    const reviseVideo = () => {

    }
    const uploadButton = (
        <div style={{cursor:"pointer"}}>
            <Flexbox w="10vw" h="10vw" direction="column" just="center" align="center" onClick={()=>{
            if(inputref!==null&&inputref.current!==null){
                inputref.current.click()
            }
        }}>
            {list}
            <ToTopOutlined  style={{color:"#F1C331",fontSize:"1.5rem"}}/>
            <Span color="black" size="1.1rem">Upload</Span>
        </Flexbox>
        </div>
    );
    const formik = useFormik<{ video: string, cover: string, title: string, category: string[] }>({
        initialValues: {
            video: '', cover: '', title: '', category: []
        },
        onSubmit: values => {
        }
    })

    const handleSelect = (values: any) => {
        console.log(values)
        formik.setValues({ ...formik.values, category: values })
    }

    return (
        <RadiusBoard w="73vw" h="71vh">
        <Skeleton loading={loading} paragraph={{ rows: 6 }}>
            <Flexbox direction="column" just="space-between" align="space-between">
                <Flexbox direction="row" just="space-between" align="flex-start" h="50vh">
                    <div style={{width:"35vw",height:"45vh",borderRadius:"5px",border:"1px dashed #979797",display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <img width="50%" height="50%" src={`${process.env.PUBLIC_URL}/upload.jpg`}/>
                        <Button type="primary" color="black">Upload Video</Button>
                    </div>
                    <Flexbox w="35vw" direction="column" just="flex-start" align="flex-start">
                        <Flexbox direction="row" just="flex-start" align="center" h="5vh">
                         
                                <Span color="black">Title: </Span>
                                <Input style={{width:"30vw"}} placeholder="Title name for video" id="name" onChange={(e) => formik.handleChange(e)}></Input>
                           
                        </Flexbox>
                        <Flexbox direction="row" just="space-between" align="flex-start" h="20vh" >
                            <Space direction="horizontal" >
                                <Span color="black">Cover:</Span>

                                {Imgstate.cover !== "" ?
                                    <>
                                        <img src={Imgstate.cover} alt="video cover" style={{ width: '10vw', height: "10vw", objectFit: "contain" }} />
                                        <RestOutlined onClick={() => dispatchImg({ type: 'clean-cover' })} />
                                    </>
                                    : uploadButton}

                            </Space>

                        </Flexbox>
                        <Flexbox direction="column" just="flex-start" align="space-between" h="15vw">
                            <Span>
                                Categories:
                        </Span>
                            <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" onChange={(values) => handleSelect(values)}>
                                <Select.Option value="technology">Technology</Select.Option>
                                <Select.Option value="life">Life Style</Select.Option>
                                <Select.Option value="arts">Arts</Select.Option>
                            </Select>
                        </Flexbox>
                    </Flexbox>
                </Flexbox>
                <Flexbox direction="row" just={Imgstate.source === '' ? "space-between" : "flex-end"} align="center" h="8vh">
                    {
                        Imgstate.cover === '' ? <></> : <Button danger><Span color="red">Remove Video</Span></Button>
                    }
                    <Button onClick={() => handleSubmit(formik.values)} type="primary"><Span color="black">Submit</Span></Button>
                </Flexbox>
            </Flexbox>
        </Skeleton>
    </RadiusBoard >
    )

}