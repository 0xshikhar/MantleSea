import React, { useState, useEffect } from 'react'
import Web3 from 'web3';
import axios from 'axios';
import { IpfsImage } from 'react-ipfs-image';


export const Nftdata = (props) => {

    // Set up a Web3 provider for the Ethereum mainnet
    // const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/your-infura-project-id');
    // const web3 = new Web3(provider);

    // Define the ABI for the ERC721 standard contract

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

    // Define a function to fetch NFT collection data
    // Define a function to fetch NFT collection data


    const [contractAddress, setContractAddress] = useState(props.contractAddress);
    const [walletAddress, setWalletAddress] = useState('');
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [totalSupply, setTotalSupply] = useState(0);
    const [tokenMetadata, setTokenMetadata] = useState([]);

    async function fetchNFTCollectionData() {
        console.log(contractAddress)
        // Create a new Web3 instance
        // const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        // const provider = new Web3.providers.HttpProvider('https://eth-mainnet.g.alchemy.com/v2/eBUL-V72Vx1618tJLXVlbZmID_MoFvxD');
        const provider = new Web3.providers.HttpProvider('https://mantle-testnet.rpc.thirdweb.com/');
        const web3 = new Web3(provider);


        // Create a contract instance using the address and ABI
        const contract = new web3.eth.Contract(indexerERC721ABI, contractAddress);
        console.log("contract", contract)


        // Get the name and symbol of the NFT collection
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();
        console.log("name", name)
        console.log("symbol", symbol)



        // Get the total number of tokens in the collection
        const totalSupply = await contract.methods.totalSupply().call();
        console.log("total supply", totalSupply)

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
    }

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


    return (
        <div>
            <div className='bg-white'>
                <input type="text" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
                <button onClick={fetchNFTCollectionData}>Fetch</button>



                <p><strong>Name:</strong> {name}</p>
                <p><strong>Symbol:</strong> {symbol}</p>
                <p><strong>Total Supply:</strong> {totalSupply}</p>
                {/* <img src=`ipfs_url_from_hash("ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ")` /> */}
                <ul>
                    {tokenMetadata.map(metadata => <li key={metadata.id}>
                        {/* {setActualSrc(metadata.image)} */}
                        {/* var Image = {metadata.image}; */}
                        <div>
                            <IpfsImage hash={metadata.image} alt='my image' className='m-10 mt-2  h-80 w-100 rounded-lg ' onClick={() => { }} />
                        </div>
                        <p>{name} #{metadata.id}</p>
                        {metadata.name} ({metadata.image})
                        {/* if (Image.startsWith("ipfs://")) {Image = Image.slice("ipfs://".length)} */}
                        {/* <img src={Image} /> */}
                    </li>)}
                </ul>
            </div>

            {/* getting all nfts of wallet address */}
            <div>
                <input type="text" value={walletAddress} onChange={(e) => setContractAddress(e.target.value)} />
                <button onClick={fetchNFTsInWallet}>Fetch</button>


            </div>


        </div>
    );
}

// 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d