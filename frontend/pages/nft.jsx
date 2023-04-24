import styles from "../styles/Home.module.css";
import InstructionsComponent from "../components/InstructionsComponent";
import NFTlisting from "../components/nftListing";

export default function NFT() {
    return (
        <div>
            <main>
                <h1 className="text-3xl bg-white font-bold underline">
                    Hello world!
                </h1>
                <NFTlisting />

            </main>
        </div>
    );
}
