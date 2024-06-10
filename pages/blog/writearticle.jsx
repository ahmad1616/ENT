import { useSafeMantineTheme } from '@mantine/core'
import { TextInput, NativeSelect, Textarea, PasswordInput, Group, FileInput, Button, Checkbox, Flex, rem, RadioGroup, Radio, Select } from "@mantine/core"
import Article from '../../src/components/article'
import Nothing from '../404'
import { useForm } from '@mantine/form'
import { SignedContext } from '../_app'
import { useContext, useEffect, useState } from 'react'
import { title } from 'process'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function WriteArticle() {
  let router = useRouter()
  let { signedData } = useContext(SignedContext)
  let [date, setDate] = useState(new Date())
  let [submit, setSubmit] = useState(false)
  let [imagesNames, setImagesName] = useState({ title: '', elements: [] })
  let [blogData, setBlogData] = useState({ title: "العنوان", classification: 'الأنف و الأذن و الحنجرة', articleImage: '', author: signedData.name, publicationDate: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`, elements: [] })
  useEffect(() => {
    if (submit) {
      let resState
      let res = fetch('/api/blog/writearticle', {
        method: 'POST', mode: 'cors',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({blogData:blogData,sessionID:signedData.sessionID})
      })
      res.then(res => { 
        resState = res.json().state;
        setSubmit(false); 
        console.log(resState);
        router.push('/')
         })
    }
  }, [submit])
  return signedData.usertype !== 'doctor' ? <Nothing /> :
    <div style={{ display: 'flex', flexDirection: 'column', padding: '4rem 6vw' }}>
      <div style={{ fontWeight: 'normal' }}>
        <Link style={{ color: 'var(--grey)', textDecoration: 'none' }} href={'/blog'}>الرئيسية</Link>
        <img style={{ width: '0.75rem', margin: '0 1rem', transform: 'rotate(90deg)' }} src='/images/collapse.svg' />
        <Link style={{ color: 'var(--grey)', textDecoration: 'none' }} href={{ pathname: '/blog', query: { articleType: blogData.class } }}>{blogData.classification}</Link></div>
      <hr style={{ width: '100%', backgroundColor: 'var(--grey)', border: 'none', height: '1px' }}></hr>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Article blogData={blogData} />
        <form onSubmit={(e) => { e.preventDefault(); console.log('submitted'); setSubmit(true) }} style={{ display: 'block' }} action="submit">
          <Flex style={{ display: 'block', width: '25vw', color: 'var(--grey)' }} mb={rem(32)}>
            <TextInput label='العنوان' onChange={(e) => { let newArr = { ...blogData }; newArr.title = e.target.value; setBlogData(newArr) }} required></TextInput>
            <NativeSelect onChange={(e) => { let newArr = { ...blogData }; newArr.classification = e.target.value; setBlogData(newArr) }} label='تصنيف المقال' data={['الأنف و الأذن و الحنجرة', 'السمعيات', 'التخاطب', 'صحة عامة', 'أخطاء شائعة']} required />
            <label htmlFor="fileupload">اختر صورة المقال <span style={{ color: 'red' }}>*</span></label>
            <label id='label' className='custom-file-upload ' htmlFor="fileupload">{imagesNames.title}</label>
            <input id='fileupload' type='file' onChange={(event) => {
              const file = event.currentTarget.files[0];
              if (file) {
                let imagesNames2 = { ...imagesNames }
                imagesNames2.title = file.name
                setImagesName(imagesNames2)
                const reader = new FileReader();
                reader.onload = () => {
                  let newArr = { ...blogData }; newArr.articleImage = reader.result; setBlogData(newArr)
                };
                reader.readAsDataURL(file); 
              } else {
                setImageSrc('/images/chooseImage.png');
              }
            }} required></input>
            <div>
              {blogData.elements.map((e, i) => <div style={{ margin: '3rem 0' }}>

                <TextInput label={`عنوان الفقرة   ${i + 1}`} onChange={(e) => { let newArr = { ...blogData }; newArr.elements[i].title = e.target.value; setBlogData(newArr) }} required></TextInput>
                <label>اختر صورة الفقرة {i + 1}
                  <label style={{ position: 'relative' }} className='custom-file-upload ' >
                    {imagesNames.elements[i]}<div onClick={(e) => {
                      e.preventDefault(); let imagesNames2 = { ...imagesNames }
                      imagesNames2.elements[i] = ''
                      setImagesName(imagesNames2)
                      let newBlogData = { ...blogData }
                      let newBlogElements = [...newBlogData.elements]
                      let newElementData = {...newBlogElements[i]}
                      newElementData.image = ''
                      newBlogElements[i] = newElementData
                      newBlogData.elements = newBlogElements
                      setBlogData(newBlogData)
                    }} style={{ transform: 'rotate(45deg)', position: 'absolute', left: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', borderRadius: '50%' }}><span>+</span></div>
                    <input id='fileupload' type='file' onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        let imagesNames2 = { ...imagesNames }
                        imagesNames2.elements[i] = file.name
                        setImagesName(imagesNames2)
                        const reader = new FileReader();
                        reader.onload = () => {
                          let newArr = { ...blogData }; newArr.elements[i].image = reader.result; setBlogData(newArr)
                        };
                        reader.readAsDataURL(file);
                      } else {
                        setImageSrc('/images/chooseImage.png');
                      }
                    }} ></input></label></label>
                <Textarea onChange={(e) => {
                  let newArr = { ...blogData }; newArr.elements[i].paragraph = e.target.value; setBlogData(newArr)

                }} label={`الفقرة ${i + 1}`} required></Textarea>
              </div>)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem ' }}>
              <button className='plusMinus' onClick={() => {
                let newImagesNames = { ...imagesNames }
                let newElements = [...newImagesNames.elements]
                newElements.push('')
                newImagesNames.elements = newElements
                setImagesName(newImagesNames)
                let newBlogData = { ...blogData }
                let newBlogElements = [...newBlogData.elements]
                newBlogElements.push({ title: '', paragraph: '', image: '' })
                newBlogData.elements = newBlogElements
                setBlogData(newBlogData)

              }}>+</button>
              <span style={{ margin: '0 0.5rem' }}>عدد القطع</span>
              <button onClick={() => {
                let newImagesNames = { ...imagesNames }
                let newElements = [...newImagesNames.elements]
                newElements.pop()
                newImagesNames.elements = newElements
                setImagesName(newImagesNames)
                let newBlogData = { ...blogData }
                let newBlogElements = [...newBlogData.elements]
                newBlogElements.pop()
                newBlogData.elements = newBlogElements
                setBlogData(newBlogData)

              }} className='plusMinus'>-</button>
            </div>
            <Group mt={rem(64)}>
              <Button style={{ backgroundColor: 'var(--normalblue)' }} type="submit">نشر المقال</Button>
            </Group>
          </Flex>
        </form>
      </div>
    </div>

}