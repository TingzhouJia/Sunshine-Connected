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