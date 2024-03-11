import Link from "next/link";

export default function BlogCard({ title, background_image, publication_date, author, _id }) {
    return <Link href={`/blog/${encodeURIComponent(_id)}`} style={{ width: '15rem', height: '15rem', backgroundColor: 'white', borderRadius: '1rem', border: 'var(--grey) solid 0.25rem',textDecoration:'none'}}>
        <img style={{ height: '60%', width: '100%', borderRadius: '1rem' }} src={background_image} />
        <h4 style={{ color: 'var(--normalblue)', margin: '0.4rem' }}>{title}</h4>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem 0.4rem' }}>
            <span style={{ fontSize: '1rem', color: 'var(--grey' }}>{author}</span><span style={{ fontSize: '0.75rem', color: 'var(--grey)' }}>{publication_date}</span>
        </div>

    </Link>
}