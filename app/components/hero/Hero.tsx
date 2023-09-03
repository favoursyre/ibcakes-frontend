"use client"
///Hero component

///Libraries -->
import styles from "./hero.module.scss"
import { useRouter } from 'next/navigation';

///Commencing the code 

/**
 * @title Hero Component
 * @returns The Hero component
 */
const Hero = () => {
    const router = useRouter()
  //console.log('Current page:', routerPath);

  return (
    <div className={styles.main}>
        <div className={styles.hero_brief}>
            <div className={`${styles.brief}`}>
                Handmade with an <span>Extra Pinch</span> of love
            </div>
            <div className={`${styles.buttons}`}>
                <button className={styles.btn1} onClick={() => router.push('/order/custom')}>
                    <span>Custom Order</span>
                </button>
                <button className={styles.btn2} onClick={() => router.push('/#about')} >
                    <span>Learn More</span>
                </button>
            </div>
        </div>
        <div className={styles.image}>
            <img
                src="https://drive.google.com/uc?export=download&id=1-gSWOJOolEBSZzumExmZou6Zvivs11Dr"
                alt=""
            />
        </div>
        <img
            id={styles.cakeIllustrate}
            src="https://drive.google.com/uc?export=download&id=1Zv3XbJLWt1rWxOEWzxrQNqckvdcaPeib"
            alt=""
        />
        <img id={styles.arrow} src="https://drive.google.com/uc?export=download&id=1J0M_PFO3e2JEEqQrH8g3dflyeq_I15Zb" alt="" />
        <img id={styles.dot_1} src="https://drive.google.com/uc?export=download&id=1NXV7yW0lOnKnbnkPQ0LjiUGNvvxN0DfR" alt=""></img>
        <img id={styles.dot_2} src="https://drive.google.com/uc?export=download&id=1snGcRq3IXCG7EGaLuya-AGKbB87lFPKR" alt=""></img>
    </div>
  );
};

export default Hero;