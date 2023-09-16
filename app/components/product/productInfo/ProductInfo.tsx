"use client"
///Product Info component

///Libraries -->
import Link from 'next/link';
import { useState, useEffect, MouseEvent, FormEvent } from 'react';
import styles from "./productInfo.module.scss"
import { usePathname, useRouter } from 'next/navigation';
import { notify, setItem, getItem } from '@/app/utils/clientUtils';
import { capitalizeFirstLetter } from '@/app/utils/utils';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { IProduct, ICartItem, ICartSpec } from '@/app/utils/interfaces';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

///Commencing the code 
/**
 * @title Product Info Component
 * @returns The Product Info component
 */
 const ProductInfo = ({ product_ }: { product_: Array<IProduct> }) => {
    const router = useRouter()
    const [product, setProduct] = useState(product_[0])
    const [minQuantity, setMinQuantity] = useState(product.quantity ? product.quantity : 0)
    const [imageIndex, setImageIndex] = useState(0)
    console.log("Product Info: ", product)
    const [deliveryDate, setDeliveryDate] = useState(String)
  //console.log('Current page:', routerPath);

  ///This reduces the quantity
  const changeQuantity = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, action: string) => {
    e.preventDefault()

    if (product.quantity) {

        switch (action) {
            case "+":
                console.log("add")
                setProduct((p) => ({
                    ...p,
                    quantity: product.quantity ? product.quantity + 1 : 0,
                  }));
                  //setCount()
                  break
            case "-":
                console.log("minus")
                if (minQuantity > (product.quantity - 1)) {
                    notify("error", `${product.quantity} is the minimum quantity of this product`)
                } else {
                    setProduct((p) => ({
                        ...p,
                        quantity: product.quantity ? product.quantity - 1 : 0,
                      }));
                }
                break
            default:
                null
                break
        }
    }
  }

  ///This function handles the button if for the add to cart
  const addToCart = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, checkout: boolean): void => {
    e.preventDefault()

    if (product._id && product.images && product.name && product.price && product.quantity) {
        const cartItem: ICartItem = {
            _id: product._id,
            image: product.images[0],
            name: product.name,
            unitPrice: product.price,
            minQuantity: minQuantity,
            quantity: product.quantity,
            subTotalPrice: product.price * product.quantity
        }
        const totalPrice = cartItem.subTotalPrice
        const cart = getItem("ibCakesCart")

        if (cart) {
            const result = cart.cart.some((cart: ICartItem) => cart._id === product._id);
            
            if (result) {
                const index = cart.cart.findIndex((cart: ICartItem) => cart._id === product._id);

                if (product.quantity === cart.cart[index].quantity) {
                    if (!checkout) {
                        notify('error', "Product has already been added to cart")
                    }
                } else {
                    cart.cart[index].quantity = product.quantity
                    cart.cart[index].subTotalPrice = cart.cart[index].unitPrice * product.quantity
                    cart.totalPrice = cart.cart.reduce((total: number, cart: ICartItem) => total + cart.subTotalPrice, 0);
                    setItem("ibCakesCart", cart)
                    if (!checkout) {
                        notify('success', "Product has been updated to cart")
                    }
                }
            } else {
                cart.totalPrice = cart.totalPrice + totalPrice
                cart.cart.push(cartItem)
                setItem("ibCakesCart", cart)
                if (!checkout) {
                    notify('success', "Product has been added to cart")
                }
            }
        } else {

            const cart: ICartSpec = {
                totalPrice: totalPrice,
                cart: [cartItem]
            }

            setItem("ibCakesCart", cart)
            if (!checkout) {
                notify('success', "Product has been added to cart")
            }
        }

        const _cart_ = getItem("ibCakesCart")
        console.log("IB Cakes: ", _cart_)
    }
  }

  ///This function is triggered when the checkout button is pressed
  const checkout = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
    e.preventDefault()

    //Add the product to cart
    addToCart(e, true)

    //Routing the user to order form
    router.push("/order/cart")
}

  useEffect(() => {
    // This function will be called every time the component is mounted, and
    // whenever the `count` state variable changes
    console.log("main: ", imageIndex)
  }, [imageIndex]);

  ///This increases the quantity
  const increaseQuantity = () => {}

  useEffect(() => {
    document.title = "Product ~ IB Cakes & Catering";

    const currentDate = new Date();
    const nextWeek = new Date(currentDate.getTime() + 8 * 24 * 60 * 60 * 1000);
    const options: Intl.DateTimeFormatOptions = { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = nextWeek.toLocaleDateString('en-US', options);
    console.log("One week from now: ", formattedDate);
    setDeliveryDate(formattedDate)
}, [deliveryDate])

  return (
    <div className={`${styles.main}`} >
        <ToastContainer />
        <div className={styles.imageSection}>
            <div className={styles.mainImage}>
                <img
                    src={product.images ? product.images[imageIndex] : ""}
                    alt=""
                />
            </div>
            <div className={styles.imageList}>
                {product.images?.map((image, id) => (
                    <img
                        className={`${styles.image} ${id === imageIndex ? styles.activeImage : ""}`}
                        onClick={() => setImageIndex(id)}
                        key={id}
                        src={image}
                        alt=""
                    />
                ))}
            </div>
        </div>
        <div className={styles.briefSection}>
            <h3><strong>{capitalizeFirstLetter(product.name)}</strong></h3>
            <div className={styles.description}>
                <span>{product.description}</span>
            </div>
            <div className={styles.price}><span>&#8358;</span> <span>{(product.price)?.toLocaleString("en-US")}</span></div>
            <div className={styles.quantity}>
                <button id={styles.btn1} onClick={(e) => changeQuantity(e, "-")}><RemoveIcon /></button>
                <span>{product.quantity}</span>
                <button id={styles.btn2} onClick={(e) => changeQuantity(e, "+")}><AddIcon /></button>
            </div>
            <span className={styles.deliveryDate}><em>Delivered before {deliveryDate}</em></span>
            <div className={styles.order_cart}>
                <button id={styles.btn1} onClick={(e) => checkout(e)} ><ShoppingCartCheckoutIcon /> <span>Checkout</span></button>
                <button id={styles.btn2} onClick={(e) => {
                    addToCart(e, false)
                    window.location.reload()
                }}><AddShoppingCartIcon /> <span>Add To Cart</span></button>
            </div>
        </div>
    </div>
  );
};

export default ProductInfo;