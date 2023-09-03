///This would contain all interfaces that will be used

///Libraries -->

///Commencing the code
///Declaring the interface for product
export interface IProduct {
    _id?: string,
    category?: string,
    name?: string,
    images?: Array<string>,
    description?: string,
    price?: number,
    quantity?: number,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
}

/**
 * @notice The interface for testimonials mongoose schema
 * @param name Name of the testifier
 * @param image Image of the testifier
 * @param testimony Testimony of the testifier
 */
 export interface ITestimony {
    _id?: string,
    name?: string,
    image?: string,
    testimony?: string
    createdAt?: string,
    updatedAt?: string,
    __v?: number
  }

    /**
 * @notice The interface for contact mongoose schema
 * @param phoneNumber The phone number of the company
 * @param emailAddress The email address of the company
 */
 export interface IContact {
    emailAddress?: string
    phoneNumber?: string,
    officeAddress?: string,
    emailLink?: string,
    instagramLink?: string,
    facebookLink?: string,
    whatsappLink?: string
  }

  ///Declaring the interface for cart item
export interface ICartItem {
    readonly _id: string,
    readonly image: string,
    readonly name: string,
    readonly unitPrice: number,
    minQuantity: number,
    quantity: number,
    subTotalPrice: number
} 

///Declaring the interface for the cart
export interface ICartSpec {
  totalPrice: number,
  cart: Array<ICartItem>
}

///Declaring the interface for inquiry
export interface IInquiry {
  _id?: string,
  fullName: string,
  emailAddress: string, 
  phoneNumber: string,
  message: string
  createdAt?: string,
  updatedAt?: string,
  __v?: number
}

  ///Declaring the interface for customer specification
  export interface ICustomerSpec {
    readonly fullName: string,
    readonly emailAddress: string,
    readonly phoneNumber: string,
    readonly deliveryAddress: string
} 

///Declaring the interface for custom product spec
export interface ICustomSpec {
    budget: number,
    images?: Array<IFileAttachment>,
    description: string
}

///Declaring the interface for custom order model
export interface ICustomOrder {
  _id?: string,
  customerSpec: ICustomerSpec,
  productSpec: ICustomSpec,
  createdAt?: string,
  updatedAt?: string,
  __v?: number
}

///Declaring the interface for cart order model
export interface ICartOrder {
  _id?: string,
  customerSpec: ICustomerSpec,
  productSpec: ICartSpec,
  paymentSpec?: IPayment,
  createdAt?: string,
  updatedAt?: string,
  __v?: number
}

///Declaring the interface for file attachment
export interface IFileAttachment {
  name: string,
  content: string,
}

  ///Declaring the interface for card payment details
  export interface IPayment {
    url?: string,
    reference?: string,
    status?: string,
    accessCode?: string
  }