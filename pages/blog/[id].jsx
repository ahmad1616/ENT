const { MongoClient } = require("mongodb");
const uri = process.env.URI
import ArticleCard from '../../src/components/articlecard';
import Article from '../../src/components/article'
import Link from 'next/link'
const { getArticleByID, getArticles } = require('../../src/utils/blogUtils')
export async function getServerSideProps(context) {
  let { params } = context 
  let id = params.id
  const client = new MongoClient(uri);
  const database = client.db('ENT');
  const blog = database.collection('blog');
  let blogData = await getArticleByID(blog, id)
  let authorRelated = await getArticles(blog, blogData.author, undefined,3,0)
  let classRelated = await getArticles(blog, undefined, blogData.classification ,3,0)
  let relatedArticles= {authorRelated,classRelated}

  return { props: { blogData, relatedArticles } }
}
export default function ID({ blogData, relatedArticles }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '4rem 6vw' }}>
      <div style={{ fontWeight: 'normal' }}>
        <Link style={{ color: 'var(--grey)', textDecoration: 'none' }} href={'/blog'}>الرئيسية</Link>
        <img style={{ width: '0.75rem', margin: '0 1rem', transform: 'rotate(90deg)' }} src='/images/collapse.svg' />
        <Link style={{ color: 'var(--grey)', textDecoration: 'none' }} href={{ pathname: '/blog', query: { articleType: blogData.class } }}>{blogData.classification}</Link></div>
      <hr style={{ width: '100%', backgroundColor: 'var(--grey)', border: 'none', height: '1px' }}></hr>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Article blogData={blogData} />
        <div>
          <div style={{width:'28vw',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginBottom:'3rem'}}>
            <h2>مقالات لنفس الكاتب</h2>
            {relatedArticles.authorRelated.map((value) => <ArticleCard title={value.title} author={value.author} background_image={value.articleImage} _id={value._id} publication_date={value.publicationDate} classification={value.class} />
            )}
          </div>
          <div style={{width:'28vw',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginBottom:'3rem'}}>
            <h2>مقالات ذات صلة</h2>
            {relatedArticles.classRelated.map((value) => <ArticleCard title={value.title} author={value.author} background_image={value.articleImage} _id={value._id} publication_date={value.publicationDate} classification={value.class} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

