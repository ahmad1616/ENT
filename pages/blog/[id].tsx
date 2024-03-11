const { dbBlog } = require('../../src/db')
export async function getServerSideProps(context) {
  let {params} = context
  let id = params.id
  let blog = await dbBlog(id)
  return {props: {blog}}
}
export default function Page({blog}) {
  return (
  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
    <div style={{display:'flex',flexDirection:'column',width:'60vw',backgroundColor:'var(--lightblue)',padding:'1%'}}>
    <span style={{color:'var(--normalblue)',fontSize:'var(--fontSize3)'}}>{blog.title}</span>
    <p className='blog_p'>{blog.p1}</p>
    <img className='blog_img' src={blog.img1_2}/>
    <p className='blog_p'>{blog.p2}</p>
    <img className='blog_img' src={blog.img2_3}/>
    <p className='blog_p'>{blog.p3}</p>
    <img className='blog_img' src={blog.img3_4}/>
    <p className='blog_p'>{blog.p4}</p>
    <div style={{display:'flex',flexDirection:'column',color:'var(--heavyblue)'}}>
      <span>{blog.author}</span> 
      <span>{blog.publication_date}</span>
    </div>
  </div>
  <div style={{width:'20vw'}}></div>
  </div>
  )
}

