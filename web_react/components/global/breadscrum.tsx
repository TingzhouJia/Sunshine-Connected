import { Breadcrumb } from "antd"


export const BreadScrum:React.FC<{param:string}>=({param})=>{
    const stringList=param.split('/').map((each)=>each.toLocaleUpperCase)
    return (
        <Breadcrumb>

        </Breadcrumb>
    )
}