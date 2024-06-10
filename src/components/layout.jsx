import Header from "./header"
import Footer from "./footer"

export default function Layout({ cookies,children }) {
    return <>
        <div style={{ backgroundColor: 'var(--lightblue)', minHeight: '100vh' }}>
            <Header />
            <main style={{ minHeight: '90vh' }}>{children}</main>
            <Footer />
        </div></>
}
 