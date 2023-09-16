"use client"
///Product Search component

///Libraries -->
import { useState, useEffect, MouseEvent, FormEvent } from 'react';
import styles from "./productSearch.module.scss"
import { usePathname, useRouter } from 'next/navigation';
import { capitalizeFirstLetter } from '@/app/utils/utils';
import ReportIcon from '@mui/icons-material/Report';
import InventoryIcon from '@mui/icons-material/Inventory';
import { IProduct } from '@/app/utils/interfaces';

///Commencing the code 

/**
 * @title Product Search Component
 * @returns The Product Search component
 */
 const ProductSearch = ({ keyword_, query_ }: { keyword_: string | string[] | undefined, query_: Array<IProduct> }) => {
    const router = useRouter()
    const [keyword, SetKeyword] = useState(keyword_)
    const [foundProducts, setFoundProducts] = useState(query_)
    const [currentURL, setCurrentURL] = useState(window.location.href)
  //console.log("Found Products: ", foundProducts)

  useEffect(() => {
    const intervalId = setInterval(() => {
        if (currentURL === window.location.href) {
            //console.log('not changed')
            undefined
        } else {
            //console.log("changed")
            clearInterval(intervalId)
            setCurrentURL(window.location.href)
           window.location.reload()
        }
        
    }, 1000);

    return () => clearInterval(intervalId);
}, [currentURL]);

  ///This function triggers when handle click is clicked
  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: string | undefined): void => {
    e.preventDefault()

    router.push(`/product/${id}`);
  }

  return (
    <div className={`${styles.main}`} >
        {foundProducts && foundProducts.length > 0 ? (
            <div className={styles.activeState}>
                <span className={styles.brief}>{foundProducts?.length} product{foundProducts.length > 1 ? "s": ""} found that matched <strong>&apos;{keyword}&apos;</strong></span>
                <div className={styles.productGrid}>
                {foundProducts && foundProducts.map((product, pid) => (
                    <div className={styles.carousel} key={pid} onClick={event => handleClick(event, product._id)}>
                        <img
                            src={product.images ? product.images[0] : ""}
                            alt=""
                        />
                        <div className={styles.name_price_order}>
                            <p className={styles.name}>{capitalizeFirstLetter(product.name)}</p>
                            <div className={styles.price_order}>
                                <div className={styles.price}>
                                    <p>&#8358; {product.price ? (product.price).toLocaleString("en-US") : 0}</p>
                                </div>
                                <button className={styles.order}>
                                    <span>Order Now {">"}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        ) : (
            <div className={styles.emptyState}>
                <div className={styles.icon}>
                    <ReportIcon style={{ fontSize: '5rem' }} />
                </div>
                <span className={styles.brief}>There are no results for <strong>&apos;{keyword}&apos;</strong></span>
                <span className={styles.brief}>- Check for spelling errors</span>
                <span className={styles.brief}>- Try searching with short and simple keywords</span>
                <span className={styles.brief}>- Try searching for more general terms</span>
                <button onClick={() => router.push("#products")}>
                    <InventoryIcon />
                    <span>View Our Products</span>
                </button>
            </div>
        )}
    </div>
    );
};

export default ProductSearch;