import { Flexbox, Span } from "../../style"
import React, { useEffect } from 'react'
import { List } from 'react-virtualized'
import { Space, Button, message, Spin, Empty } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { fetchOneAnswer, deleteAnswer, RootState, fetchDraftList } from "../../redux"
import { useHistory } from "react-router"
export const DraftList: React.FC = () => {


    const dispatch=useDispatch()
    const {draftList,loading}=useSelector((state:RootState)=>state.answer)
    useEffect(() => {
        
       if(!draftList){
           dispatch(fetchDraftList(''))
       }
    }, [dispatch,draftList])
    const router = useHistory()
    const handleEdit = (target: Partial<Answer>) => {
        dispatch(fetchOneAnswer(target))
        router.replace('/answers/edit')
    }

    const handleDelete = (id?: string) => {
        if (id) {
            dispatch(deleteAnswer(id))
            message.info('delete successed')
        }
    }
    function rowRenderer({
        key,
        index,
        isScrolling,
        isVisible,
        style,
    }: { key: string, index: number, isScrolling: boolean, isVisible: boolean, style: any }) {
        let content: Partial<Answer> = draftList?draftList[index]:{}
        return (
            <div key={key} style={{ ...style, borderRadius: "5px", boxShadow: "4px 4px 12px #ddd", padding: "1vw" }}>
                <Flexbox w="50vw" h="20vh" direction="row" just="flex-start" align="space-between">
                    <img width="25vw" height="15vh" style={{ objectFit: 'contain' }} />
                    <Flexbox w="23vw" direction="column" just="flex-start" align="space-between">
                        <Flexbox h="70%" direction="column" just="flex-start" align="space-between">
                            <Span weight="600" w="100%" color="black">{content.content}</Span>

                            <Span weight="500" color="#eee">Last Edit:{content.updatedAt}</Span>
                        </Flexbox>
                        <Space direction="horizontal">
                            <Button onClick={() => handleEdit(content)} color="black" type="primary">Edit</Button>
                            <Button onClick={() => handleDelete(content._id)} danger>Delete</Button>
                        </Space>
                    </Flexbox>
                </Flexbox>
            </div>
        );
    }
    return <Spin spinning={loading}>
        <Flexbox h="60vh" direction="column" just="flex-start" align="flex-start">
            <Span weight="700" size="1.4rem" color="black">Draft Box</Span>
            {
               draftList&&draftList.length > 0 ? (<List
                    width={window.innerWidth * 0.65}
                    height={window.innerHeight * 0.65}
                    rowCount={draftList.length}
                    rowHeight={window.innerHeight * 0.2}
                    rowRenderer={rowRenderer}
                />) : <Empty
                        image={`${process.env.PUBLIC_URL}/empty.png`}
                        imageStyle={{
                            width: "20vw",
                            objectFit:"contain"
                        }}
                        description={
                            <span>
                               You don't have any draft
                            </span>
                        }
                    />
            }


        </Flexbox>
    </Spin>
}