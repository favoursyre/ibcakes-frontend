"use client"
///Custom Order component

///Libraries -->
import Link from 'next/link';
import { useState, useEffect, useRef, MouseEvent, FormEvent, ChangeEvent, DragEvent } from 'react';
import styles from "./customOrder.module.scss"
import { usePathname, useRouter } from 'next/navigation';
import { notify } from '@/app/utils/clientUtils';
import { backend, capitalizeFirstLetter, bytesToMB, readFile, formatNumberWithCommas, removeCommasAndConvertToNumber } from '@/app/utils/utils';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import validator from "validator"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ICustomOrder, IFileAttachment, ICustomerSpec, ICustomSpec } from '@/app/utils/interfaces';
import CloseIcon from '@mui/icons-material/Close';

///Commencing the code 
/**
 * @title Custom Order Component
 * @returns The Custom Order component
 */
const CustomOrder = () => {
    const router = useRouter()
    const [fullName, setFullName] = useState<string | undefined>("");
    const [emailAddress, setEmailAddress] = useState<string | undefined>("");
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
    const [description, setDescription] = useState<string | undefined>("");
    const [budget, setBudget] = useState<number>();
    const [deliveryAddress, setDeliveryAddress] = useState<string | undefined>("");
    const [textAreaCount, setTextAreaCount] = useState(0);
    //const [images, setImages] = useState<Array<string>>()
    const [files, setFiles] = useState(null);
    const inputRef = useRef();
    const maxLength: number = 1000
    const [textMaxLength, setTextMaxLength] = useState(1000)
    const [imageMaxLength, setImageMaxLength] = useState(3)
    const [imageMaxSize, setImageMaxSize] = useState(15)
    const dropZoneRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [selectedFiles, setSelectedFiles] = useState<Array<IFileAttachment> | undefined>(undefined);
    const [totalImageSize, setTotalImageSize] = useState<number>(0)

  let updatedFiles: Array<IFileAttachment>,
   file: File | null

  // Handle the drag-over event
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (selectedFiles && selectedFiles.length > 3) {
        notify("error", "Only a maximum of 3 images is allowed")
        return
    } 
  };

  useEffect(() => {
    document.title = "Custom ~ IB Cakes & Catering";
    
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        null
        //console.log("cart has changed")
      }, 100);
  
      return () => {
        clearInterval(interval);
      };
    
  }, [selectedFiles]);

  // Handles either the drop event or file select event
  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>  | DragEvent<HTMLDivElement>) => {
    event.preventDefault();

     //Checking for the event and assinging the file variable accordingly
    if ('target' in event && event.target instanceof HTMLInputElement) { // It is a ChangeEvent<HTMLInputElement>
        file = event.target.files && event.target.files[0];
      } else if ('dataTransfer' in event && event.dataTransfer instanceof DataTransfer) { // It is a DragEvent<HTMLDivElement>
        file = event.dataTransfer.files[0];
      }
    //const file = event.dataTransfer.files[0];

    if (file) {
        //Checking that the maximum number of selected files hasn't been exceeded
        if (totalImageSize > imageMaxSize) {
            notify("error", "Only a maximum size of 20mb is allowed")
            return
        } else if (selectedFiles && selectedFiles.length > 2) {
            notify("error", "Only a maximum quantity of 3 files is allowed")
            return
        } else {
            console.log("Access file drop")

            // Access the dropped files
            const content = await readFile(file)
            const name = file.name
            
            //console.log("Read File: ", content)
            const fileAttachment: IFileAttachment = { name, content }

            if (selectedFiles) {
                updatedFiles = [...selectedFiles, fileAttachment]
            } else {
                updatedFiles = [fileAttachment]
            }
            setSelectedFiles(() => updatedFiles)
            console.log("Selected Files: ", selectedFiles)

            //Update total image size
            const size = file.size
            setTotalImageSize(() => totalImageSize + bytesToMB(size))

            // Handle the dropped files here
            console.log("Files: ", file);
        }
    }
  };
  //console.log('Current page:', routerPath);

  //This function is triggered when the delete file item is clicked
  const deleteFileItem = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, index: number): void => {
    e.preventDefault()

    console.log("item deleted")
    selectedFiles?.splice(index, 1)
    setSelectedFiles(() => selectedFiles)
    console.log('Updated files: ', selectedFiles)
  }

  //This function handles the textarea onchange
  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setTextAreaCount(() => e.target.value.length);
    setDescription(() => e.target.value);
};

