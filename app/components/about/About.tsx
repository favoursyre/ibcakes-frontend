"use client"
///About component

///Libraries -->
import Link from 'next/link';
import { useState, useEffect, MouseEvent, FormEvent } from 'react';
import styles from "./about.module.scss"
import { usePathname, useRouter } from 'next/navigation';
import Hero from '../hero/Hero';
//import ReactDOMServer from 'react-dom/server';

///Commencing the code 
const imageSlide = [
    "./images/woman_1.png",
    "./images/woman_1.png",
    "./images/woman_1.png",
  ];

/**
 * @title About Component
 * @returns The About component
 */
const About = () => {
    const router = useRouter()
  //console.log('Current page:', routerPath);
  //const htmlString = ReactDOMServer.renderToStaticMarkup(<Hero />);
  //console.log('Testimony: ', htmlString)

  return (
    <div className={styles.main} id="about">
        <div className={styles.image}>
            <img id={styles.elipses_1} src="https://drive.google.com/uc?export=download&id=10PkBvWrRJAnQHi-ALAYEL71kzhyiATb8" alt="" />
            <img id={styles.elipses_2} src="https://drive.google.com/uc?export=download&id=10PkBvWrRJAnQHi-ALAYEL71kzhyiATb8" alt="" />
            <div className={styles.image_slide}>
            {/* {imageSlide.map((slide, index) => (
                <img key={index} className="about_image" src={slide} alt="" />
            ))} */}
                <img  src="https://drive.google.com/uc?export=download&id=1P23MmEoXiPr5bllFkK7xrx73mDPJSOOL" alt="" />
            </div>
        </div>
        <div className={`${styles.brief}`}>
            <h2>
                <strong>About Us</strong>
            </h2>
            <p>
                We at IB Cakes & Catering are passionate about creating exquisite cakes and pastries for your special moments. Our skilled bakers and decorators ensure every cake and pastry is a masterpiece. From birthdays to weddings, our products add sweetness to your celebrations. With a wide range of flavors and designs, we cater to your unique preferences. We use only the finest ingredients to guarantee exceptional taste. Customer satisfaction is our priority, let us be part of your joyous occasions. {" "}
            </p>
        </div>
    </div>
  );
};

export default About;