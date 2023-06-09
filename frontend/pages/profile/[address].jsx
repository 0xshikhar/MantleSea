import {
  useContract,
  useOwnedNFTs,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import Container from "../../components/Container/Container";
import ListingWrapper from "../../components/ListingWrapper/ListingWrapper";
import NFTGrid from "../../components/NFT/NFTGrid";
import Skeleton from "../../components/Skeleton/Skeleton";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../chains/mantle";

import styles from "../../styles/Profile.module.css";
import randomColor from "../../util/randomColor";
import Header from "../../components/Header";


const [randomColor1, randomColor2, randomColor3, randomColor4] = [
  randomColor(),
  randomColor(),
  randomColor(),
  randomColor(),
];



export default function ProfilePage() {
  const router = useRouter();
  // const [tab, setTab] = useState<"nfts" | "coins" | "listings" | "auctions">("nfts");
  const [tab, setTab] = useState("nfts");
  const [data, setData] = useState([]);
  const address = router.query.address;

  console.log("address", address)

  // getting wallet data from mantle chain explorer


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://explorer.testnet.mantle.xyz/api?module=account&action=tokenlist&address=${router.query.address}`);
      const jsonData = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("JSON DATA", jsonData)
      setData(jsonData);
    };
    fetchData();
  }, [address]);




  // const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  // const { contract: marketplace } = useContract(
  //   MARKETPLACE_ADDRESS,
  //   "marketplace-v3"
  // );

  // const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
  //   nftCollection,
  //   router.query.address as string
  // );

  // const { data: directListings, isLoading: loadingDirects } =
  //   useValidDirectListings(marketplace, {
  //     seller: router.query.address as string,
  //   });

  // const { data: auctionListings, isLoading: loadingAuctions } =
  //   useValidEnglishAuctions(marketplace, {
  //     seller: router.query.address as string,
  //   });

  return (
    <div className="pt-4 h-full text-white bg-black">
      <Header />
      <div className="px-6 pt-4">
        <div
          className={styles.coverImage}
          style={{
            background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
          }}
        />
        <div
          className={styles.profilePicture}
          style={{
            background: `linear-gradient(90deg, ${randomColor3}, ${randomColor4})`,
          }}
        />
        <h1 className={styles.profileName}>
          <div>0xshikhar.eth</div>
          {router.query.address}
          {/* {router.query.address ? (
            router.query.address.toString().substring(0, 4) +
            "..." +
            router.query.address.toString().substring(38, 42)
          ) : (
            <Skeleton width="320" />
          )} */}
        </h1>
      </div>
      <div className="mx-10 pb-9">
        <div className={styles.tabs}>
          <h3
            className={`${styles.tab} 
        ${tab === "nfts" ? styles.activeTab : ""}`}
            onClick={() => setTab("nfts")}
          >
            NFTs
          </h3>
          <h3
            className={`${styles.tab} 
        ${tab === "coins" ? styles.activeTab : ""}`}
            onClick={() => setTab("coins")}
          >
            Coins
          </h3>
          <h3
            className={`${styles.tab} 
        ${tab === "listings" ? styles.activeTab : ""}`}
            onClick={() => setTab("listings")}
          >
            Listings
          </h3>
          <h3
            className={`${styles.tab}
        ${tab === "auctions" ? styles.activeTab : ""}`}
            onClick={() => setTab("auctions")}
          >
            Auctions
          </h3>
        </div>

        <div
          className={`${tab === "nfts" ? styles.activeTabContent : styles.tabContent
            }`}
        >

          {data?.status == "0" ? <div>loading...</div> :
            <div className="overflow-x-auto w-full h-full m-2  bg-black text-white">
              <table className="table-auto w-full bg-black text-white">
                <thead>
                  <tr>
                    <th>NFT Collection Name</th>
                    <th>Symbol</th>
                    <th>Quantity</th>
                    <th>Contract Address</th>
                  </tr>
                </thead>

                {/* row 1 */}

                {data.result?.map((item, id) =>
                (item.type == 'ERC-721' ?
                  <tbody>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.symbol}</td>
                      <td>{item.balance}</td>
                      <td>{item.contractAddress}</td>
                      <button onClick={() => {
                        router.push(`/user/${item.contractAddress}`);
                      }} className="text-white px-2">View NFTs</button>
                      {/* <Link href="">
                      <button>See NFTs</button>
                    </Link> */}
                    </tr>
                  </tbody>
                  : ' '
                ))
                }
                {/* </tr> */}
                {/* </tbody> */}
              </table>
            </div>
            // <div>
            //   <ul>
            //     {data.result?.map((item, id) => (item.type == 'ERC-721' ? <li key={id}>{item.name}</li> : ' '))
            //     }
            //   </ul>
            // </div>
          }

          {/* <NFTGrid
          data={ownedNfts}
          isLoading={loadingOwnedNfts}
          emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
        /> */}
        </div>

        <div
          className={`${tab === "coins" ? styles.activeTabContent : styles.tabContent
            }`}
        >

          {data?.status == "0" ? <div>loading...</div> :

            <div className="overflow-x-auto w-full h-full m-2  bg-black text-white">
              <table className="table-auto w-full bg-black text-white">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Contract Address</th>
                    <th>Balance</th>
                    <th>Decimal Places</th>
                  </tr>
                </thead>

                {/* row 1 */}

                {data.result?.map((item, id) =>
                (item.type == 'ERC-20' ?
                  <tbody>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.symbol}</td>
                      <td>{item.contractAddress}</td>
                      <td>{item.balance}</td>
                      <td>{item.decimals}</td>
                    </tr>
                  </tbody>

                  : ' '
                ))
                }
                {/* </tr> */}
                {/* </tbody> */}
              </table>
            </div>
          }

        </div>
      </div>

      {/* 
      <div
        className={`${tab === "listings" ? styles.activeTabContent : styles.tabContent
          }`}
      >
        {loadingDirects ? (
          <p>Loading...</p>
        ) : directListings && directListings.length === 0 ? (
          <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
        ) : (
          directListings?.map((listing) => (
            <ListingWrapper listing={listing} key={listing.id} />
          ))
        )}
      </div> */}

      {/* <div
        className={`${tab === "auctions" ? styles.activeTabContent : styles.tabContent
          }`}
      >
        {loadingAuctions ? (
          <p>Loading...</p>
        ) : auctionListings && auctionListings.length === 0 ? (
          <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
        ) : (
          auctionListings?.map((listing) => (
            <ListingWrapper listing={listing} key={listing.id} />
          ))
        )}
      </div> */}

      {/* creating popup modal for listing nfts in wallet */}
      {/* <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal text-black">
        <div className="modal-box w-11/12 max-w-5xl">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
          <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
        </div>
      </div> */}
    </div>
  );
}

