import { RadiusBoard, Flexbox, Span } from "../../style"
import React, { useState } from "react"
import { useFormik } from 'formik'
import { Input, Upload } from "antd"

interface source {
    video: string,
    cover: string,
    title: string,
    category: string[]
}
export const UploadPage = () => {
    const handleSubmit = (values: source) => {

    }

    const [status, setStatus] = useState('no')
    const handleVideoUpload = () => {

    }
    const formik = useFormik({
        initialValues: {
            video: '', cover: '', title: '', category: []
        },
        onSubmit: values => {

        }
    })
    return <RadiusBoard w="73vw" h="71vh">

        <Flexbox direction="row" just="space-between" align="center" h="50vh">
            <RadiusBoard h="100%" w="35vw">


            </RadiusBoard>
            <Flexbox w="37vw" direction="column" just="flex-start" align="flex-start">
                <Flexbox direction="row" just="space-between" align="center" h="5vh">
                    <Span>Title:</Span>
                    <Input placeholder="title name for video" id="name" onChange={(e) => formik.handleChange(e)}></Input>
                </Flexbox>
                <Flexbox direction="row" just="space-between" align="center" >
                    <Span>Cover:</Span>
                    <Upload>
                      
                    </Upload>




                </Flexbox>
            </Flexbox>
        </Flexbox>

    </RadiusBoard >
}