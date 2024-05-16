import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Layout({ children }) {
    return (
        <div className="layout-container"> 
        <ToastContainer/>
        <Header />
        <main className="layout-content">
            {children}
        </main>
        <Footer />
    </div>
    )
}
