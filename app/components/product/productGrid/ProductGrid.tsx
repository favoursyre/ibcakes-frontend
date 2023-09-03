"use client"
///Product component

///Libraries -->
import { useState, useEffect, MouseEvent, FormEvent } from 'react';
import styles from "./productGrid.module.scss"
import { usePathname, useRouter } from 'next/navigation';
import { IProduct } from '@/app/utils/interfaces';
import { sortOptions, backend, getItemsByKey, capitalizeFirstLetter } from '@/app/utils/utils';
import FilterListIcon from '@mui/icons-material/FilterList';

///Commencing the code 
/**
 * @title Product Component
 * @returns The _Product component
 */
const ProductGrid = ({ product_ }: { product_: Array<IProduct> }) => {
    const router = useRouter()
    const [sort, setSort] = useState(false)
    const [sortId, setSortId] = useState(1)
    const [productList, setProductList] = useState<Array<IProduct>>(product_)
    console.log("Product: ", productList)
    const [category, setCategory] = useState('Cake')
  //console.log('Capitalize:', capitalizeFirstLetter("i ate beans"));

  ///This handles what happens when a product is clicked
  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: string) => {
    e.preventDefault()
    
    router.push(`/product/${id}`);
}

  ///This function filters the products
  const filterProduct = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, sort: number): Promise<void> => {
    e.preventDefault()
    setSort(false)
    setSortId(sort)

    if (sort === 1 || sort === 2 || sort === 3) {
        try {
            const response = await fetch(
                `${backend}/products/sort/${sort}`,
                {
                  next: {
                    revalidate: 60,
                  },
                }
              );
              await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
            
              const products = await response.json();
              setProductList(products)
        } catch (error) {
            console.error(error);
        }
    } else {
        null
    }
}

  return (
    <div className={`${styles.main}`} id="products">
        <div className={`${styles.product_brief} `}>
            <h2>
                <strong>Products</strong>
            </h2>
            <p>We have got you covered with our varieties, make your choice</p>
        </div>
        <div className={styles.buttons} >
            <button className={category === "Cake" ? styles.activeButton : styles.inActiveButton} id={styles.btn1} onClick={() => setCategory("Cake")}>
                <img
                    src="https://drive.google.com/uc?export=download&id=1Xpow0GZp30kUx5RMBOs9GaQ7FaEzax-h"
                    alt=""
                />
                <span className="carousel_text_cakes">Cakes</span>
            </button>
            <button className={category === "Pastry" ? styles.activeButton : styles.inActiveButton} id={styles.btn2} onClick={() => setCategory("Pastry")}>
                <img
                    src="https://drive.google.com/uc?export=download&id=1N8Yk55f0ymS0lhLKdI3znrzHL1jtHrnd"
                    alt=""
                />
                <span className="carousel_text_pastries">Pastries</span>
            </button>
        </div>
        <div className={styles.option}>
          <div className={styles.sort}>
            <button onClick={() => setSort(!sort)}><FilterListIcon /></button>
            <span>Sort</span>
            <div className={`${styles.sortOption} ${!sort ? styles.inactiveSort : ""}`}>
              {sortOptions.map((option, _id) => (
                    <button key={_id} className={sortId === option.id ? styles.activeSortButton : styles.inActiveSortButton} onClick={(e) => filterProduct(e, option.id)}>{option.name}</button>
                ))}
            </div>
          </div>
        </div>
        <div className={styles.product_grid}>
            {getItemsByKey(productList, "category", category).map((product, pid) => (
                <div className={styles.carousel} key={pid} onClick={(e) => handleClick(e, product._id)}>
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

export default ProductGrid;