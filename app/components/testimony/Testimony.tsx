"use client"
///Testimony component

///Libraries -->
import Link from 'next/link';
import { useState, useEffect, MouseEvent, FormEvent } from 'react';
import styles from "./testimony.module.scss"
import { usePathname, useRouter } from 'next/navigation';
import { ITestimony } from '@/app/utils/interfaces';

///Commencing the code 

/**
 * @title Testimony Component
 * @returns The Testimony component
 */
const Testimony = ({ testimonial_ }: { testimonial_: Array<ITestimony> }) => {
    const router = useRouter()
    const [activeTestifier, setActiveTestifier] = useState(0)
    const [testimony, setTestimony] = useState(testimonial_)
    //const [testimonyText, setTestimonyText] = useState(testimony[activeTestifier].testimony)
  //console.log('Current page:', routerPath);

  return (
    <div className={`${styles.main}`}>
        <h2>
            <strong>What our customers are saying</strong>
        </h2>
        {/* <img id={styles.ornament_1} src="./images/ornament_1.png" alt="" />
        <img id={styles.ornament_2} src="./images/ornament_2.png" alt="" />
        <img id={styles.ornament_3} src="./images/ornament_3.png" alt="" /> */}
        <div className={styles.testimony_slide}>
            {/* <div className={styles.image}>
                <img id={styles.elipse} src="./images/elipse_7.png" alt="" />
                <img id={styles.image} src="./images/wendy.png" alt="" />
            </div> */}
            <div className={styles.text}>
                <h3>
                  <strong>Syre Musk</strong>
                </h3>
                <p>This is the third testimony as regards this website, just debugging to make sure that everything works properly. Buy more cake motherfuckers!!</p>
            </div>
        </div>
    </div>
  );
};

export default Testimony;