// import {
//   useContract,
//   useOwnedNFTs,
//   useValidDirectListings,
//   useValidEnglishAuctions,
// } from "@thirdweb-dev/react";
// import { useRouter } from "next/router";
// import React, { useState } from "react";
// // import Container from "../../components/Container/Container";
// import ListingWrapper from "../../components/ListingWrapper/ListingWrapper";
// import NFTGrid from "../../components/NFT/NFTGrid";
// import Skeleton from "../../components/Skeleton/Skeleton";
// import {
//   MARKETPLACE_ADDRESS,
//   NFT_COLLECTION_ADDRESS,
// } from "../../chains/mantle";
// import styles from "../../styles/Profile.module.css";
// import randomColor from "../../util/randomColor";

// const [randomColor1, randomColor2, randomColor3, randomColor4] = [
//   randomColor(),
//   randomColor(),
//   randomColor(),
//   randomColor(),
// ];

// export default function ProfilePage() {
//   const router = useRouter();
//   const [tab, setTab] = useState<"nfts" | "listings" | "auctions">("nfts");

//   const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

//   const { contract: marketplace } = useContract(
//     MARKETPLACE_ADDRESS,
//     "marketplace-v3"
//   );

//   const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
//     nftCollection,
//     router.query.address as string
//   );

//   const { data: directListings, isLoading: loadingDirects } =
//     useValidDirectListings(marketplace, {
//       seller: router.query.address as string,
//     });

//   const { data: auctionListings, isLoading: loadingAuctions } =
//     useValidEnglishAuctions(marketplace, {
//       seller: router.query.address as string,
//     });

//   return (
//     <div>
//       <div className={styles.profileHeader}>
//         <div
//           className={styles.coverImage}
//           style={{
//             background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
//           }}
//         />
//         <div
//           className={styles.profilePicture}
//           style={{
//             background: `linear-gradient(90deg, ${randomColor3}, ${randomColor4})`,
//           }}
//         />
//         <h1 className={styles.profileName}>
//           {router.query.address ? (
//             router.query.address.toString().substring(0, 4) +
//             "..." +
//             router.query.address.toString().substring(38, 42)
//           ) : (
//             <Skeleton width="320" />
//           )}
//         </h1>
//       </div>

//       <div className={styles.tabs}>
//         <h3
//           className={`${styles.tab}
//         ${tab === "nfts" ? styles.activeTab : ""}`}
//           onClick={() => setTab("nfts")}
//         >
//           NFTs
//         </h3>
//         <h3
//           className={`${styles.tab}
//         ${tab === "listings" ? styles.activeTab : ""}`}
//           onClick={() => setTab("listings")}
//         >
//           Listings
//         </h3>
//         <h3
//           className={`${styles.tab}
//         ${tab === "auctions" ? styles.activeTab : ""}`}
//           onClick={() => setTab("auctions")}
//         >
//           Auctions
//         </h3>
//       </div>

//       <div
//         className={`${
//           tab === "nfts" ? styles.activeTabContent : styles.tabContent
//         }`}
//       >
//         <NFTGrid
//           data={ownedNfts}
//           isLoading={loadingOwnedNfts}
//           emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
//         />
//       </div>

//       <div
//         className={`${
//           tab === "listings" ? styles.activeTabContent : styles.tabContent
//         }`}
//       >
//         {loadingDirects ? (
//           <p>Loading...</p>
//         ) : directListings && directListings.length === 0 ? (
//           <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
//         ) : (
//           directListings?.map((listing) => (
//             <ListingWrapper listing={listing} key={listing.id} />
//           ))
//         )}
//       </div>

//       <div
//         className={`${
//           tab === "auctions" ? styles.activeTabContent : styles.tabContent
//         }`}
//       >
//         {loadingAuctions ? (
//           <p>Loading...</p>
//         ) : auctionListings && auctionListings.length === 0 ? (
//           <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
//         ) : (
//           auctionListings?.map((listing) => (
//             <ListingWrapper listing={listing} key={listing.id} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
