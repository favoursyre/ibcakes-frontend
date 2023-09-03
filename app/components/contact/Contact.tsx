"use client"
///Contact component

///Libraries -->
import Link from 'next/link';
import { useState, useEffect, MouseEvent, FormEvent, ChangeEvent } from 'react';
import LocationIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import WhatsappIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import styles from "./contact.module.scss"
import { usePathname, useRouter } from 'next/navigation';
import { notify } from '@/app/utils/clientUtils';
import { backend, capitalizeFirstLetter } from '@/app/utils/utils';
import { IContact, IInquiry } from '@/app/utils/interfaces';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';

///Commencing the code 

/**
 * @title Contact Component
 * @returns The Contact component
 */
const Contact = ({ contact_ }: { contact_: IContact }) => {
    const [contact, setContact] = useState(contact_)
    const router = useRouter()
    const [fullName, setFullName] = useState<string>();
    const [emailAddress, setEmailAddress] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [textAreaCount, setTextAreaCount] = useState(0);
    const [textMaxLength, setTextMaxLength] = useState(500)

    useEffect(() => {
        document.title = "Contacts ~ IB Cakes & Catering";

        const currentDate = new Date();
        const nextWeek = new Date(currentDate.getTime() + 8 * 24 * 60 * 60 * 1000);
        const options: Intl.DateTimeFormatOptions = { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = nextWeek.toLocaleDateString('en-US', options);
        console.log("Date: ", formattedDate)
      }, []);

    //This function handles the textarea onchange
    const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTextAreaCount(e.target.value.length);
        setMessage(e.target.value);
    };

    //This function executes when form is submitted
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
        } else if (!message) {
            notify("error", "Message is required")
            return
        }

        //Send the order to the backend
        try {
            //console.log('Clicked')
            const inquiry: IInquiry = {fullName, emailAddress, phoneNumber, message}
            console.log("Inquiry: ", inquiry)
            const res = await fetch(`${backend}/inquiry/add/`, {
                method: 'POST',
                body: JSON.stringify(inquiry),
                headers: {
                'Content-Type': 'application/json',
                },
            });
            
        const data = await res.json();
    
        console.log("Data: ", data);
        notify("success", `Your message was sent successfully`)
        //window.location.reload()
        //setItem("ibCakesOrder", order)
        
        } catch (error) {
            console.log("error: ", error)
            notify("error", `${error}`)
        }
    };
  //console.log('Current page:', routerPath);

  return (
    <div className={`${styles.main}`}>
        <ToastContainer />
        <h2>
            <strong>Contact Us</strong>
        </h2>
        <p>Tell us what&apos;s on your mind</p>
        <div className={styles.contact}>
            <div className={styles.brief}>
                <div id={styles.brief1}>
                    <h3>
                        <strong>Get in touch</strong>
                    </h3>
                    <span>We value your feedback and would be delighted to hear from you. Our team is always available to chat and assist you in any way we can.</span>
                </div>
                <div id={styles.brief2}>
                    <div className={styles.heading}>
                        <ChatIcon className={styles.icon} />
                        <h4>
                            <strong>Chat with us</strong>
                        </h4>
                    </div>
                    <span>Our team is committed to providing friendly assistance and is always available to help you favour@gmail.com</span>
                </div>
                <div id={styles.brief3}>
                    <div className={styles.heading}>
                        <LocationIcon className={styles.icon} />
                        <h4>
                            <strong>Office</strong>
                        </h4>
                    </div>
                    <span>We are located at Hiiltop, Nsukka Road</span>
                </div>
                <div id={styles.brief4}>
                    <div className={styles.heading}>
                        <CallIcon className={styles.icon} />
                        <h4>
                            <strong>Phone</strong>
                        </h4>
                    </div>
                    <span>Mon-Fri 8am - 5pm <br/> +234-9090982848</span>
                </div>
                <div className={styles.socials}>
                    <button><EmailIcon className={styles.icon} /></button>
                    <button><WhatsappIcon className={styles.icon} /></button>
                    <button><InstagramIcon className={styles.icon} /></button>
                    <button><FacebookIcon className={styles.icon} /></button>
                </div>
            </div>
            <div className={styles.form}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>Name</label>
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
                    <label>Message</label>
                    <textarea
                        placeholder="Enter your message..."
                        onChange={(e) => handleTextArea(e)}
                        maxLength={textMaxLength}
                        value={message}
                    ></textarea>
                    <p id="textCount">{textAreaCount}/{textMaxLength}</p>
                    <br />
                    <button>Send</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Contact;