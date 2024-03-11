export default function Loading({loading}){
    return <div style={{width:'100vw',height:'40vh',display:loading?'flex':'none',alignItems:'center',justifyContent:'center'}}>
    <img style={{width:'4vw',height:'4vw',animationName:'loading',animationDuration:'1s',animationIterationCount:'infinite'}} src="/images/logo2.svg"/>
</div>
}