///This updates use state variables
useEffect(() => {
    const interval = setInterval(() => {
        null
        //console.log("cart has changed")
      }, 100);
  
      return () => {
        clearInterval(interval);
      };
    
  }, [selectedFiles]);

  ///This function triggers when the custom order button is clicked
  const submitCustomOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
    } else if (!deliveryAddress) {
        notify("error", "Delivery address is required")
        return
    } else if (!budget) {
        notify("error", "Budget is required")
        return
    } else if (!description) {
        notify("error", "Description is required")
        return
    }

    //Send the order to the backend
    try {
        //console.log('Clicked')
        const customerSpec: ICustomerSpec = {fullName, emailAddress, phoneNumber, deliveryAddress}
        const images: Array<IFileAttachment> | undefined = selectedFiles
        const productSpec: ICustomSpec = {budget, images, description}
        const order: ICustomOrder = {customerSpec, productSpec}
        console.log("Order: ", order)
        const res = await fetch(`${backend}/user/dashboard/order/custom`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
            'Content-Type': 'application/json',
            },
        });
        
      const data = await res.json();
  
      console.log("Data: ", data);
      notify("success", `Your order was sent successfully`)
      typeof window !== 'undefined' && window.location ? window.location.reload() : null;
      //setItem("ibCakesOrder", order)
    
    } catch (error) {
        console.log("error: ", error)
        notify("error", `${error}`)
    }
  }

  return (
    <div 
        className={`${styles.main}`}
        onDragOver={handleDragOver}
        onDrop={(e) => handleFileSelect(e)}
    >
        <ToastContainer />
        <h2>
            <strong>Custom Order</strong>
        </h2>
        <p>We are here to help you craft your perfect confection, tell us your preference and leave the rest to us </p>
        <div className={styles.form}>
            <form onSubmit={(e) => submitCustomOrder(e)}>
                <section id={styles.section1}>
                    <div id={styles.div1}>
                        <label>Full Name</label>
                        <input
                            placeholder="Enter your full name"
                            type="text"
                            onChange={(e) => setFullName(capitalizeFirstLetter(e.target.value))}
                            value={fullName}
                        />
                        <label>Phone Number (+234)</label>
                        <input
                            placeholder="Enter your phone number"
                            type="tel"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                        />
                        <label>Email Address</label>
                        <input
                            placeholder="Enter your email address"
                            type="email"
                            onChange={(e) => setEmailAddress(e.target.value)}
                            value={emailAddress}
                        />
                        <label>Delivery Address</label>
                        <input
                            placeholder="Delivery address"
                            type="text"
                            onChange={(e) => setDeliveryAddress(capitalizeFirstLetter(e.target.value))}
                            value={deliveryAddress}
                        />
                        <label>Budget (&#8358;)</label>
                        <input
                            placeholder="Enter your budget"
                            type="number"
                            onChange={(e) => setBudget(Number(e.target.value))}
                            value={budget}
                        />
                    </div>
                    <div id={styles.div2}>
                        <div className={styles.dragFile}>
                            <span>Drag and Drop Files to Upload</span>
                            <span>Or</span>
                            <button type="button" onClick={() => fileInputRef.current?.click()}>
                                <FileUploadIcon /> 
                                <span>Attach Files</span>
                            </button>
                            <input 
                                type="file"
                                multiple
                                style={{ display: "none" }}
                                onChange={(e) => handleFileSelect(e)}
                                ref={fileInputRef}
                            />
                            
                        </div>
                        <div className={styles.label}>   
                            <span>{totalImageSize.toFixed(1)}mb/{imageMaxSize}mb</span>
                            <span className={styles.max}>{selectedFiles ? selectedFiles.length : 0}/{imageMaxLength}</span>
                        </div>
                        
                        <div className={styles.fileSlide}>
                            {selectedFiles ? selectedFiles.map((file, id) => (
                                <div className={styles.fileItem} key={id}>
                                    <div className={styles.icon}>
                                        <button onClick={(e) => deleteFileItem(e, id)}><CloseIcon style={{ fontSize: "1rem" }} /></button>
                                    </div>
                                    <img 
                                        src={file.content}
                                        alt={file.name}
                                    />
                                </div>
                            )) : (
                                <></>
                            )}
                        </div>
                    </div>
                </section>
                <section id={styles.section2}>
                    <label>Detailed Description</label>
                    <textarea
                        placeholder="Enter a detailed description of what you have in mind"
                        onChange={(e) => handleTextArea(e)}
                        maxLength={textMaxLength}
                        value={description}
                    ></textarea>
                    <p id="textCount">{textAreaCount}/{textMaxLength}</p>
                    <br />
                </section>
                <section id={styles.section3}>
                    <button>Submit</button>
                </section>
            </form>
        </div>
        <div className={styles.successModal}></div>
    </div>
  );
};

export default CustomOrder;