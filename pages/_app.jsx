import Layout from '../src/components/layout'
import '../public/styles/global.css' 
import '../public/styles/queries/portrait.css'
import '../public/styles/queries/landscape.css'
import '@mantine/core/styles.css' 
import Loading from '../src/components/loading'
import { MantineProvider , createTheme} from "@mantine/core";
import { useEffect,useState,createContext } from 'react'

export let SignedContext = createContext()

export default function app({ Component, pageProps }) {
    const [loading,setLoading] = useState(true)
    const [signedData,setSignedData] = useState({name:"",profileImage:"",profileImageBase64:"",specialization:"",usertype:"",sessionID:""})
    useEffect(()=>{
        async function getSessionData(){
            let cookie = document.cookie
            let sessionID = cookie.slice(10)
            console.log(sessionID)
            if(sessionID!=""){
                try{
                    let res = await fetch('/api/signin',{
                        method: 'POST', mode: 'cors',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({sessionID:sessionID})
                    })
                    let res2 = await res.json()
                    console.log(res2.user)
                    if(res2.user){
                        setSignedData(res2.user)    
                    }
                }
                catch(e){
                    console.error(e);
                }
                
            }
            setLoading(false)
        }
        getSessionData()
    },[])

    const getLayout = Component.getLayout
    const theme = createTheme({
        fontFamily:'cairo',
        other:{
            bodyColor:'var(--lightblue)'
        }
    }) 
    const resolver = (theme) => ({
        variables: {
            '--mantine-color-body':theme.other.bodyColor 
        },light: {
            '--mantine-color-body':theme.other.bodyColor
            
        },dark: {
            '--mantine-color-body':theme.other.bodyColor
        },
      });
    return<MantineProvider theme={theme} cssVariablesResolver={resolver}>
        <SignedContext.Provider value={{signedData,setSignedData}}>
        <Layout>
            <div style={{display:loading?'none':'block'}}>
            <Component {...pageProps}/>
            </div>
            <Loading loading={loading}/>
        </Layout>
        </SignedContext.Provider>
        </MantineProvider>
}