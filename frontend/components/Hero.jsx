import React from 'react'

const style = {
    wrapper: `relative`,
    container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
    contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
    copyContainer: `w-1/2`,
    title: `relative text-white text-[46px] font-semibold`,
    description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
    ctaContainer: `flex`,
    accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#adff01] rounded-lg mr-5 text-black hover:bg-[#2b9348] cursor-pointer`,
    button: ` relative text-lg font-semibold px-12 py-4 bg-white rounded-lg mr-5 text-black hover:bg-[#f0f0f0] cursor-pointer`,
    cardContainer: `rounded-[3rem]`,
    infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
    author: `flex flex-col justify-center ml-4`,
    name: ``,
    infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}

const Hero = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.contentWrapper}>
                    <div className={style.copyContainer}>
                        <div className={style.title}>
                            Discover, collect, and sell extraordinary NFTs
                        </div>
                        <div className={style.description}>
                            MantleSea is the first NFT marketplace on Mantle Blockchain.
                        </div>
                        <div className={style.ctaContainer}>
                            <button className={style.accentedButton}>Explore</button>
                            <button className={style.button}>Create</button>
                        </div>
                    </div>
                    <div className={style.cardContainer}>
                        <img
                            className="rounded-t-lg"
                            src="https://i.seadn.io/gcs/files/383ab679b9b0be2c519c5c808a3caa6c.png?auto=format&w=400"
                            alt=""
                        />
                        <div className={style.infoContainer}>
                            <img
                                className="h-[2.25rem] rounded-full"
                                src="https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=384"
                                alt=""
                            />
                            <div className={style.author}>
                                <div className={style.name}>Doodles</div>
                                <a
                                    className="text-[#1868b7]"
                                    href="http://localhost:3000/collections/doodles-official"
                                >
                                    By Doodles_LLC

                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero