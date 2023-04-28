import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Goerli } from "@thirdweb-dev/chains";
import { useNFTs, useListingsV3,useContract  } from "@thirdweb-dev/react";
// import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
// import { ThirdwebSDK } from '@3rdweb/sdk'

import { configureChains, createClient } from 'wagmi'
// import { useAccount, Provider, useProvider, useContract, useSigner } from 'wagmi'


import { client } from '../../lib/databaseClient'
import NFTGrid from '../../components/NFT/NFTGrid'


const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}


const Collections = () => {
  const router = useRouter();

  // const provider = useProvider();
  // const { data: signer, isError, isLoading } = useSigner();


  const { collectionId } = router.query;
  console.log(router.query)
  console.log(collectionId)


  const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([])

  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract("0xFfd9bAddF3f6e427EfAa1A4AEC99131078C1d683");
  const { data, isLoading } = useNFTs(contract);

  console.log("nft data",data)



  return (
    <div className='bg-white'>
      <Link href="/">
        {collectionId}
      </Link>
      <NFTGrid
        data={data}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
        }
      />
    </div>
  )
}

export default Collections