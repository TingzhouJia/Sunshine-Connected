import { RadiusBoard, Flexbox, Span } from "../../style"
import React, { useState, useReducer, createRef, useRef } from "react"
import { useFormik } from 'formik'
import { Input, message, Select, Button, Skeleton, Space, Modal } from "antd"
import { LoadingOutlined, PlusOutlined, RestOutlined, ToTopOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { RootState } from "../../redux"
import PlayerContainer from 'griffith'
import { Video } from "../../model"
import axios from "axios"
const { confirm } = Modal;
interface source {
    video: string,
    cover: string,
    title: string,
    category: string[],
    format: string
}

export const UploadPage: React.FC<{ callback: () => void, video?: Partial<Video> }> = ({ callback, video }) => {
    const { loading } = useSelector((state: RootState) => state.video)
    const inputref = useRef<HTMLInputElement>(null)
    const videoRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (values: source) => {
        const { video, category, cover, title, format } = values
        if (video === '' || cover === '' || title === '' || category.length == 0) {
            message.error('you cannot submit video with blank fields')
            return;
        } else {

            callback()
        }
    }
    const reducer = (state: any,
        action: { type: 'load' } | { type: 'finish-source', source: any, format: any }
            | { type: 'finish-cover', cover: any } | { type: 'clean-cover' } | { type: 'clean-video' }) => {
        switch (action.type) {
            case "load":
                return { ...state, loading: true }
            case "finish-source":
                return { ...state, source: action.source, loading: false, format: action.format }
            case "finish-cover":
                return { ...state, loading: false, cover: action.cover }
            case 'clean-cover':
                return { ...state, cover: '' }
            case 'clean-video':
                return { ...state, source: '', format: '' }
        }
    }
    function showConfirm() {
        confirm({
            title: 'Do you want to replace content?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
                if (inputref !== null && inputref.current !== null) {
                    inputref.current.click()
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const initState = video ? { source: video.file, loading: false, cover: video.cover, format: video.format }
     : { source: '', loading: false, cover: '', format: '' }
    const [Imgstate, dispatchImg] = useReducer(reducer, initState)
    const handleCoverUpload = (e: any) => {
        dispatchImg({ type: "load" })
        let reader = new FileReader();
        let file = e.target.files[0]
        let boo = beforeview(file)
       
        if (boo) {
            const d=new FormData()
            d.append('file',file,file.name)
            axios.post('http://localhost:3009/upload',d).then((val)=>{
                console.log(val)
                dispatchImg({ type: 'finish-cover', cover: val.data})
                console.log(Imgstate.cover)
            }

            )
            // reader.onload = () => {
            //     dispatchImg({ type: 'finish-cover', cover: reader.result })
            // }
            // reader.readAsDataURL(file)


        }
        return
    }
    const beforeview = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false
        }
        return true
    }
    const beforeVideo = (file: any) => {
        const isVaild = file.type === 'video/mp4'
        if (!isVaild) {
            message.error('Sorry, we only support mp4 source file!')
            return false
        }
        return true
    }
    const list = (<input type="file" onChange={handleCoverUpload} ref={inputref} style={{ display: "none" }} />)

    const reviseVideo = (e: any) => {
        let reader = new FileReader();
        let file: File = e.target.files[0]
        let boo = beforeVideo(file)
        if (boo) {
            reader.onload = (e: any) => {
                dispatchImg({ type: 'finish-source', source: reader.result, format: file.type })
            }
            reader.readAsDataURL(file)
        }
        return


    }
    const uploadButton = (
        <div style={{ cursor: "pointer", border: "2px dashed #eee"}}>
            <Flexbox w="10vw" h="10vw" direction="column" just="center" align="center" onClick={Imgstate.cover===''?()=>{
                     if (inputref && inputref.current) {
                        inputref.current.click()
                    }   
            }:showConfirm}>
                {list}
                <ToTopOutlined style={{ color: "#F1C331", fontSize: "1.5rem" }} />
                <Span color="black" size="1.1rem">Upload</Span>
            </Flexbox>
        </div>
    );
    const formik = useFormik<{ video: string, cover: string, title: string, category: string[], format: string }>({
        initialValues: {
            video: '', cover: '', title: '', category: [], format: ''
        },
        onSubmit: values => {
        }
    })

    const handleSelect = (values: any) => {

        formik.setValues({ ...formik.values, category: values })
    }
    const grifPlayer = (url: any, format: string, cover: string, title: string) => {
        let source = {
            id: 'preview',
            title,
            cover,
            src: url,
            duration: 182,
            error: { message: 'aaa' },
            sources: {
                sd: {
                    bitrate: 2005,
                    size: 46723282,
                    duration: 182,
                    width: 1280,
                    height: 720,
                    play_url: url,
                    format
                },
                ld: {
                    bitrate: 2005,
                    size: 46723282,
                    duration: 182,
                    width: 1280,
                    height: 720,
                    play_url: url,
                    format
                }, hd: {

                    bitrate: 2005,
                    size: 46723282,
                    duration: 182,
                    width: 1280,
                    height: 720,
                    play_url: url,
                    format

                }
            }

        }
        return (
            <PlayerContainer initialObjectFit="contain" {...source} >

            </PlayerContainer>
        )
    }

    const handleRemoveVideo = () => {
        dispatchImg({ type: "clean-video" })
    }
    return (
        <RadiusBoard w="73vw" h="71vh">
            <Skeleton loading={loading} paragraph={{ rows: 6 }}>
                <Flexbox direction="column" just="space-between" align="space-between">
                    <Flexbox direction="row" just="space-between" align="flex-start" h="50vh">
                        {
                            Imgstate.source == "" ? (
                                <div style={{ width: "35vw", height: "45vh", borderRadius: "5px", border: "1px dashed #979797", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <img width="50%" height="50%" src={`${process.env.PUBLIC_URL}/upload.jpg`} />
                                    <input type="file" ref={videoRef} onChange={reviseVideo} style={{ display: "none" }} />
                                    <Button type="primary" onClick={() => {
                                        if (videoRef && videoRef.current) {
                                            videoRef.current.click()
                                        }
                                    }} color="black">Upload Video</Button>
                                </div>
                            ) : <div style={{ marginLeft: "1vw" }}>
                                    {
                                        <video controls width="450" height="300" >
                                            <source src={Imgstate.source} type={Imgstate.format}></source>
                                        </video>
                                    }
                                </div>
                        }
                        <Flexbox w="35vw" direction="column" just="flex-start" align="flex-start">
                            <Flexbox direction="row" just="flex-start" align="center" h="6vh">

                                <Span color="black">Title: </Span>
                                <Input style={{ width: "30vw" }} placeholder="Title name for video" id="name" onChange={(e) => formik.handleChange(e)}></Input>

                            </Flexbox>
                            <Flexbox direction="row" just="space-between" align="flex-start" h="21vh" >
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
                    <Flexbox direction="row" just={Imgstate.source !== '' ? "space-between" : "flex-end"} align="center" h="8vh" >
                        {
                            Imgstate.source === '' ? <></> : <Button onClick={handleRemoveVideo} danger><Span color="red">Remove Video</Span></Button>
                        }
                        <Button onClick={() => handleSubmit(formik.values)} type="primary"><Span color="black">Submit</Span></Button>
                    </Flexbox>
                </Flexbox>
            </Skeleton>
        </RadiusBoard >
    )

}