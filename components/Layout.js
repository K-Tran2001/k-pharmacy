import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <div className="container">
            <NavBar />
            <Notify />
            <Modal />
            <div>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout