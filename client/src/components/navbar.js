import React from 'react'
import './navbar.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = () => {

  const [walletAddress, setWalletAddress] = useState(null);
  const[account, setAccount] = useState(false);
  let [publicKey, setPublicKey] = useState("");
  

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log('Phantom wallet found!');
      const response = await window.solana.connect({ onlyIfTrusted: true });
      const pk = response.publicKey.toString()
      setPublicKey(publicKey => pk)
      
      console.log(
        'Connected with Public Key:',
        pk
      );
      setAccount(!account)
      

      /*
       * Set the user's publicKey in state to be used later!
       */
      setWalletAddress(response.publicKey.toString());
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  };

  
  

  const connectWallet = async () => {

    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }

  };


  const renderNotConnectedContainer = () => (
    
    <button className='wallet-btn' onClick={connectWallet}>Connnect Wallet</button>
  );

  const renderConnectedAccountContainer = (publicKey) =>(
    <div  className='accountContainer'>
      <img src={`https://robohash.org/${publicKey}?size=50x50`} alt=""  />
    </div>
    
    
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  const style ={
    color:"white",
    textDecoration:"none"
  }


  return (
    <div >
      <nav>
        <div className="Logo-box">
          <Link to='/' style={style}>
          BabelLabs<span className='logo-sm'>studio</span>
          </Link>
           </div>
        <div className="links">
          <div>
             <Link to='/lip-sync' style={style}>Lipsync</Link> 
            </div>
          <div>
             <Link to='/voice-clone' style={style}>VoiceClone</Link> 
            </div>
          
        </div>
        
        <div className="wallet">

        {!walletAddress && renderNotConnectedContainer()}
        {account && renderConnectedAccountContainer()}
        
        </div>
      </nav>
    </div>
  )
}

export default Navbar
