import Link from "next/link"
import Logo from "./logo"
import SocialMedia from "./socialMedia"
export default function Footer() {
    return (
        <footer dir="ltr" style={{ width: '100vw', height: '15vh', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', backgroundColor: 'var(--heavyblue)' }}>
            <Link href='/' style={{ height: '50%' }} ><Logo color={'var(--lightblue)'} /></Link>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ color: 'var(--lightblue)', fontSize: '1rem', margin: 0 }}>0100 909 6060</h3>
                <SocialMedia/>
            </div>
            <nav dir="rtl" style={{ width: '35vw', color: 'var(--lightblue)', fontWeight: "bolder", display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', height: '100%' }}>
                <Link href='/' className="navPages" style={{ color: 'var(--lightblue)' }}>الصفحة الرئيسية</Link>
                <Link href='/book' className="navPages" style={{ color: 'var(--lightblue)' }}>الحجز الرقمي</Link>
                <Link href='/blog' className="navPages" style={{ color: 'var(--lightblue)' }}>نصيحة طبيب</Link>
                <Link href='/founders' className="navPages" style={{ color: 'var(--lightblue)' }}>المؤسسين</Link>
                <Link href='/book/choosedoctor' className="navPages" style={{ color: 'var(--lightblue)' }}>الأطباء</Link>
            </nav>
        </footer>
    )
}