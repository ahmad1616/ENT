import { useForm } from "@mantine/form"
import Loading from "../../src/components/loading";
import ArticleCard from "../../src/components/articlecard";
import { SignedContext } from "../_app"
import { TextInput, Button, Group, Box, Flex, NativeSelect } from '@mantine/core';
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router";
export default function Blog() {
  let router = useRouter()
  let [loading, setLoading] = useState(true)
  let [articleType, setArticleType] = useState('غير محدد')
  let [articles,setArticles] = useState([])
  let [skipNum,setSkipNum] = useState(0)
  let [articlesCount,setArticlesCount] = useState(0)
  let { signedData, setSignedData} = useContext(SignedContext)
  useEffect(() => {
    setLoading(true)
    if(router.query.articleType!==articleType){
      setArticleType(router.query.blogType)
    }
    let res = fetch('/api/blog/getArticles', {
      method: 'POST', mode: 'cors',headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ articleType: articleType,skipNum:skipNum,articlesNum:10 })
  }).then((res)=>res.json()).then((res)=>{setArticles(res.articles);setArticlesCount(res.articlesCount);console.log(res);}).then(()=>{setLoading(false)})
  }, [articleType,skipNum])
  let form = useForm({
    initialValues: {
      payload: ''
    }
  })
  function onClassificationChange(event){
    setArticleType(event.currentTarget.value)
    router.push({
      pathname: '/blog',
      query: { articleType: event.currentTarget.value },
    }, undefined, { shallow: true });
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column',alignItems:'center', width: '100vw' }}>
        <div style={{ display: 'flex', padding: '2rem', flexDirection: 'column', height: '25vh', width: '100%', alignItems: 'center', justifyContent: "space-evenly" }}>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <h1 style={{ color: 'var(--normalblue)',margin:'1rem' }}><span style={{display:signedData.usertype!=='doctor'?'block':'none'}}>هنا حلقة الوصل بينك و بين الطبيب!</span>
            <div style={{display:signedData.usertype==='doctor'?'block':'none'}}>
            <span>ممكن نصيحتك تنقذ حياة إنسان ! </span>
            <Button onClick={()=>{router.push('/blog/writearticle')}} color="var(--normalblue)">إنشاء مقال</Button>
            </div>
            </h1>
          </div>
          <Box miw={400}>
            <form >
              <Flex
                gap="md"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                <TextInput w={300} dir="rtl"
                  placeholder="ابحث عن موضوع"
                  {...form.getInputProps('payload')}
                />
                <Group>
                  <Button color="var(--normalblue)" type="submit">بحث</Button>
                </Group>
              </Flex>
              <NativeSelect
                w={300}
                m={10}
                onChange={onClassificationChange}
                data={['غير محدد','الأنف و الأذن و الحنجرة', 'السمعيات', 'التخاطب']}
              />
            </form>
          </Box>
        </div>
        <section style={{ width: '100vw' }}>
          <h1 style={{ color: 'var(--normalblue)', margin: '0 1rem' }}>الأكثر قراءة</h1>
          <hr style={{ width: '95%', backgroundColor: 'var(--grey)', border: 'none', height: '1px' }}></hr>
          <Loading loading={loading} />
          <div style={{display:loading?'none':'flex',flexWrap:'wrap',justifyContent:'space-evenly',padding:'1rem'}}>
          {articles.length>0?articles.map(({author,title,articleImage,classification,publicationDate,_id})=>{
          return <ArticleCard title={title} author={author} publication_date={publicationDate} background_image={articleImage} classification={classification} _id={_id}/>}):<div style={{display:'flex',width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}><h2 style={{color:'var(--normalblue)'}}>لا شيء للعرض</h2></div>}
          </div>
        </section>
        <div style={{ display: 'flex',margin:'5vh 0', alignItems: 'center', padding: '1rem ' }}>
              <button onClick={()=>{setSkipNum(skipNum+1)}} className='plusMinus'>+</button>
              <span style={{ margin: '0 0.5rem' }}>{skipNum}</span>
              <button onClick={()=>{if(skipNum!=0){setSkipNum(skipNum-1)}}} className='plusMinus'>-</button>
            </div>
      </div>
    </>
  )
}