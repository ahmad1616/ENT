import { useEffect, useContext } from "react"
import { SignedContext } from "../../pages/_app"

export default function ProfileImage() {
    let { signedData, setSignedData } = useContext(SignedContext)
    useEffect(()=>{
        console.log('imagesrc: '+signedData)
    },[signedData])
    return <>
        <img style={{ width: '2.5rem', height: '2.5rem', color: 'white', display: 'flex', alignItems: 'center', color: 'white', backgroundColor: 'var(--normalblue)', borderRadius: '50%', fontWeight: 'bold', justifyContent: 'center' }} alt={signedData.name.length > 0 ? signedData.name[0].toUpperCase() : null} src={`data:image/jpeg;base64,${signedData.profileImageBase64}`} />
    </>
}