import Layout from "../../src/layout"
import NestedLayout from "../../src/nestedLayout"
import { Button } from "@mantine/core"
import { useRouter } from "next/router"

export default function Book(){
    let router = useRouter()
    return <div style={{display:'flex',flexDirection:'column',height:'40vh',justifyContent:'center',alignItems:'center'}}>
        <h1 style={{ color: 'var(--normalblue)' }}>احجز في ثلاث خطوات ! </h1>
        <Button color="var(--normalblue)" onClick={()=>{router.push('/book/choosecenter')}}>هنا</Button>
    </div>
}   

Book.getLayout = function getLayout(page){
    return <Layout><NestedLayout>{page}</NestedLayout></Layout>
}


