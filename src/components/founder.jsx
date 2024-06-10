export default function Founder({type,name,image,description,degree,position,facebook}){
    return <section dir={type?'rtl':'ltr'} style={{width:'100vw',height:'81vh',boxShadow:'1px 1px 9px grey',margin:'1rem 0',background:`linear-gradient(${type==1?95:85}deg, ${type==1?'var(--normalblue)':'var(--lightblue)'} 50%, ${type==1?'var(--lightblue)':'var(--normalblue)'} 50%)`,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{position:'relative',height:'35vw',width:'35vw',marginRight:type==1?'2rem':0,marginLeft:type==1?0:'2rem'}}>
            <img style={{border:'10px solid var(--heavyblue)',zIndex:0,position:'absolute',top:0,left:0,width:'100%',height:'100%'}} src={image}></img>
            <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:`linear-gradient(${type==1?95:85}deg,${type==1? 'var(--lightblue) 8%':'rgba(0,0,0,0) 90%'}, ${type==1?'var(--heavyblue) 8% 10%':'rgba(0,0,0,0) 90%'}, ${type==1?'rgba(0,0,0,0) 10% 100%':'var(--heavyblue) 90% 92%'},${type==1?'rgba(0,0,0,0) 10% 100%':'var(--lightblue) 92%'})`,zIndex:1000}}></div>
        </div>
        <div dir="rtl" style={{color:'var(--lightblue)',width:'40%',height:'50%'}}>
        <h1 >د. {name}</h1>
        <p style={{fontSize:'1rem',fontWeight:'bold'}}>{description}</p>
        </div>
    </section>
}