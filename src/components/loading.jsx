import Logo from "./logo"
export default function Loading({loading}){
    return <div style={{width:'100vw',height:'40vh',display:loading?'flex':'none',alignItems:'center',justifyContent:'center'}}>
    <div style={{width:'4vw',height:'4vw',animationName:'loading',animationDuration:'1s',animationIterationCount:'infinite'}}><Logo color={'#00B5C8'}/></div>
</div>
}