import { SignedContext } from '../../pages/_app'
import { useContext, useState, useRef } from 'react'
export default function Article({ blogData }) {
  let { signedData, setSignedData } = useContext(SignedContext)
  return <div style={{ display: 'flex', flexDirection: 'column', width: '60vw', backgroundColor: 'white', padding: '1%' }}>
    <h1 style={{ color: 'var(--grey)', fontSize: '2rem', height: '3rem' }}>
      {blogData.title}
    </h1>
    <img style={{ width: '35vw',margin:'0 12.5vw', height: '25vw', border:'0.5rem solid var(--heavyblue)',objectFit: 'contain' }} src={blogData.articleImage==''?'/images/chooseImage.png':blogData.articleImage} alt="" />
    <h4 style={{color: 'var(--grey)', fontSize: '1.2rem' }}>عناصر المقال</h4>
    <ol style={{ display:'flex' , width:'100%',flexDirection:'row',flexWrap:'wrap',color: 'var(--grey)', fontSize: '1.2rem' }}>
      {blogData.elements.map((value) => <li style={{width:'50%'}}>{value.title}</li>)}
    </ol>

    <div>
      {blogData.elements.map((value) => <div>
        <h2 style={{ color: 'var(--grey)' }}>{value.title}</h2>
        <p style={{ color: 'var(--grey)' }}>{value.paragraph}</p>
          <img style={{ width: '35vw',margin:'0 12.5vw', display: value.image == '' ? 'none' : 'block', height: '25vw', border:'0.5rem solid var(--heavyblue)',objectFit: 'contain' }} src={value.image} alt="" />
      </div>)}
    </div> 
    <span style={{color:'var(--grey)',margin:'2rem'}}>{blogData.author} {blogData.publicationDate}</span>
  </div>
}