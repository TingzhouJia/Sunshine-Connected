import { Wrapper, Flexbox } from "../../style"
import React from "react"
import { HeaderBread } from "../../components/global"
import { AuditTable } from "../../components/Audit"
import { useSelector } from "react-redux"
import { RootState } from "../../redux"
import { Skeleton } from "antd"


export const AuditPage:React.FC=()=>{
    const {loading,auditList}=useSelector((state:RootState)=>state.audit)
    return <Wrapper>
        <HeaderBread/>
        <Flexbox direction="column" just="center" align="center" h="85vh" w="100%">
           <Skeleton active loading={loading} paragraph={{rows:7}}>
            {
                auditList? <AuditTable source={auditList}/>:<></>
            }
           </Skeleton>
        </Flexbox>
    </Wrapper>
}