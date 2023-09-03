///This handles the home page

///Libraries -->
import Hero from "./components/hero/Hero"
import ProductGrid from "./components/product/productGrid/ProductGrid"
import About from "./components/about/About"
import { backend } from "./utils/utils"

///This function gets all the products

///This function gets all the products
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

///This function gets all testimonials
// async function getTestimonials() {
//   try {
//     const response = await fetch(
//         `${backend}/testimony`,
//         {
//           next: {
//             revalidate: 60,
//           },
//         }
//       );
    
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    
//       const quotes = await response.json();
//       return quotes;
//   } catch (error) {
//       console.error(error);
//   }
// }

/**
 * @title Homepage
 */
export default async function Home() {
  const products = await getProducts()
  //const testimonials = shuffleArray(await getTestimonials())
  //console.log('Testimony: ', <Hero />)
 
  return (
    <main className="home_page">
      <Hero />
      <ProductGrid product_={products} />
      <About />
      {/* <Testimony testimonial_={testimonials} /> */}
    </main>
  )
}
