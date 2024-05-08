import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Layout({ children }) {
    return (
        <div className="layout-container"> 
        <Header />
        <main className="layout-content">
            {children}
        </main>
        <Footer />
    </div>
    )
}
