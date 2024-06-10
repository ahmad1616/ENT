import Link from "next/link"
import { useRouter } from "next/router"
import { SignedContext } from "../../pages/_app"
import ProfileImage from "./profileImage"
import { useState, useEffect, useContext } from "react"
function Header() {
  let [aboutUsMenu, setAboutUsMenu] = useState(false)
  let [route, setRoute] = useState('')
  let [accountMenu, setAccountMenu] = useState(false)
  let [signOut,setSignOut] = useState(false)
  let router = useRouter()
  let { signedData, setSignedData } = useContext(SignedContext)
  useEffect(() => {
    setRoute(router.pathname)
  }, [router])
  useEffect(()=>{
    if(signOut){
      let res = fetch('/api/signout', {
        method: 'POST', mode: 'cors',
            headers: {
                'Content-type': 'application/json',
            },
        body: JSON.stringify({ sessionID:signedData.sessionID })
    })
      res.then((value)=>{
        let date = new Date()
        date.setMonth(date.getMonth()-1)
        let utcString = date.toUTCString()
        document.cookie = 'sessionID=; expires=' + utcString + ';path=/'
        setSignedData({ name: "", profileImage: "",profileImageBase64:"", specialization: "", usertype: "",sessionID:"" })    })
    }

  },[signOut])

  return (<header style={{ backgroundColor: 'white', zIndex: 3000, position: 'sticky', top: 0 }}>
    <div aria-description="upper header" style={{ display: 'flex', flexDirection: 'row', width: '100vw', padding: 0, justifyContent: 'space-between', background: 'var(--heavyblue)', height: route === '/' ? '8vh' : 0, transition: 'height 1s' }}>
      <div aria-description="busy part" style={{ width: '50vw', marginRight: '7.14vw', height: '100%', fontSize: '1vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href='/book' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: route === '/' ? '40%' : 0, transition: 'height 1s', background: 'var(--lightblue)', borderRadius: '0.4rem', padding: '0 1.5rem', color: 'var(--normalblue)', textDecoration: 'none' }}>
          <span style={{ color: 'var(--normalblue)', fontSize: route === '/' ? '1rem' : '0', transition: 'font-size 1s', fontWeight: 'bold' }}>احجز الأن</span>
        </Link>
        <span dir="ltr" style={{ color: 'white', fontWeight: 'bolder', fontSize: route === '/' ? '1rem' : '0', transition: 'font-size 0.5s' }}>0100 909 6060</span>
      </div>
    </div>
    <div aria-description="lower header" style={{ boxShadow: '0 1px 3px 0 var(--heavyblue)', color: 'var(--normalblue)', height: '11vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', fontSize: 'var(--fontSize1)', width: '100vw', padding: 0 }}>
      <Link href='/signin' style={{ color: 'var(--normalblue)', display: signedData.name.length == 0 ? 'block' : 'none' }}>تسجيل الدخول</Link>
      <div onMouseLeave={() => { setAccountMenu(false) }} style={{ display: signedData.name.length === 0 ? 'none' : 'flex', height: '100%', position: 'relative', alignItems: 'center', flexDirection: 'row' }}>
        <div onClick={() => { setAccountMenu(!accountMenu) }}><ProfileImage /></div>
        <img onClick={() => { setAccountMenu(!accountMenu) }} style={{ transform: accountMenu ? '' : 'rotate(90deg)', width: '0.75rem', margin: '0.75rem' }} src="/images/collapse.svg" />
        <div style={{position: 'absolute', transition: 'opacity 0.25s', display: accountMenu ? 'flex' : 'none',justifyContent:'center',alignItems:'center',borderRadius:'0.3rem', minHeight:'200%',width: '13vw',backgroundColor: 'white',top:'101%' }}>
          <ul style={{padding:'0',listStyleType: 'none',height:'100%'}}>
            <li className='accountList'>حسابي</li>
            <li className='accountList' onClick={() => {  setSignOut(true) }} style={{ color: 'red' }}>تسجيل الخروج</li>
          </ul>
        </div>
      </div>
      <nav style={{ width: '50vw', color: 'var(--normalblue)', fontSize: '1rem', fontWeight: "bolder", display: 'flex', justifyContent: 'space-between', height: '100%' }}>
        <Link href='/' className="navPages" style={{ color: 'var(--normalblue)', borderBottom: route === '/' ? 'var(--lightyellow) solid  4px' : 'none' }}>الصفحة الرئيسية</Link>
        <Link href='/book' className="navPages" style={{ color: 'var(--normalblue)', borderBottom: route.includes('/book') ? 'var(--lightyellow) solid  4px' : 'none' }}>الحجز الرقمي</Link>
        <Link href='/blog' className="navPages" style={{ color: 'var(--normalblue)', borderBottom: route.includes('/blog') ? 'var(--lightyellow) solid  4px' : 'none' }}>نصيحة طبيب</Link>
        <button onMouseLeave={() => { setAboutUsMenu(false) }} className="navPages" style={{ backgroundColor: 'white', border: 'none', position: 'relative', color: 'var(--normalblue)', borderBottom: route.includes('/founders') || route.includes('/doctors') ? 'var(--lightyellow) solid  4px' : 'none' }}><span onClick={() => { setAboutUsMenu(true) }}>من نحن</span>
          <div style={{ position: 'absolute', transition: 'opacity 0.25s', display: aboutUsMenu ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'space-evenly', paddingRight: '0.5rem', width: '10vw', height: '10vw', padding: '0 1rem', backgroundColor: 'white', top: '101%' }}>
            <Link href='/aboutus/founders' className="navPages" style={{ color: 'var(--normalblue)' }}>المؤسسين</Link>
            <Link href='/aboutus/doctors' className="navPages" style={{ color: 'var(--normalblue)' }}>الأطباء</Link></div></button>
      </nav>
      <Link href='/' style={{ height: '100%' }} ><img alt="logo" src='/images/logo.png' style={{ margin: '0 7.14vw', height: '100%' }} /></Link>
      <img src="/images/menu.svg" className="smartphone" style={{ width: '10vw', height: 'auto' }}></img>
    </div>
  </header>)
}
export default Header