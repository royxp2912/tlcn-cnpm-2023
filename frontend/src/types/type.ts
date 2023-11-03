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
    fullName: string;
    gender: string;
    birthDay: string;
    phone: string;
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
    name: string;
    image: string[];
    desc: string;
    category: Category;
    brand: string;
    price: Number;
    rating?: Number;
    sold?: Number;
    status?: string;
    variant: Variant[];
};

export type Variant = {
    color: string;
    size: string;
    quantity: Number;
};

export type Address = {
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
};

export type ItemCart = {
    product: string;
    image: string;
    name: string;
    color: string;
    size: string;
    quantity: Number;
    price: Number;
};

export type Order = {
    items: ItemCart[];
    userId: string;
    deliveryAddress: string;
    paymentMethod: string;
    total: Number;
};
