import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import mantleSeaLogo from '../assets/msea-black.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { client } from '../lib/databaseClient'


const style = {
    wrapper: `bg-black w-screen px-[1.2rem] py-[0.8rem] flex `,
    logoContainer: `flex items-center cursor-pointer`,
    logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
    searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
    searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
    searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
    headerItems: ` flex items-center justify-end`,
    headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
    headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}

const Header = () => {
    return (
        <div className={style.wrapper}>
            <Link href="/">
                <div className={style.logoContainer}>
                    <Image src={mantleSeaLogo} height={80} width={200} alt="mantle logo" />
                    <div className={style.logoText}></div>
                </div>
            </Link>
            <div className={style.searchBar}>
                <div className={style.searchIcon}>
                    <AiOutlineSearch />
                </div>
                <input
                    className={style.searchInput}
                    placeholder="Search for any NFT Collection on Mantle Chain"
                />
            </div>
            <div className={style.headerItems}>
                <Link href="/collections/0xBF040B410d560285d1dC03661F09de5a783aB562">
                    <div className={style.headerItem}> Collections </div>
                </Link>
                <div className={style.headerItem}> Stats </div>
                <div className={style.headerItem}> Resources </div>
                <div className={style.headerItem}> Create </div>
                <div className={style.headerIcon}>
                    <CgProfile />
                </div>
                <div className={style.headerIcon}>
                    <MdOutlineAccountBalanceWallet />
                </div>
                <div>
                <ConnectButton></ConnectButton>
                </div>
            </div>
        </div>
    )
}

export default Header
