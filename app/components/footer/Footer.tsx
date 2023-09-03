"use client"
///Footer component

///Libraries -->
import Link from 'next/link';
import { useState, useEffect, MouseEvent, FormEvent } from 'react';
import styles from "./footer.module.scss"
import { usePathname, useRouter } from 'next/navigation';
import { routeStyle } from '@/app/utils/utils';
import LocationIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import WhatsappIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import { IContact } from '@/app/utils/interfaces';

///Commencing the code 

/**
 * @title Footer Component
 * @returns The Footer component
 */
const Footer = ({ contact_ }: { contact_: IContact }) => {
    const [contact, setContact] = useState(contact_)
    const router = useRouter()
    const routerPath = usePathname();
  //console.log('Current page:', routerPath);

  return (
    <div className={`${styles.main} ${routeStyle(routerPath, styles)}`}>
        <div className={styles.subSection}>
            <div className={styles.contact}>
                <div className={styles.logo}>
                    <img
                        src="https://drive.google.com/uc?export=download&id=1ZfcsAOOA2vhkmgIVekY8vetMv__2TN9o"
                        alt=""
                    />
                </div>
                <div className={styles.info}>
                    <div className={styles.info_1}>
                        <LocationIcon className={styles.icon} />
                        <span>61 Odunfa Street, Ebute Metta (East), Lagos, Nigeria</span>
                    </div>
                    <div className={styles.info_2}>
                        <CallIcon  className={styles.icon} /> 
                        <span>+234-9090982848</span>
                    </div>
                    <div className={styles.info_3}>
                        <Link href="https://www.google.com" target="_blank" id={styles.email}>
                            <EmailIcon  className={styles.icon} />
                        </Link>
                        <Link href="https://www.google.com" target="_blank" id={styles.whatsapp}>
                            <WhatsappIcon  className={styles.icon} />
                        </Link>
                        <Link href="https://www.google.com" target="_blank" id={styles.instagram}>
                            <InstagramIcon  className={styles.icon} />
                        </Link>
                        <Link href="https://www.google.com" target="_blank" id={styles.facebook}>
                            <FacebookIcon  className={styles.icon} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <span>
                    Copyright &copy; {new Date().getFullYear()} IB Cakes & Catering
                </span>
                <span>
                    Website developed by{" "}
                    <a href="https://www.google.com" target="_blank">
                    Favour Syre
                    </a>
                </span>
            </div>
        </div>
    </div>
  );
};

export default Footer;