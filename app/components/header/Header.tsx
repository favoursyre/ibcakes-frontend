"use client"
///Header component

///Libraries -->
import Link from 'next/link';
import { useState, useEffect, MouseEvent, FormEvent } from 'react';
import styles from "./header.module.scss"
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { usePathname, useRouter } from 'next/navigation';
import { ICartSpec } from '@/app/utils/interfaces';
import { getItem } from '@/app/utils/clientUtils';

///Commencing the code 

/**
 * @title Header Component
 * @returns The Header component
 */
const Header = () => {
    const [search, setSearch] = useState(false)
    const router = useRouter()
    const [menu, setMenu] = useState(false)
    const [query, setQuery] = useState(String)
    const [cart, setCart] = useState<ICartSpec | null>(getItem("ibCakesCart"))
  //console.log('Current page:', routerPath);

  const menuButton = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, route: string): void => {
    e.preventDefault()

    setMenu(false)
    router.push(route)
  }

  //This handles the search
  const onSearch = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    console.log("clicked")
    router.push(`product/search?query=${query}`)
    console.log("Query: ", query)
    setSearch(false)
    setMenu(false)
    //typeof window !== 'undefined' && window.location ? window.location.reload() : null;
  }

  return (
    <>
        <header className={`${styles.header}`}>
            <div className={styles.logo} onClick={() => router.push('/')}>
                <img
                    src="https://drive.google.com/uc?export=download&id=1ZfcsAOOA2vhkmgIVekY8vetMv__2TN9o"
                    alt=""
                />
            </div>

            <div className={`${styles.category}`} >
                <button onClick={() => router.push('/#about')}><span>About Us</span></button>
                <button onClick={() => router.push('/#products')}><span>Products</span></button>
                <button onClick={() => router.push('/contact')}><span>Contact Us</span></button>
                <button onClick={() => router.push('/order/custom')}><span>Custom Order</span></button>
                <button className={cart ? styles.activeCart : styles.inactiveCart} onClick={() => router.push('/order/cart')}><ShoppingCartIcon /></button>
                <button onClick={() => setSearch(!search)}><SearchIcon /></button>
            </div>
            <div className={`${styles.searchBar} ${!search ? styles.inActiveSearch : ""}`}>
                <form className={`${styles.search_form}`} onSubmit={(e) => onSearch(e)}>
                <input 
                    type="text" 
                    placeholder="Enter keyword" 
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <button>
                    <SearchIcon />
                </button>
                </form>
            </div>
        </header>
        <header className={`${styles.mobileHeader}`}>
            <div className={styles.logo} onClick={() => router.push('/')}>
                <img
                    src="https://drive.google.com/uc?export=download&id=1ZfcsAOOA2vhkmgIVekY8vetMv__2TN9o"
                    alt=""
                />
            </div>
            
            <div className={styles.menu}>
                <button className={cart ? styles.activeCart : ""} onClick={() => router.push('/order/cart')} ><ShoppingCartIcon /></button>
                <button onClick={() => setMenu(true)}><SearchIcon /></button>
                <button onClick={() => setMenu(true)}><MenuIcon /></button>
            </div>
        </header>
        <div className={`${menu ? styles.activeMenu : styles.inActiveMenu}`}>
            <header>
                <div className={styles.icon} onClick={() => setMenu(false)}><CloseIcon /></div>
            </header>
            <div className={styles.searchBar}>
                <form onSubmit={(e) => onSearch(e)}>
                <input 
                    type="text" 
                    placeholder="Enter keyword" 
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <button >
                    <SearchIcon />
                </button>
                </form>
            </div>
            <button onClick={(e) => menuButton(e, "/#about")}><span>About Us</span></button>
            <button onClick={(e) => menuButton(e, "/#products")}><span>Products</span></button>
            <button onClick={(e) => menuButton(e, "/contact")}><span>Contact Us</span></button>
            <button onClick={(e) => menuButton(e, "/order/custom")}><span>Custom Order</span></button>
        </div>
    </>
  );
};

export default Header;