import { RadiusBoard, Flexbox, Span } from "../../style"
import React, { useState, useReducer } from "react"
import { useFormik } from 'formik'
import { Input, Upload, message, Select, Button, Skeleton, Space } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
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
    const [video, setvideo] = useState(curVideo)

    const handleSubmit = (values: source) => {
        const { video, category, cover, title } = values
        if (video === '' || cover === '' || title === '' || category.length == 0) {
            message.error('you cannot submit video with blank fields')
            return;
        } else {

            callback()
        }
    }
    const reducer = (state: any, action: { type: 'load' } | { type: 'finish-source', source: any } | { type: 'finish-cover', cover: any }) => {
        switch (action.type) {
            case "load":
                return { ...state, loading: true }
            case "finish-source":
                return { ...state, source: action.source, loading: false }
            case "finish-cover":
                return { ...state, loading: false, cover: action.cover }
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

    const reviseVideo = () => {

    }
    const uploadButton = (
        <Flexbox w="10vw" h="10vw" direction="column" just="center" align="space-evenly">
            <input type="file" onChange={handleCoverUpload} />
            {Imgstate.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <Span color="black" size="1.5rem">Upload</Span>
        </Flexbox>
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

    return <RadiusBoard w="73vw" h="71vh">


        <Skeleton loading={loading} paragraph={{ rows: 6 }}>
            <Flexbox direction="column" just="space-between" align="space-between">
                <Flexbox direction="row" just="space-between" align="center" h="50vh">
                    <RadiusBoard h="100%" w="35vw">

                    </RadiusBoard>
                    <Flexbox w="35vw" direction="column" just="flex-start" align="flex-start">
                        <Flexbox direction="row" just="space-between" align="center" h="5vh">
                            <Space direction="horizontal">
                                <Span color="black">Title:</Span>
                                <Input width="" placeholder="title name for video" id="name" onChange={(e) => formik.handleChange(e)}></Input>
                            </Space>
                        </Flexbox>
                        <Flexbox direction="row" just="space-between" align="flex-start" h="20vh" >
                            <Space direction="horizontal" >
                                <Span color="black">Cover:</Span>

                                {Imgstate.cover !== "" ? <img src={Imgstate.cover} alt="video cover" style={{ width: '10vw', height: "10vw", objectFit: "contain" }} /> : uploadButton}

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
}