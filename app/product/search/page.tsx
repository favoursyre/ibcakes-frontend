///This handles the product query page

///Libraries -->
import { NextApiRequest, NextApiResponse } from 'next';
import ProductSearch from '@/app/components/product/productSearch/ProductSearch';
import { backend, shuffleArray } from '@/app/utils/utils';

///Commencing the code
///This function searches for passed in query
async function getQueriedProducts(query: string | string[] | undefined) {
    try {
      const response = await fetch(
          `${backend}/products/search?query=${query}`,
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
 * @title Product query page
 */
 export default async function ProductSearchPage(req: { params: Object, searchParams: { query: string}}, res: NextApiResponse) {
    const { query } = req.searchParams;
    const queryProducts = shuffleArray(await getQueriedProducts(query))
  
    return (
      <main className="search_page">
        <ProductSearch keyword_={query} query_={queryProducts} />
      </main>
    )
  }