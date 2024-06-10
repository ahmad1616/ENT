import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Home() {
    let router = useRouter()
    let [chooseUsArr, setChooseUsArr] = useState([true, false, false, false])
    let [windowHeight, setWindowHeight] = useState(0)
    let [windowWidth, setWindowWidth] = useState(0)
    let [articles, setArticles] = useState([])
    useEffect(() => {
        if (typeof window != undefined) {
            setWindowHeight(window.innerHeight)
            setWindowWidth(window.innerWidth)
        }
        let res = fetch('/api/blog/getArticles', {
            method: 'POST', headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ articleType: undefined, articlesNum: 3, skipNum: 0 })
        }).then((res) => res.json()).then((res) => { setArticles(res.articles) })
    }, [])
    function chooseCollapse(key) {
        let newChooseUsArr = [false, false, false, false]
        if (!chooseUsArr[key]) {
            newChooseUsArr[key] = true
            setChooseUsArr(newChooseUsArr)
        }
    }

    return <div style={{ display: 'flex', flexDirection: 'column' }}>

        <section id="mainSection">
            <img className="mainSectionChildren" src="/images/staff.png" alt="" />
            <div className="mainSectionChildren" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} dir="ltr">
                <div style={{ width: '100%' }}><h1 style={{ color: 'white', fontSize: '2.5rem', margin: '0px' }}>CAPITAL ENT</h1></div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><img style={{ width: '2.4rem' }} src="/images/ent.svg" />
                    <img style={{ width: '2.7rem' }} src="/images/ear.svg" />
                    <img style={{ width: '2.7rem' }} src="/images/cosmetic.png" /></div>
                <hr id="mainhr" style={{ animationName: 'hrgradient',backgroundColor:'var(--lightblue)', animationIterationCount: 'infinite', animationDuration: '20s', color: 'white', height: '0.3rem', border: 'none', background: 'background:linear-gradient(90deg, var(--grey) 8%, white 8%)' }} />
                <div style={{ overflowX: 'hidden', width: '100%' }}>
                    <div id="mainParagraphsContainer" style={{ animationName: 'descriptions', animationIterationCount: 'infinite', animationDuration: '20s', position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p className="mainParagraphs" dir="rtl" >
                             أطباء الأنف و الأذن و الحنجرة علي أعلي مستوي ، نقوم بعمليات اللوز و الاستكشاف و غيرها من العمليات ، اهممنا أن نوفر أحدث الأجهزة الطبية لتساعد الطبيب و تؤدي للنتائج المرضية للمريض.
                            <Link style={{ color: 'white' }} href={'/doctors'}>تعرف علي الأطباء هنا
                            </Link></p>
                        <p className="mainParagraphs" dir="rtl" >
                            مجال السمعيات عندنا علي أعلي مستوي ومدعوم بأحدث التقنيات و أمهر الأطباء،
                            <Link style={{ color: 'white' }} href={'/doctors'}>تعرف علي الأطباء هنا
                            </Link></p>
                        <p className="mainParagraphs" dir="rtl" >
                            عمليات تجميل الأنف و الأذن مع أمهر الأطباء و أكفأ الجراحين ،
                            <Link style={{ color: 'white' }} href={'/doctors'}>تعرف علي الأطباء هنا
                            </Link></p>
                    </div>
                </div>
            </div>
        </section>
        <section id="whyChooseUsSection">
            <div className="whyChooseUsChildren">
                <h1 style={{ fontSize: '2.5rem', padding: '1rem', height: '20%' }}>ليه تختارنا ؟</h1>
                <div style={{ padding: '3rem', height: '80%', width: '100%' }}>
                    <div onClick={() => { chooseCollapse(0) }} style={{ display: 'flex', flexDirection: 'row' }}><img style={{ transform: chooseUsArr[0] ? '' : 'rotate(90deg)', width: '1rem', margin: '1rem' }} src="/images/collapse.svg" /><h3>تخصصنا نقطة القوة</h3></div>
                    <p style={{ display: chooseUsArr[0] ? 'block' : 'none' }}>مركزنا متخصص في الأنف و الأذن و الحنجرة  وعشان كده
                        بنتفرد و نبدع في مجالنا ،علي عكس غيرنا من المراكز الطبية.</p>
                    <div onClick={() => { chooseCollapse(1) }} style={{ display: 'flex', flexDirection: 'row' }}><img style={{ transform: chooseUsArr[1] ? '' : 'rotate(90deg)', width: '1rem', margin: '1rem' }} src="/images/collapse.svg" /><h3>الأطباء علي أعلي مستوي </h3></div>
                    <p style={{ display: chooseUsArr[1] ? 'block' : 'none' }}>مركزنا متخصص في الأنف و الأذن و الحنجرة  وعشان كده
                        بنتفرد و نبدع في مجالنا ،علي عكس غيرنا من المراكز الطبية.</p>
                    <div onClick={() => { chooseCollapse(3) }} style={{ display: 'flex', flexDirection: 'row' }}><img style={{ transform: chooseUsArr[3] ? '' : 'rotate(90deg)', width: '1rem', margin: '1rem' }} src="/images/collapse.svg" /><h3>الأجهزة الطبية متطورة</h3></div>
                    <p style={{ display: chooseUsArr[3] ? 'block' : 'none' }}>مركزنا متخصص في الأنف و الأذن و الحنجرة  وعشان كده
                        بنتفرد و نبدع في مجالنا ،علي عكس غيرنا من المراكز الطبية.</p>
                </div>
            </div>
            <img className="whyChooseUsChildren" src="/images/oneway.png" alt="" />
        </section>
        <section dir="ltr" id="bookSection">
            <div className="bookChildren">
                <h1 dir="rtl" style={{ fontSize: '2rem', margin: 0 }}>تقدر دلوقتي تحجز أونلاين !</h1>
                <p dir="rtl" style={{ fontSize: '1.25rem' }}>تحدد <span style={{ fontWeight: 'bold' }}>الدكتور</span> و سعر و موعد الحجز و كمان تعرض
                    مكان المركز علي الخريطة  </p>
                <br /><br /><br />
                <div dir="ltr"><button onClick={() => { router.push('/book') }} style={{ boxShadow: 'black 0 2px 3px', backgroundColor: 'white', color: 'var(--normalblue)', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '10px' }} >احجز الآن</button></div>
            </div>
            <img className="bookChildren" src="/images/confirmed.png" alt="" />
        </section>
        <section style={{ margin: '2rem 0', display: 'flex', backgroundColor: 'var(--heavyblue)', flexDirection: 'column', position: 'relative', alignItems: 'center' }}>
            <h1 style={{ position: 'absolute', zIndex: '2000', fontSize: '2rem', paddingRight: '1vw', height: '5%' }}><span style={{ color: 'var(--heavyblue)' }}> نصائح و معلو</span><span style={{ color: 'var(--lightblue)' }}>مات من ِأطباءنا</span></h1>
            <div style={{ display: 'flex', width: '100vw' }}>
                <div style={{ width: '55vw', zIndex: '1000', height: '100%', background: `linear-gradient(${180 - Math.atan((81 / 100) * windowHeight / (5 / 100 * windowWidth)) * 180 / Math.PI}deg, rgba(0,0,0,0) 10%, var(--lightblue) 10%)`, padding: '15% 0' }}>
                    <p style={{ color: 'var(--heavyblue)', margin: '0', fontWeight: 'bold', width: '90%' }}>كادرنا الطبي سخر وقت للإجابة علي
                        أسئلتك الشائعة و إفادتك بمعلومات
                        تخليك في صحة و سلامة ...!</p>
                    <img style={{ width: '70%', height: 'auto' }} src="/images/consultant.png" alt="" />
                </div>
                <div style={{ width: '45%', height: '100%', padding: '15% 0' }}>
                    <div style={{ width: '200vw', position: 'relative', animationName: 'blogs', animationIterationCount: 'infinite', animationDuration: '20s', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 0, margin: 0 }}>
                        {articles.map((val) => <Link href={`/blog/${val['_id']}`} style={{}}><div style={{ width: '40vw', height: '30vw', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `linear-gradient(${180 - Math.atan((81 / 100) * windowHeight / (5 / 100 * windowWidth)) * 180 / Math.PI}deg, rgba(0,0,0,0) 90%, var(--heavyblue) 90%),url(${val.articleImage})` }}></div>
                            <div style={{ marginRight: '5rem' }} ><h1 style={{ color: 'white', margin: 0 }}>{val.title}</h1><span style={{ color: 'white' }}>الطبيب: {val.author}</span></div></Link>)}
                    </div>
                </div>
            </div>
        </section>
    </div>
}