import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
function Header(){
  let [route, setRoute] = useState('')
  let router = useRouter()
  useEffect(()=>{ 
    setRoute(router.pathname)
  },[router])

    return (<header style={{backgroundColor:'white',zIndex:1000,position:'sticky',top:0}}>
        <div aria-description="upper header" style={{display:'flex',flexDirection:'row',width:'100vw',padding:0,justifyContent:'space-between',background:'var(--normalblue)',height:route==='/'?'8vh':0,transition:'height 1s'}}>
          <div aria-description="busy part" style={{width:'50vw',marginRight:'7.14vw',height:'100%',fontSize:'1vw',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href='/book' style={{display:'flex',justifyContent:'center',alignItems:'center',height:route==='/'?'40%':0,transition:'height 1s',background:'var(--lightblue)',borderRadius:'0.4rem',padding:'0 1.5rem',color:'var(--normalblue)',textDecoration:'none'}}>
          <span style={{color:'var(--normalblue)',fontSize:route==='/'?'1rem':'0',transition:'font-size 1s'}}>احجز الأن</span>
          </Link> 
          <span dir="ltr" style={{color:'white',fontWeight:'bolder',fontSize:route==='/'?'1rem':'0',transition:'font-size 0.5s'}}>0100 909 6060</span>
          </div> 
          <div dir="ltr" aria-description="busy part" style={{paddingLeft:'1.5rem',width:'30vw',height:'100%',fontSize:'1vw',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href='/signinorregister' style={{display:'flex',justifyContent:'center',alignItems:'center',height:route==='/'?'40%':0,transition:'height 1s',background:'var(--lightblue)',borderRadius:'0.4rem',padding:'0 1.5rem',color:'var(--normalblue)',textDecoration:'none'}}>
          <span style={{color:'var(--normalblue)',fontSize:route==='/'?'1rem':'0',transition:'font-size 1s'}}>تسجيل الدخول</span>
          </Link>
          </div>
        </div>
        <div aria-description="lower header" style={{boxShadow:'0 1px 3px 0 var(--heavyblue)',height:'11vh',display:'flex',alignItems:'center',fontSize:'var(--fontSize1)',width:'100vw',padding:0}}>
          <Link href='/' style={{height:'100%'}} ><img alt="logo" src='/images/logo.png'style={{margin:'0 7.14vw',height:'100%'}} /></Link>
          <nav style={{width:'50vw',color:'var(--normalblue)',fontWeight:"bolder",display:'flex',justifyContent:'space-between',height:'100%'}}>
            <Link href='/' className="navPages" style={{color:'var(--normalblue)',borderBottom:route==='/'?'var(--lightyellow) solid  4px':'none'}}>الصفحة الرئيسية</Link>
            <Link href='/book' className="navPages" style={{color:'var(--normalblue)',borderBottom:route.includes('/book')?'var(--lightyellow) solid  4px':'none'}}>الحجز الرقمي</Link>
            <Link href='/blog' className="navPages"style={{color:'var(--normalblue)',borderBottom:route.includes('/blog')?'var(--lightyellow) solid  4px':'none'}}>نصيحة طبيب</Link>
            <Link href='/aboutus' className="navPages" style={{color:'var(--normalblue)',borderBottom:route.includes('/aboutus')?'var(--lightyellow) solid  4px':'none'}}>من نحن</Link>
          </nav>
          <img src="/images/menu.svg" className="smartphone" style={{width:'10vw',height:'auto'}}></img>
        </div> 
      </header>)
}
export default Header