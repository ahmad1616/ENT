import { useForm } from "@mantine/form"
import Loading from "../../src/components/loading";
import BlogCard from "../../src/components/blogCard";
import { TextInput, Button, Group, Box, Flex, NativeSelect } from '@mantine/core';
import { useState, useEffect } from "react"
function Blog() {
  let [loading, setLoading] = useState(true)
  let [blogType, setBlogType] = useState('غير محدد')
  let [blogs,setBlogs] = useState([])
  useEffect(() => {
    setLoading(true)
    async function getBlogsAsync() {
      let res = await fetch('/api/blogs', {
        method: 'POST', mode: 'cors', headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({'job':blogType})
    })
    let resJson = await res.json()
    setLoading(false)
    setBlogs(resJson.blogs)
    console.log(resJson);
    
    }
    getBlogsAsync()
  }, [blogType])
  let form = useForm({
    initialValues: {
      payload: ''
    }
  })
  function onClassificationChange(event){
    console.log(event.currentTarget.value);
    
    setBlogType(event.currentTarget.value)
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100vw' }}>
        <div style={{ display: 'flex', padding: '2rem', flexDirection: 'column', height: '25vh', width: '100%', alignItems: 'center', justifyContent: "space-evenly" }}>
          <h1 style={{ color: 'var(--normalblue)' }}>هنا حلقة الوصل بينك و بين الطبيب! </h1>
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
          <hr style={{ width: '95%', backgroundColor: 'var(--grey)', border: 'none', height: '2px' }}></hr>
          <Loading loading={loading} />
          <div style={{display:loading?'none':'flex',flexWrap:'wrap',padding:'1rem'}}>
          {blogs.length>0?blogs.map(({author,background_image,publication_date,title,_id})=>{
          return <BlogCard title={title} author={author} publication_date={publication_date} background_image={background_image} _id={_id}/>}):<div style={{display:'flex',width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}><h2 style={{color:'var(--normalblue)'}}>لا شيء للعرض</h2></div>}
          </div>
        </section>
      </div>
    </>
  )
}
export default Blog