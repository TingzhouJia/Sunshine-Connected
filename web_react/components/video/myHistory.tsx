import { I18nPage, includeDefaultNamespaces } from "../../i18n";
import { AppLayout } from "../../layout";




export const MyHistory:I18nPage=()=>{
    return <AppLayout showSide={true}>

    </AppLayout>
}

MyHistory.getInitialProps=async ()=>{

    return {
        namespacesRequired:includeDefaultNamespaces(['myHistory'])
    }
}