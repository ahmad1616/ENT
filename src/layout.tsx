import Header from "./components/header"
import Footer from "./components/footer"
export default function Layout({ children }) {
    return <div style={{ backgroundColor: 'var(--lightblue)', minHeight: '100vh', position: 'relative' }}>
        <Header />
        <main style={{ minHeight: '50vh' }}>{children}</main>
        <Footer />
    </div>
}