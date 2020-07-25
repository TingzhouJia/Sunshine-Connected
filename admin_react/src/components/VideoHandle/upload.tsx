import { RadiusBoard, Flexbox, Span } from "../../style"
import React, { useState, useReducer } from "react"
import { useFormik } from 'formik'
import { Input, Upload, message, Select, Button, Skeleton } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { RootState } from "../../redux"

interface source {
    video: string,
    cover: string,
    title: string,
    category: string[]
}

export const UploadPage:React.FC<{callback:()=>void}> = ({callback}) => {
    const {loading,curVideo}=useSelector((state:RootState)=>state.video)
    const [video, setvideo] = useState(curVideo)
    const handleSubmit = (values: source) => {
        const {video,category,cover,title}=values
        if(video===''||cover===''||title===''||category.length==0){
            message.error('you cannot submit video with blank fields')
            return;
        }else{
            
            callback()
        }
    }
    const reducer = (state: any, action: { type: 'load' } | { type: 'finish-source', source: any }|{type:'finish-cover',cover:any}) => {
        switch (action.type) {
            case "load":
                return { ...state, loading: true }
            case "finish-source":
                return {...state, source: action.source, loading: false }
            case "finish-cover":
                return { ...state,loading:false,cover:action.cover}
        }
    }
    function getBase64(img: any, callback: any) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const [Imgstate, dispatchImg] = useReducer(reducer, { source: '', loading: false,cover:'' })
    const handleCoverUpload = (info: any) => {
        if (info.file.status === 'uploading') {
            dispatchImg({ type: 'load' })
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl: any) => {
                dispatchImg({ type: 'finish-cover', cover: imageUrl })

                formik.setValues({ ...formik.values, cover: imageUrl })
            }

            );
        }

    }

    const reviseVideo=()=>{

    }
    const uploadButton = (
        <div>
            {Imgstate.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <Span color="black" size="1.5rem">Upload</Span>
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
    function beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    return <RadiusBoard w="73vw" h="71vh">

     <Skeleton loading={loading} paragraph={{rows:6}}>
     <Flexbox direction="column" just="space-between" align="space-between">
            <Flexbox direction="row" just="space-between" align="center" h="50vh">
                <RadiusBoard h="100%" w="35vw">

                </RadiusBoard>
                <Flexbox w="37vw" direction="column" just="flex-start" align="flex-start">
                    <Flexbox direction="row" just="space-between" align="center" h="5vh">
                        <Span color="black">Title:</Span>
                        <Input placeholder="title name for video" id="name" onChange={(e) => formik.handleChange(e)}></Input>
                    </Flexbox>
                    <Flexbox direction="row" just="space-between" align="flex-start" h="20vh" >
                        <Span color="black">Cover:</Span>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            style={{
                                width: "70%",
                                height: "100%"
                            }}
                            showUploadList={false}
                            action={`${process.env.REACT_APP_TEST_URL}/upload`}
                            beforeUpload={beforeUpload}
                            onChange={info => handleCoverUpload(info)}
                        >
                            {Imgstate.cover ? <img src={Imgstate.cover} alt="video cover" style={{ width: '100%', objectFit: "contain" }} /> : uploadButton}
                        </Upload>

                    </Flexbox>
                    <Flexbox direction="column" just="flex-start" align="space-between" h="15vw">
                        <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" onChange={(values) => handleSelect(values)}>
                            <Select.Option value="technology">Technology</Select.Option>
                            <Select.Option value="life">Life Style</Select.Option>
                            <Select.Option value="arts">Arts</Select.Option>
                        </Select>
                    </Flexbox>
                </Flexbox>
            </Flexbox>
            <Flexbox direction="row" just={Imgstate.source===''?"space-between":"flex-end"} align="center" h="8vh">
                {
                    Imgstate.cover===''?<></>:<Button danger><Span color="red">Remove Video</Span></Button>
                }
                <Button onClick={()=>handleSubmit(formik.values)} type="primary"><Span color="black">Submit</Span></Button>
            </Flexbox>
        </Flexbox>
     </Skeleton>

    </RadiusBoard >
}