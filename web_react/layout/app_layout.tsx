import React, { useState } from "react"
import Header from "../components/Header"
import { Layout, ConfigProvider } from 'antd'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import { SideMenu } from "../components/Sider"
import PropTypes from 'prop-types'
export const fontSize = theme.variants('size', 'types', {
    span: {
        default: '100',
        median: '120',
        large: '150',
        xlarge: '170',
        grand: '200'
    },
    subSpan: {
        default: '80',
        median: '100',
        large: '120',
        xlarge: '140',
        grand: '160'
    },
    sSpan: {
        default: '60',
        median: '80',
        large: '100',
        xlarge: '120',
        grand: '140'
    },
    title: {
        default: "300",
        median: "320",
        large: "350",
        xlarge: "370",
        grand: "4000"
    },
    nav_title: {
        default: '120',
        median: "140",
        large: "160",
        xlarge: "180",
        grand: "200"
    }
})

export const FlexBox = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
   
`


export const NavTitle = styled.h1`
    font-size:${fontSize}%;
    font-weight:bolder
`

export const NavLink = styled.link`
    font-size:${fontSize}%;
`




export const Span = styled.span`
    font-size:${fontSize}% !important;
  

    font-weight:${(props: any) => props.weight || 500};
    color:${(props) => props.colors || 'black'};
    word-break:normal; 
    width:${(props)=>props.width||'auto'}; 
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    white-space:normal;
    word-wrap : break-word;
    overflow: hidden ;
    text-overflow: ellipsis;
`
Span.propTypes = {
    types: PropTypes.oneOf(['span', 'sSpan', 'subSpan', 'nav_title', "title"]),

}

Span.defaultProps = {
    types: "span"
}








export const AppLayout: React.FC<{ showSide: boolean }> = ({ children, showSide }) => {
    const [font, SetFont] = useState('default')
    return <React.Fragment>
        <ThemeProvider theme={{ size: font }}>

            <Layout>
                <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: "10vh" }} >
                    <Header showSider={showSide}  func={(val) => SetFont(val)} />

                </Layout.Header>
                <Layout>
                    {
                        showSide ? <>
                            <Layout.Sider width={"15vw"}

                                style={{ position: 'fixed', overflow: 'auto', left: 0, top: '10vh', height: "90vh", width: '15vw !important', background: "white !important" }}
                            >
                                <SideMenu />
                            </Layout.Sider>

                            <Layout style={{ width: "85vw !important", marginLeft: "15vw", marginTop: "10vh", padding: "1vw", background: "#eee" }}>
                                <Layout.Content  >
                                    {children}
                                </Layout.Content>

                            </Layout>

                        </> :
                            <Layout style={{width:"100vw",marginTop:"10vh"}}>
                                <Layout.Content  >
                                    {children}
                                </Layout.Content>
                            </Layout>
                    }
                </Layout>
            </Layout>

        </ThemeProvider>
    </React.Fragment>
}

