import { useRouter } from "next/router"
import Task from "./components/task"
import { useState, useEffect } from "react"
export default function NestedLayout({children}){
    let router = useRouter()
    let [route, setRoute] = useState('')
    useEffect(()=>{
        setRoute(router.pathname)
    },[router])
    return <>{children}
    <div style={{backgroundColor:'rgba(255,255,255,0.25)',position:'absolute',width:'100vw',boxSizing:'border-box',right:0,bottom:0,display:route.includes('verify')?'none':'flex',flexDirection:'row',justifyContent:'space-evenly',padding:'2.5% 10%'}}>
        <Task color={route.includes('center')||route.includes('doctor')||route.includes('sign')?'var(--normalblue)':'var(--grey)'} />
        <hr style={{color:'var(--normalblue)',backgroundColor:route.includes('doctor')||route.includes('sign')?'var(--lightyellow)':'var(--grey)',border:0,width:'30vw',fontSize:'15px',height:'0.3vh'}}/>
        <Task color={route.includes('doctor')||route.includes('sign')?'var(--normalblue)':'var(--grey)'}/>
        <hr style={{color:'var(--normalblue)',backgroundColor:route.includes('sign')?'var(--lightyellow)':'var(--grey)',border:0,width:'30vw',fontSize:'15px',height:'0.3vh'}}/>
        <Task color={route.includes('sign')?'var(--normalblue)':'var(--grey)'}/>
    </div></>
}