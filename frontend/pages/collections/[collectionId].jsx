import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Header from '../../components/Header';
import NFTCard from '../../components/NFTCard'
import Web3 from 'web3';
import axios from 'axios';
// import { Nftdata } from '../../components/NFTData';



import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import {FaUserAlt} from 'react-icons/fa'

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Goerli } from "@thirdweb-dev/chains";
import { useNFTs, useListingsV3, useContract } from "@thirdweb-dev/react";
// import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
// import { ThirdwebSDK } from '@3rdweb/sdk'

import { configureChains, createClient } from 'wagmi'
// import { useAccount, Provider, useProvider, useContract, useSigner } from 'wagmi'


import { client } from '../../lib/databaseClient'
import NFTGrid from '../../components/NFT/NFTGrid'


const style = {
  bannerImageContainer: `h-[25vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full bg-white p-4 border-2 border-[#202225] mt-[-4rem]`,
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
  const { collectionId } = router.query;

  // const provider = useProvider();
  // const { data: signer, isError, isLoading } = useSigner();




  const [contractAddress, setContractAddress] = useState();
  // const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [tokenMetadata, setTokenMetadata] = useState([]);

  const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([])

  const [display, setDisplay] = useState(false)

  // console.log(router.query)
  // console.log(collectionId)


  // Load all of the NFTs from the NFT Collection
  // const { contract } = useContract("0xFfd9bAddF3f6e427EfAa1A4AEC99131078C1d683");
  // const { data, isLoading } = useNFTs(contract);

  // console.log("nft data", data);

  // 
  // code for getting nft data 
  // 
  const indexerERC721ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenOfOwnerByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  // useEffect(() => {
  //   async function fetchNFTCollectionData() {
  //     console.log("Contract inside fetch method", contractAddress)
  //     setContractAddress(collectionId)
  //     console.log("Contract inside fetch method 2", contractAddress)
  //     // Create a new Web3 instance
  //     // const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  //     // const provider = new Web3.providers.HttpProvider('https://eth-mainnet.g.alchemy.com/v2/eBUL-V72Vx1618tJLXVlbZmID_MoFvxD');
  //     const provider = new Web3.providers.HttpProvider('https://mantle-testnet.rpc.thirdweb.com/');
  //     const web3 = new Web3(provider);


  //     // Create a contract instance using the address and ABI
  //     const contract = new web3.eth.Contract(indexerERC721ABI, contractAddress);
  //     console.log("contract", contract)


  //     // Get the name and symbol of the NFT collection
  //     const name = await contract.methods.name().call();
  //     const symbol = await contract.methods.symbol().call();
  //     console.log("name", name)
  //     console.log("symbol", symbol)



  //     // Get the total number of tokens in the collection
  //     const totalSupply = await contract.methods.totalSupply().call();
  //     console.log("total supply", totalSupply)

  //     // Create an array to store the metadata for each token
  //     const tokenMetadata = [];

  //     function ipfs_url_from_hash(h) {
  //       const prefix = "ipfs://";
  //       if (h.startsWith(prefix)) {
  //         h = h.slice(prefix.length);
  //       }
  //       return "https://ipfs.io/ipfs/" + h;
  //     }



  //     // Loop through all token IDs and fetch their metadata
  //     if (totalSupply > 10) {
  //       for (let i = 0; i < 5; i++) {
  //         const tokenId = await contract.methods.tokenByIndex(i).call();
  //         const tokenURI = await contract.methods.tokenURI(tokenId).call();
  //         console.log("tokenURI : ", tokenURI, "tokenId : ", tokenId)
  //         const response = await axios.get(ipfs_url_from_hash(tokenURI));
  //         tokenMetadata.push(response.data);
  //       }
  //     }
  //     else {
  //       for (let i = 0; i < totalSupply; i++) {
  //         const tokenId = await contract.methods.tokenByIndex(i).call();
  //         const tokenURI = await contract.methods.tokenURI(tokenId).call();
  //         console.log("tokenURI : ", tokenURI, "tokenId : ", tokenId)
  //         // const response = await axios.get(tokenURI);
  //         const response = await axios.get(ipfs_url_from_hash(tokenURI));
  //         tokenMetadata.push(response.data);
  //       }
  //     }
  //     console.log("tokenMetadata", tokenMetadata)
  //     console.log("total supply", totalSupply)


  //     // const [actualSrc, setActualSrc] = useState('')
  //     // useEffect(() => {
  //     //     src.then((url) => setActualSrc(url));
  //     // }, [src]);

  //     // Update the state with the NFT collection data
  //     setName(name);
  //     setSymbol(symbol);
  //     setTotalSupply(totalSupply);
  //     setTokenMetadata(tokenMetadata);
  //   }
  //   fetchNFTCollectionData()
  // }, [contractAddress]);

  useEffect(() => {
    async function fetchNFTCollectionData() {
      // setContractAddress(collectionId)
      // Create a new Web3 instance
      // const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      // const provider = new Web3.providers.HttpProvider('https://eth-mainnet.g.alchemy.com/v2/eBUL-V72Vx1618tJLXVlbZmID_MoFvxD');
      const provider = new Web3.providers.HttpProvider('https://mantle-testnet.rpc.thirdweb.com/');
      const web3 = new Web3(provider);


      // Create a contract instance using the address and ABI
      const contract = new web3.eth.Contract(indexerERC721ABI, collectionId);
      console.log("contract", contract)


      // Get the name and symbol of the NFT collection
      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();
      const tokenURI= await contract.methods.balanceOf("0xdeaa150597535Eed8c95Ad090757815F1B9Da15d").call();
    
      console.log("name", name)
      console.log("symbol", symbol)
      console.log(tokenURI)


      // Get the total number of tokens in the collection
      const totalSupply = await contract.methods.totalSupply().call();

      // Create an array to store the metadata for each token
      const tokenMetadata = [];

      function ipfs_url_from_hash(h) {
        const prefix = "ipfs://";
        if (h.startsWith(prefix)) {
          h = h.slice(prefix.length);
        }
        return "https://ipfs.io/ipfs/" + h;
      }

      // Loop through all token IDs and fetch their metadata
      if (totalSupply > 10) {
        for (let i = 0; i < 5; i++) {
          const tokenId = await contract.methods.tokenByIndex(i).call();
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          console.log("tokenURI : ", tokenURI, "tokenId : ", tokenId)
          const response = await axios.get(ipfs_url_from_hash(tokenURI));
          tokenMetadata.push(response.data);
        }
      }
      else {
        for (let i = 0; i < totalSupply; i++) {
          const tokenId = await contract.methods.tokenByIndex(i).call();
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          console.log("tokenURI : ", tokenURI, "tokenId : ", tokenId)
          // const response = await axios.get(tokenURI);
          const response = await axios.get(ipfs_url_from_hash(tokenURI));
          tokenMetadata.push(response.data);
        }
      }
      console.log("tokenMetadata", tokenMetadata)
      console.log("total supply", totalSupply)


      // const [actualSrc, setActualSrc] = useState('')
      // useEffect(() => {
      //     src.then((url) => setActualSrc(url));
      // }, [src]);

      // Update the state with the NFT collection data
      setName(name);
      setSymbol(symbol);
      setTotalSupply(totalSupply);
      setTokenMetadata(tokenMetadata);
      setDisplay(true)
    }

    fetchNFTCollectionData();
  }, [collectionId])

  async function fetchNFTsInWallet(walletAddress) {
    // ?module=account&action=tokenlist&address={addressHash} 
    // use this api to get all the tokens in the wallet 

    const tokenIds = await contract.methods.tokensOfOwner(walletAddress).call();
    const nfts = [];

    for (const tokenId of tokenIds) {
      const tokenURI = await contract.methods.tokenURI(tokenId).call();
      const metadata = await axios.get(tokenURI);
      nfts.push(metadata);
    }

    return nfts;
  }

  // useEffect(() => {
  //   console.log("Router query", router.query)
  //   console.log("Collection id", collectionId)
  //   setContractAddress(collectionId)
  //   console.log("Contract add:", contractAddress)
  //   // function delayedFunction() {
  //   //   setTimeout(() => {
  //   //     fetchNFTCollectionData()
  //   //   }, 5000); // wait for 5000 milliseconds (or 5 seconds)
  //   // }
  //   // delayedFunction();
  // }, [])



  return (
    <div className='h-screen'>
      {/* { fetchNFTCollectionData()} */}
      {/* <Link href="/">
        {collectionId}

      </Link> */}
      {/* <Nftdata/> */}
      {/* <NFTGrid
        data={data}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
        }
      /> */}

      {/*  */}
      <Header />
      {/* <button className='bg-white' onClick={fetchNFTCollectionData}>Load NFTs</button> */}
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=200&q=80'

          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : 'https://cdn-icons-png.flaticon.com/512/6229/6229134.png'
            }
            alt="profile image"
          />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{name}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by{' '}
            <span className="text-[#2081e2]">{collection?.creator}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
            <div className={style.statValue}>{totalSupply}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : ''}
                <FaUserAlt />
              </div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {/* <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                /> */}
                10 BIT
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {/* <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                /> */}
                {collection?.volumeTraded}.5K
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>
      { }
      {display ? <div className="flex bg-black flex-wrap">
        {tokenMetadata.map((metadata,key) =>
          <NFTCard
            key={metadata.id}
            nftItem={metadata}
            title={metadata.name}
            listings={listings}
          />
          // <li key={metadata.id}>

          //   <div>
          //     <IpfsImage hash={metadata.image} alt='my image' className='m-10 mt-2  h-80 w-100 rounded-lg ' onClick={() => { }} />
          //   </div>
          //   <p>{name} #{metadata.id}</p>
          //   {metadata.name} ({metadata.image})
          //   {/* if (Image.startsWith("ipfs://")) {Image = Image.slice("ipfs://".length)} */}
          //   {/* <img src={Image} /> */}
          // </li>
        )
        }
      </div> :
        (
          <div className="flex h-screen flex-wrap">
            <p>Hi display is here</p>
            {/* {nfts.map((nftItem, id) => (
          <NFTCard
            key={metadata.id}
            nftItem={metadata}
        title={metadata.name}
            listings={listings}
          />
        ))} */}


          </div>
        )
      }
    </div >
  )
}

export default Collections