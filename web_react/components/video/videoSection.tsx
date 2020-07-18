import { Card, Avatar, Space } from "antd"
import styled from "styled-components"
import { Span } from "../../layout"

const ContentBox=styled.div`
    width:100%;
    

    overflow:hidden;
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
   
    align-items:flex-start;
`
export const VideoSection:React.FC=()=>{
    return (
        <Card hoverable style={{width:"23vw",margin:"5vw !important",height:"25vh !important"}} cover={<img style={{"height":"20vh",width:"100%",objectFit:"cover"}}   alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
               <ContentBox>
                <Avatar  size={45}/>
                 <div style={{display:"flex",flexDirection:"column",paddingLeft:"1vw",overflow:"hidden"}}>
                    <Span width="80%" weight="700" types="nav_title">The Zoom msmvm dncjs njcdan d</Span>
                    <Span>Xu Jiaying</Span>
                    <Span colors="grey" weight="600" types="sub_titles">98M viewed | 2hours ago</Span>
                </div>
                
               </ContentBox>
        </Card>
    )
}