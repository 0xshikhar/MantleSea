import styles from "../styles/Home.module.css";
import InstructionsComponent from "../components/InstructionsComponent";
import NftGallery from "../components/nftGallery.jsx";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <InstructionsComponent>
        <NftGallery collectionAddress={"0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"} chain={"ETH_MAINNET"}></NftGallery>
        </InstructionsComponent>
      </main>
    </div>
  );
}
