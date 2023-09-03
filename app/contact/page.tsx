///This handles the contact page

///Libraries -->
import Contact from "../components/contact/Contact"
import { backend } from "../utils/utils";

///Commencing the code
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

/**
 * @title Contact Page
 */
export default async function ContactPage() {
  const contacts = await getContacts()

  return (
    <main className="contactPage">
      <Contact contact_={contacts} />
    </main>
  )
}
