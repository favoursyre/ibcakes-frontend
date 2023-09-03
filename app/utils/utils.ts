///This contains all the utilities

///Libraries --> 

///Commencing the code

///This checks for a router path and renders the necessary style for it
export const routeStyle = (router: string, styles: { readonly [key: string]: string } ): string => {
    //console.log("Router: ", router)
    switch (router) {
        case "/":
            return styles.homePage
        case "/contact":
            return styles.contactPage
        case "/order/custom":
            return styles.customOrderPage
        case "/order/cart":
            return styles.cartOrderPage
        case "/product/search":
            return styles.searchPage
        default:
            if (router.includes("/product/")) {
                return styles.productInfoPage
            } else if (router.includes("/order/cart/")) {
                return styles.cartReceiptPage
            } else {
                return styles.others
            }
    }
}

///This contains the sort orders
export const sortOptions = [
    {id: 1, name: "Newest Arrivals"},
    {id: 2, name: "Price: High to Low"},
    {id: 3, name: "Price: Low to High"}
]

///This function exports a array shuffler function
export const shuffleArray = (array: Array<any>): Array<any> => {
    if (Array.isArray(array)) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    return array
}

///The backend api point
export const backend = "https://ibcakes-web-backend-64d24c854237.herokuapp.com"

///This function returns all item with a key in array
export const getItemsByKey = (array: Array<any>, key: string, value: string | null): Array<any> => {
    if (value) {
        return array.filter((arr) => arr[key] === value);
    } else {
        return array
    }
  }

  ///This function deletes an item by the key from an array
export const deleteItemByKey = (array: Array<any>, key: string, value: string): Array<any> => {
    return array.filter((arr) => arr[key] !== value);
  }

// export const getValueByKey = (items: Item[], searchKey: string): any | undefined => {
//     const foundItem = items.find((item) => item.key === searchKey);
//     return foundItem ? foundItem.value : undefined;
//   }

///This function capitalizes the first letter of every word
export const capitalizeFirstLetter = (str: string | undefined): string | undefined => {
    if (str) {
        return str.replace(/\b\w/g, (match) => match.toUpperCase());
    }
  }


///This function converts a bytes to megabytes
export const bytesToMB = (byteSize: number): number => {
    return Number((byteSize / (1024 * 1024)).toFixed(1))
}

///This function returns a read file
export const readFile = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const fileData = reader.result as string;
        resolve(fileData);
      };
  
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
  
      reader.readAsDataURL(file);
    });
  }; 

  ///This function deletes an item from an array
  export const deleteItemByIndex = (array: Array<any>, index: number): Array<any> => {
    if (array) {
        // Check if the index is valid
        if (index < 0 || index >= array.length) {
            console.error('Invalid index');
            return array; // Return the original array
        }
        
        // Create a new array without the item at the specified index
        const newArray = [...array.slice(0, index), ...array.slice(index + 1)];
        
        return newArray;
    } else {
        return array
    }
  };

///This function puts space in between string characters
export const insertSpace = (str: string | undefined): string | undefined => {
    if (str) {
        const regex = /(.{4})/g;
        return str.replace(regex, '$1 ');
    }
}

// Function to format the number with commas
export const formatNumberWithCommas = (number: number | null) => {
    if (number === null) return '';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Function to remove commas and convert the string back to a number
export const removeCommasAndConvertToNumber = (value: string) => {
    return Number(value.replace(/,/g, ''));
  };

  const currentDate = new Date();
        //const nextWeek = new Date(currentDate.getTime() + 8 * 24 * 60 * 60 * 1000);
        const options: Intl.DateTimeFormatOptions = { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        console.log("Date: ", formattedDate)


///This format mongo db time
export const formatDateMongo = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    
    // Format the date using Intl.DateTimeFormat
    const formattedDate = date.toLocaleDateString(undefined, options);
  
    return `${formattedDate}`;
  }



  