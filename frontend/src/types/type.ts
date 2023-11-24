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
    _id?: string | undefined;
    fullName: string;
    email?: string;
    gender: string;
    birthDay: string;
    phone: string;
    avatar: string;
};

export type updatePassword = {
    user: string;
    oldPass: string;
    newPass: string;
};
export type updateEmail = {
    userId: string;
    newEmail: string;
};

export type Category = {
    _id?: string;
    name: string;
    img: string;
};

export type Product = {
    _id: string;
    name: string;
    images: string[];
    desc: string;
    category: Category;
    brand: string;
    price: number;
    rating?: number;
    sold?: number;
    status?: string;
    variant: Variant;
};

export type Variant = {
    listColor: string[];
    listSize: string[];
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
    default: boolean;
};

export type AddressLess = {
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
};

export type UpdateAddress = {
    address: string;
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
};

export type ItemCart = {
    user?: string;
    product: string;
    image: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
};

export type Cart = {
    _id?: string;
    user: string;
    total: number;
    items: ItemCart[];
};

export type Order = {
    _id?: string;
    items: ItemCart[];
    userID: string;
    deliveryAddress: string;
    paymentMethod: string;
    total: number;
    status?: string;
    isPaid?: boolean;
};

export type RemoveItemCart = {
    user: string;
    product: string;
};

export type updateOrder = {
    order: string;
    user: string;
    status: string;
};

export type findProduct = {
    color?: string;
    keyword?: string;
    sort: string;
    pageSize: number;
    pageNumber: number;
};

export type upAvatar = {
    img: string;
    user: string;
};

export type getSizeOfColor = {
    id: string;
    color: string;
};

export type variantColor = {
    size: string;
    quantity: number;
};

export type Brand = {
    brand: string;
    quantity: number;
};

export type itemCartRandomVari = {
    product: string;
    image: string;
    name: string;
    price: number;
};

export type productByCate = {
    category: string;
    sort: string;
    brand: string;
    color: string;
    pageNumber: number;
};
