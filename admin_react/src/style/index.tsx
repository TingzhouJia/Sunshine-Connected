import styled from 'styled-components'
export const Flexbox=styled.div<{direction:string,just:string,align:string,w?:string,h?:string,extra?:string}>`
    display:flex;
    align-items:${props=>props.align};
    justify-content:${props=>props.just};
    flex-direction:${props=>props.direction};
    width:${props=>props.w||"100%"};
    height:${props=>props.h||"100%"};
    ${props=>props.extra};

`

export const Span=styled.span<{weight?:string,color?:string,size?:string}>`

    width:auto;
    font-weight:${props=>props.weight||500};
    color:${props=>props.color||"#F1C331"};
    font-size:${props=>props.size||"1rem"};


`


export const RadiusBoard=styled.div<{w:string,h:string}>`
    width:${props=>props.w};
    height:${props=>props.h};
    border-radius:20px;
    box-shadow: 4px 4px 11px #BEBBBB;
    padding:1vw;
`

export const Wrapper = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    padding-left:2vw;
    padding-bottom:1vw;
    justify-content: space-between;
    align-items:space-between;
`