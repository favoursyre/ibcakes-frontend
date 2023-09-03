///This handles the order page

///Libraries -->
import Order from "../../components/order/cart/CartOrder"
import SimilarProduct from "@/app/components/product/similarProduct/SimilarProduct"
import { backend, shuffleArray } from "@/app/utils/utils";
import Head from "next/head"

///Commencing the code
///This fetches a list of all products
async function getProducts() {
  try {
      const response = await fetch(
          `${backend}/products`,
          {
            next: {
              revalidate: 60,
            },
          }
        );
      
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
      
        const products = await response.json();
        return products;
  } catch (error) {
      console.error(error);
  }
}

/**
 * @title Order Page
 */
export default async function CartOrderPage() {
  const products = shuffleArray(await getProducts())
 
  return (
    <main className="cartOrderPage">
      <Head>
        <title>Page Title</title>
      </Head>
      <Order />
      <SimilarProduct product_={products} category={null} page_={"cartOrder"}/>
    </main>
  )
}
