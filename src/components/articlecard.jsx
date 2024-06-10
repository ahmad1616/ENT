import Link from "next/link";

export default function ArticleCard({ title, background_image, publication_date, author, _id ,classification }) {
    return <Link style={{textDecoration:'none'}} href={`/blog/${encodeURIComponent(_id)}`}>
        <div className="Articlecard">
        <img style={{width:'100%',height:'50%',objectFit:'cover'}} src={background_image} alt="" />
        <h4 style={{ color: 'var(--normalblue)', margin: '0.4rem',fontSize:'inherit' }}>{title}</h4>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem 0.4rem' }}>
            <span style={{ fontSize: 'inherit', color: 'var(--grey' }}>{author}</span><span style={{ fontSize: '0.75rem', color: 'var(--grey)' }}>{publication_date}</span>
        </div>
        </div>
    </Link> 
}