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
    email: string;
    gender: string;
    birthDay: string;
    phone: string;
    avatar: string;
    role: string;
    status: string;
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
    _id: string;
    name: string;
    image: string;
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
};

export type detailVariant = {
    _id: string;
    color: string;
    size: string;
    quantity: string;
};

export type Address = {
    _id?: string;
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
    _id: string;
    items: ItemCart[];
    user: string;
    deliveryAddress: Address;
    paymentMethod: string;
    total: number;
    status?: string;
    isPaid?: boolean;
    isDelivered?: boolean;
};

export type RemoveItemCart = {
    user: string;
    product: string;
};

export type updateOrder = {
    order: string;
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
    user: string;
    product: string;
    image: string;
    name: string;
    price: number;
};

export type updateCateName = {
    category: string;
    name: string;
};
export type updateCateImg = {
    image: string;
    category: string;
};
export type deleteOrder = {
    user: string;
    order: string;
};

export type findUser = {
    keyword: string;
    pageSize: number;
    pageNumber: number;
};

export type total = {
    total: number;
    percent: number;
};

export type day = {
    month: number;
    year: number;
};

export type detailTotal = [day: string, total: number];
export type detailMonth = [date: number, total: number];

export type top = {
    id: string;
    name: string;
    image: string;
    count: number;
};

export type pageOrder = {
    status: string;
    pageNumber: number;
};
