"use client"
///Similar Product component

///Libraries -->
import { useState, useEffect } from 'react';
import styles from "./similarProduct.module.scss"
import { usePathname, useRouter } from 'next/navigation';
import { routeStyle, getItemsByKey, capitalizeFirstLetter } from '@/app/utils/utils';
import { IProduct } from '@/app/utils/interfaces';

///Commencing the code 
/**
 * @title Similar Product Component
 * @returns The Similar Product component
 */
 const SimilarProduct = ({ product_, category, page_ }: { product_: Array<IProduct>, category: string | null, page_: string | void}) => {
    const router = useRouter()
    const routerPath = usePathname();
    const [page, setPage] = useState(page_)
    const [similarProducts, setSimilarProducts] = useState(product_)
    const [lastIndex, setLastIndex] = useState(6)
  //console.log('Current page:', routerPath);

  ///This sets the index number for product carousel slides
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (screen.width <= 550) {
        setLastIndex(4)
      } else {
        setLastIndex(6)
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lastIndex]);

  return (
    <div className={`${styles.main} ${routeStyle(routerPath, styles)}`} >
        <div className={styles.heading}>
            <span>{page && page === "cartOrder" ? "Hot Selling Products" : "Simliar Products"}</span>
            <button onClick={() => router.push('/#products')}><span>See more {">"}</span></button>
        </div>
        <div className={styles.slide}>
            {getItemsByKey(similarProducts, "category", category).slice(0, lastIndex).map((product, pid) => (
                <div className={styles.carousel} key={pid} onClick={() => router.push(`/product/${product._id}`)}>
                    <img
                        src={product.images[0]}
                        alt=""
                    />
                    <div className={styles.name_price_order}>
                        <p className={styles.name}>{capitalizeFirstLetter(product.name)}</p>
                        <div className={styles.price_order}>
                            <div className={styles.price}>
                                <p>&#8358; {(product.price).toLocaleString("en-US")}</p>
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
  );
};

export default SimilarProduct;