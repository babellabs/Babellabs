import React from 'react'
import './navbar.css'

const Navbar = () => {
  return (
    <div >
      <nav>
        <div className="Logo-box">BabelLabs<span className='logo-sm'>studio</span> </div>

        <div className="wallet">
            <button className='wallet-btn'>Connnect Wallet</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
