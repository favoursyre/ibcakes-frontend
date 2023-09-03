"use Client"
///This handles the product info page

///Libraries -->
import ProductInfo from '../../components/product/productInfo/ProductInfo';
import SimilarProduct from '@/app/components/product/similarProduct/SimilarProduct';
import { IProduct } from '@/app/utils/interfaces';
import { backend, shuffleArray, deleteItemByKey } from '@/app/utils/utils';

///Commencing the code

///This fetches the product info page
async function getProduct(id: string) {
  try {
    // let product: Array<IProduct>
    // while (true) {
    //   const response = await fetch(
    //     `${backend}/product/info/${id}`,
    //     {
    //       next: {
    //         revalidate: 60,
    //       },
    //     }
    //   );

    //   if (response.ok) {
    //     product = await response.json();
    //     break
    //   }

    //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    // }
    //   return product;

    const response = await fetch(
      `${backend}/product/info/${id}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
  
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
  
    const product = await response.json();
    return product;
  } catch (error) {
      console.error(error);
  }
}

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
      
        const quotes = await response.json();
        return quotes;
  } catch (error) {
      console.error(error);
  }
}

/**
 * @title Product info page
 */
export default async function ProductByIdPage({ params: { id } }: { params: { id: string }}) {
    const product = await getProduct(id)
    
    const products: Array<IProduct> = shuffleArray(deleteItemByKey(await getProducts(), "_id", id))

  return (
    <main className="product_info_page">
      <ProductInfo product_={product} />
      <SimilarProduct product_={products} category={product[0]["category"]} page_={""} />
    </main>
  )
}