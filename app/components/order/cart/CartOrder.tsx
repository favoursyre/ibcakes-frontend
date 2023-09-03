"use client"
///Order component

///Libraries -->
import Link from 'next/link';
import { useState, useEffect, MouseEvent, FormEvent, useRef, ChangeEvent } from 'react';
import styles from "./cartOrder.module.scss"
import { usePathname, useRouter } from 'next/navigation';
import { notify, setItem, getItem } from '@/app/utils/clientUtils';
import { backend, capitalizeFirstLetter, insertSpace } from '@/app/utils/utils';
import validator from 'validator';
import RemoveIcon from "@mui/icons-material/Remove";
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ICartSpec, ICartItem, ICartOrder, IPayment, ICustomerSpec } from '@/app/utils/interfaces';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from "@mui/icons-material/Add";

///Commencing the code 
/**
 * @title Order Component
 * @returns The Order component
 */
const Order = () => {
    const [cart, setCart] = useState<ICartSpec | null>(getItem("ibCakesCart"))
    const router = useRouter()
    const [fullName, setFullName] = useState<string | undefined>("");
    const [emailAddress, setEmailAddress] = useState<string | undefined>("");
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
    const [deliveryAddress, setDeliveryAddress] = useState<string | undefined>("");
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [deleteIndex, setDeleteIndex] = useState<number>(Number)
    const [paymentModal, setPaymentModal] = useState<boolean>(false)
    const [paymentInfo, setPaymentInfo] = useState<IPayment | undefined>({ })
    const [url, setUrl] = useState<string>("");
    const [cartId, setCartId] = useState<string | undefined>("")
  //console.log('Current page:', routerPath);
  const containerRef = useRef<HTMLDivElement>(null);

  const routerPath = usePathname()

    console.log("Router: ", routerPath)

  // useEffect(() => {
  //   // Create a variable to hold the interval ID
  //   let intervalId: NodeJS.Timer;

  //   const incrementCounter = () => {
  //     setCounter((prevCounter) => prevCounter + 1);
  //   };

  //   // Start the interval
  //   intervalId = setInterval(incrementCounter, 1000);
  //   console.log('Timer: ', counter)

  //   // Stop the interval when the condition is met
  //   if (counter >= 10) {
  //     clearInterval(intervalId);
  //     console.log("counter ended")
  //   }

  //   // Cleanup function to clear the interval when the component is unmounted
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [counter]); // Add counter as a dependency to watch for changes

  useEffect(() => {
    document.title = "Cart ~ IB Cakes & Catering";
    const container = containerRef.current;
    const text = container?.textContent;

    if (container && screen.width <= 550) {
      container.textContent = text?.trim().slice(0, -3) + "...";
    }

    
  }, []);

  //console.log("Date: ", Date.now())

  useEffect(() => {

    let intervalId: NodeJS.Timer;
    
    intervalId = setInterval(() => {
      const checkPaymentStatus = async (reference: string) => {
        try {
          const res = await fetch(`${backend}/user/dashboard/payment/verify/${reference}`, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
          });
          
        const data = await res.json();
  
        console.log("Status: ", data);
        setPaymentInfo((info) => ({
          ...info,
          status: data.status
        }))
        //window.location.href = data;
        //notify("success", `Your order was sent successfully`)
        //setItem("ibCakesOrder", order)
      
        } catch (error) {
            console.log("error: ", error)
            notify("error", `${error}`)
        }
      }
     
      if (paymentInfo && paymentInfo.reference) {
        checkPaymentStatus(paymentInfo.reference)

        // if (paymentInfo.status === "success" || paymentInfo.status === "failed") {
        //   //clearInterval(interval);
        //   console.log('Interval stopped')
        //   return
        // }
      }
      //console.log("Payment info: ", paymentInfo)
      //console.log('Url: ', url)
        //console.log("cart has changed")
      }, 3000);

    if (paymentInfo) {
      if (paymentInfo.status === "success") {
        clearInterval(intervalId);
        console.log('Interval stopped')
        submitCartOrder()
      } else if (paymentInfo.status === "failed") {
        clearInterval(intervalId);
        console.log('Interval stopped')
      }
    }
  
    return () => {
      clearInterval(intervalId);
    };
    
  }, [paymentInfo]);

  //console.log("Payment info 1: ", paymentInfo)


  ///This function is triggered when the user wants to checkout
  const checkout = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (cart) {
      ///Validating the required args
      if (!fullName) {
        notify("error", "Fullname is required")
        return
      } else if (!phoneNumber) {
          notify("error", "Phone number is required")
          return
      } else if (!emailAddress) {
          notify("error", "Email address is required")
          return
      } else if (!validator.isEmail(emailAddress)) {
          notify("error", "Email address is not valid")
          return
      } else if (!deliveryAddress) {
          notify("error", "Delivery address is required")
          return
      }

      setPaymentModal(() => true)
      try {
        //console.log('Clicked')
        const name = fullName
        const email = emailAddress
        const amount = cart.totalPrice
        //const paymentSpec: IDebitCard = debitCard
        const paymentInfo_ = { name, email, amount }
        console.log("Order: ", paymentInfo_)
        const res = await fetch(`${backend}/user/dashboard/payment/initialize`, {
            method: 'POST',
            body: JSON.stringify(paymentInfo_),
            headers: {
            'Content-Type': 'application/json',
            },
        });
        
      const data = await res.json();

      console.log("Data: ", data);
      console.log('test: ', data.authorization_url)
      //window.location.href = data;
      //notify("success", `Your order was sent successfully`)
      const info: IPayment = {
        reference: data.reference,
        url: data.authorization_url,
        accessCode: data.access_code
      }
      console.log('Info: ', info)
      setPaymentInfo(() => ({ ...info }))
      console.log("Payment info: ", paymentInfo)
      
      
      console.log('Url: ', url)
      window.open(data.authorization_url, "_blank")
      //setItem("ibCakesOrder", order)
    
      } catch (error) {
          console.log("error: ", error)
          notify("error", `${error}`)
      }
    } else {
      notify("error", "Your cart is empty")
    }
    
  }

  ///This function is triggered when the submit cart order button is clicked
  const submitCartOrder = async (): Promise<void> => {

      //Send the order to the backend
      if (fullName && emailAddress && phoneNumber && deliveryAddress && cart && paymentInfo) {
        try {
          //console.log('Clicked')
          const customerSpec: ICustomerSpec = {fullName, emailAddress, phoneNumber, deliveryAddress}
          const productSpec: ICartSpec = cart
          const paymentSpec: IPayment = paymentInfo
          const order: ICartOrder = { customerSpec, productSpec, paymentSpec }
          console.log("Order: ", order)
          const res = await fetch(`${backend}/user/dashboard/order/cart`, {
              method: 'POST',
              body: JSON.stringify(order),
              headers: {
              'Content-Type': 'application/json',
              },
          });
          
        const data = await res.json();
  
        console.log("Data: ", data);
        setCartId(() => data._id)
        //notify("success", `Your order was sent successfully`)
        //setItem("ibCakesOrder", order)
      
        } catch (error) {
            console.log("error: ", error)
            notify("error", `${error}`)
        }
  
        //Clear the cart
        const _cart_: ICartSpec = {
            totalPrice: 0,
            cart: []
        }
  
        setItem("ibCakesCart", _cart_)
      }
  }

  ///This function either increases or decreases the quantity
  const changeQuantity = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, action: string, cartIndex: number): void => {
    e.preventDefault()

    if (cart !== null) {

      switch (action) {
          case "+":
              console.log("add")
              cart.cart[cartIndex].quantity = cart.cart[cartIndex].quantity + 1
              cart.cart[cartIndex].subTotalPrice = cart.cart[cartIndex].quantity * cart.cart[cartIndex].unitPrice
              cart.totalPrice = Number((cart.cart.reduce((total: number, cart: ICartItem) => total + cart.subTotalPrice, 0)).toFixed(2));
              setCart(() => ({ ...cart }));
              setItem("ibCakesCart", cart)
                break
          case "-":
              console.log("minus")
              if (cart.cart[cartIndex].minQuantity > (cart.cart[cartIndex].quantity - 1)) {
                  notify("error", `${cart.cart[cartIndex].minQuantity} is the minimum quantity of this product`)
              } else {
                cart.cart[cartIndex].quantity = cart.cart[cartIndex].quantity - 1
                cart.cart[cartIndex].subTotalPrice = cart.cart[cartIndex].quantity * cart.cart[cartIndex].unitPrice
                cart.totalPrice = Number((cart.cart.reduce((total: number, cart: ICartItem) => total + cart.subTotalPrice, 0)).toFixed(2));
                //setCart(cart);
                setCart(() => ({ ...cart }));
                setItem("ibCakesCart", cart)
              }
              break
          default:
              null
              break
      }

      const _cart_ = getItem("ibCakesCart")
      console.log("IB Cakes: ", _cart_)
  }
  }

  ///This function handles the deletion of a cart in the cart list
  const deleteItem = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, index: number | null, action: number): void => {
    e.preventDefault()

    if (action === 0 && index !== null) { ///This represents the first remove button
      setDeleteIndex(index)
      setDeleteModal(true)
    } else if (action === 1 && cart !== null) { ///This represents the final remove button
        console.log("Cart Index: ", deleteIndex)
        cart?.cart.splice(deleteIndex, 1)
        cart.totalPrice = Number((cart.cart.reduce((total: number, cart: ICartItem) => total + cart.subTotalPrice, 0)).toFixed(2));
        console.log("Updated Cart: ", cart)
        setCart(() => ({ ...cart }));
        setItem("ibCakesCart", cart)
        setDeleteModal(false)
        null
    }
  } 

  ///Close payment modal button
  const closePaymentModal = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
    e.preventDefault()

    setPaymentModal(() => false)
    setPaymentInfo(() => (undefined))
    typeof window !== 'undefined' && window.location ? window.location.reload() : null;
  }

  return (
    <>
    <div className={`${styles.main}`}>
      <ToastContainer />
      {cart && cart.cart.length > 0 ? (
        <div className={styles.activeCart}>
        <div className={styles.summary}>
            <div className={styles.cartHeading}>
              <h3>
                <strong>
                    Cart Summary
                </strong>
              </h3>
            </div>
            <div className={styles.cartList}>
              {cart?.cart.map((c, id) => (
                <div className={styles.cartItem} key={id}>
                <div className={styles.image}>
                  <img
                      src={c.image}
                      alt=""
                  />
                </div>
                <div className={styles.name}>
                  <span>{capitalizeFirstLetter(c.name)}</span>
                </div>
                <div className={styles.quantity}>
                    <button id={styles.btn1} onClick={(e) => changeQuantity(e, "-", id)}><RemoveIcon style={{ fontSize: "1rem" }} /></button>
                    <span>{c.quantity}</span>
                    <button id={styles.btn2} onClick={(e) => changeQuantity(e, "+", id)}><AddIcon style={{ fontSize: "1rem" }} /></button>
                </div>
                <button className={styles.delete} onClick={(e) => deleteItem(e, id, 0)}>
                  <span>Delete</span>
                </button>
                <div className={styles.price}>
                  <span>&#8358;</span> 
                  <span>{(c.subTotalPrice).toLocaleString("en-US")}</span>
                </div>
              </div>
              ))}
              
            </div>
            <div className={styles.cartDeliveryFee}>
              <span className={styles.title}>Delivery Fee</span>
              <div className={styles.price}>
                  <span>&#8358;</span> 
                  <span>1000</span>
              </div>
            </div>
            <div className={styles.cartTotal}>
              <span className={styles.title}>Total</span>
              <div className={styles.price}>
                  <span>&#8358;</span> 
                  <span>{(cart?.totalPrice)?.toLocaleString("en-US")}</span>
              </div>
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.formHeading}>
              <h3>
                <strong>
                    Personal Information
                </strong>
              </h3>
            </div>
            <form onSubmit={(e) => checkout(e)}>
              <label>Full Name</label>
              <input
                  placeholder="Enter your full name"
                  type="text"
                  onChange={(e) => setFullName(capitalizeFirstLetter(e.target.value))}
                  value={fullName}
              />
              <br />
              <label>Phone Number (+234)</label>
              <input
                  placeholder="Enter your phone number"
                  type="tel"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
              />
              <br />
              <label>Email Address</label>
              <input
                  placeholder="Enter your email address"
                  type="email"
                  onChange={(e) => setEmailAddress(e.target.value)}
                  value={emailAddress}
              />
              <br />
              <label>Delivery Address</label>
              <input
                  placeholder="Enter your delivery address"
                  type="text"
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  value={deliveryAddress}
              />
              <br />
              <button>
                <PaymentIcon />
                <span>Pay</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <div className={styles.logo}>
            <ProductionQuantityLimitsIcon style={{ fontSize: '5rem' }} />
          </div>
          <span className={styles.brief_1}>Your cart is empty !</span>
          <span className={styles.brief_2}>Explore our wide range of products and uncover our unbeatable offers</span>
          <button onClick={() => router.push("#products")}>
            <ShoppingCartIcon />
            <span>Start Shopping</span>
          </button>
        </div>
      )}
    </div>
    <div className={`${styles.deleteModal} ${!deleteModal ? styles.inActiveDeleteModal : ""}`}>
        <div className={styles.mainModal}>
          <div className={styles.header}>
            <span>Remove from cart</span>
            <button onClick={() => setDeleteModal(false)}><CloseIcon /></button>
          </div>
          <span className={styles.body}>Are you sure you want to delete this item from your cart?</span>
          <button onClick={e => deleteItem(e, null, 1)} className={styles.deleteButton}>
              <span>Delete</span>
          </button>
        </div>
      </div>
    <div className={`${styles.paymentModal} ${!paymentModal ? styles.inActivePaymentModal : ""}`}>
    <div className={styles.container}>
      {paymentInfo && paymentInfo.status ? 
          paymentInfo.status === "success" ? (
            <>
              <header>
                <button onClick={(e) => closePaymentModal(e)}><CloseIcon className={styles.close} /></button>
              </header>
              <span className={styles.success}>Thanks for ordering. <br/> <br /> Your payment was successful and your order has been successfully sent</span>
              <button onClick={() => router.push(`/order/cart/${cartId}`)}><span>View Receipt</span></button>
              </>
        ) : paymentInfo.status === "failed" ? (
          <>
            <header>
              <button onClick={(e) => closePaymentModal(e)}><CloseIcon className={styles.close}  /></button>
            </header>
            <span>Your payment wasn&apos;t successful, try again</span>
          </>
        ) : (
          <>
            <span>Processing payment...</span>
            <div className={styles.circle}></div>
          </>
        ) : (
          <>
            <span>Processing payment...</span>
            <div className={styles.circle}></div>
          </>
        )}
      
    </div>
  </div>
  </>
  );
};

export default Order;