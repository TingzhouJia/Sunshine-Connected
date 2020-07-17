import styled from "styled-components"
import { Skeleton, Space } from "antd"


const SkeletonBox=styled.div`
    display:flex;
    width:20vw;
    min-height:30vh;
    border-radius:5px;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    background-color:#ededed;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap
    padding:1vw,2vh;
    align-items:center;
    justify-content:space-between
    margin:2vw,2vh;
    box-shadow: 2px 2px 15px #AAAAAA;
    @media (max-width:875px) {
        width:35vw;

    }
    @media (max-width:565px) {
        width:75vw
    }
`

const WrapFlex=styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;

    @media (max-width: 565px){
        flex-direction:column
    }
`

export const PollSkeleton=()=>{

    const SkeletonCard=()=>(
        <SkeletonBox>
            <Space size="large" direction="vertical">
            <Skeleton.Avatar size='large' shape='circle' active  />
            <Skeleton title active />
            <Skeleton active/>
            <Skeleton.Button active />
            </Space>
        </SkeletonBox>
    )
    const a=[1,2,4,5,6]
    return (
        a.map((val)=>(
            <SkeletonCard></SkeletonCard>
        ))
    )


}