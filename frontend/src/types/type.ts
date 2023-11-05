import { type } from 'os';

export type SignIn = {
    email: string;
    password: string;
};
export type SignUp = {
    email: string;
    fullName: string;
    password: string;
    gender: string;
    birthDay: string;
};

export type User = {
    _id: string;
    fullName: string;
    email?: string;
    gender: string;
    birthDay: string;
    phone: string;
    avatar: string;
};

export type Password = {
    oldPass: string;
    newPass: string;
};

export type Category = {
    name: string;
    img: string;
};

export type Product = {
    _id: string;
    name: string;
    image: string[];
    desc: string;
    category: Category;
    brand: string;
    price: number;
    rating?: number;
    sold?: number;
    status?: string;
    variant: Variant[];
};

export type Variant = {
    color: string;
    size: string;
    quantity: number;
};

export type Address = {
    _id: string;
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
};

export type ItemCart = {
    productID: string;
    image: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
};

export type Order = {
    _id: string;
    items: ItemCart[];
    userId: string;
    deliveryAddress: string;
    paymentMethod: string;
    total: number;
    status: string;
    isPaid: boolean;
};
