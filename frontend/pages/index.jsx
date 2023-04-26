import styles from "../styles/Home.module.css";
import InstructionsComponent from "../components/InstructionsComponent";
import NftGallery from "../components/nftGallery.jsx";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { useAccount } from "wagmi";
import { useEffect,useState } from "react";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    if(!address) return 
    ;(async ()=>{
      // iife - immediately inwoked functional expression
      const userDoc = {
        _type: 'users',
        _id: address,
        userName: 'Unnamed',
        walletAddress: address,
      }

      const result = await client.createIfNotExists(userDoc)

      welcomeUser(result.userName)
    })()
  }, [address])

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
