///Layout page

///Libraries -->
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { backend } from './utils/utils';
import styles from "./layout.module.scss"

///Commencing the code

///Declaring the metadata
export const metadata = {
  title: 'IB Cakes & Catering',
  icons: {
    icon: 'favicon.png',
  },
  description: 'Website for shopping for your cakes and pastries',
  keywords: "ecommerce, cake, catering, pastry"
}

///This fetches the contact information
async function getContacts() {
  try {
    const response = await fetch(
        `${backend}/contacts`,
        {
          next: {
            revalidate: 60,
          },
        }
      );
    
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    
      const contacts = await response.json();
      return contacts;
} catch (error) {
    console.error(error);
}
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contacts = await getContacts()

  return (
    <html lang="en" className={`${styles.html}`}>
      <body>
        <Header />
        {/* <ToastContainer /> */}
        <main className='container'>{children}</main>
        <Footer contact_={contacts} />
      </body>
    </html>
  )
}
