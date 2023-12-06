'use client';
import Image from 'next/image';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import TextField from '@mui/material/TextField';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import axios from '@/utils/axios';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Category, Product, Variant, detailVariant } from '@/types/type';
import { getAllCategory } from '@/slices/categorySlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { toast } from 'react-toastify';
import { getProductById } from '@/slices/productSlice';
import { getDetailByProduct } from '@/slices/variantSlice';
const brands = ['Adidas', 'Nike', 'Vans', 'Balenciaga', 'Converse', 'Puma'];

const AddNewProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [image, setImage] = useState<File[]>();
    const [upImage, setUpImage] = useState<File[]>();
    const [addVariants, setAddVariants] = useState<{}[]>([]);
    const [vars, setVars] = useState<{ variant: string; color: string; size: string; quantity: string }[]>([]);
    const { categories }: { categories: Category[] } = useSelector((state: any) => state.categories);
    const { productDetail }: { productDetail: Product; variants: Variant } = useSelector(
        (state: any) => state.products,
    );
    const { variants }: { variants: detailVariant[] } = useSelector((state: any) => state.variants);
    const pathname = usePathname();
    const [brand, setBrand] = useState<string>('Adidas');
    const [category, setCategory] = useState<string>('');
    const { id }: { id: string } = useParams();
    const [product, setProduct] = useState<{
        name: string;
        price: number;
        desc: string;
    }>({
        name: '',
        price: 0,
        desc: '',
    });
    const [mount, setMount] = useState(false);
    const [load, setLoad] = useState(false);
    const [open, setOpen] = useState(false);
    const [del, setDel] = useState(false);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleToggleInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const arr: File[] = [];
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const url = URL.createObjectURL(file);
                const fileWithUrl = new File([file], url);
                arr.push(fileWithUrl);
            }
        }
        setUpImage((prevImages = []) => [...prevImages, ...arr]);
        setImage((prevImages = []) => [...prevImages, ...arr]);
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    const addVariant = () => {
        setAddVariants((prevVariants) => [...prevVariants, {}]);
    };

    const handleVariantChange = (index: number, field: string, value: string) => {
        setVars((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index] = {
                ...updatedVariants[index],
                [field]: value,
            };
            return updatedVariants;
        });
    };
    const handleDeleteVariant = (index: number) => {
        setVars((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants.splice(index, 1);
            return updatedVariants;
        });
        setAddVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants.splice(index, 1);
            return updatedVariants;
        });
    };

    const handleChangeCate = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };
    const handleChangeBrand = (event: SelectChangeEvent) => {
        setBrand(event.target.value as string);
    };

    const dispatchGetAllCategory = useCallback(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const handleUpdateImage = async () => {
        const formData = new FormData();
        upImage &&
            upImage.forEach((i) => {
                formData.append('images', i);
            });
        const imageValues = formData.getAll('images');
        console.log('Key images:', imageValues);
        console.log(id);
        formData.append('product', id);
        console.log('Id:', formData.get('product'));

        const { data } = await axios.patch('/products/updateImgs', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (data.success) {
            toast.success('Update Image Product success');
            setMount(false);
            setLoad((prev) => !prev);
        }
    };

    const handleSubmit = async () => {
        const { data } = await axios.put(`/products/update`, {
            product: id,
            name: product.name,
            price: product.price,
            desc: product.desc,
            category: category,
            brand: brand,
        });
        if (data.success) {
            toast.success('Update Product success');
            setLoad((prev) => !prev);
            setMount(false);
        }
    };
    const handleUpdateVariant = async (variant: string, index: number) => {
        const { data } = await axios.put('/variants/update', {
            variant: variant,
            color: vars[index].color,
            size: vars[index].size,
            quantity: vars[index].quantity,
        });
        if (data.success) {
            toast.success('Update Variant Success');
            setLoad((prev) => !prev);
            setMount(false);
        }
    };

    const handleDeleteImg = async (name: string, i: number) => {
        if (image) {
            const newImage = [...image];
            if (name.includes('http')) {
                const { data } = await axios.delete('/products/image', {
                    params: {
                        product: id,
                        image: name,
                    },
                });
                if (data.success) {
                    newImage.splice(i, 1);
                    setImage(newImage);
                }
                setOpen(true);
            } else {
                newImage.splice(i, 1);
                setImage(newImage);
            }
        }
    };

    useEffect(() => {
        dispatchGetAllCategory();
        dispatch(getProductById(id)).then(() => {
            setMount(true);
        });
        dispatch(getDetailByProduct(id));
    }, [id, load]);

    useEffect(() => {
        if (mount) {
            setProduct({
                name: productDetail.name,
                price: productDetail.price,
                desc: productDetail.desc,
            });
            setBrand(productDetail.brand);
            setCategory(productDetail.category._id);
            const imageUrls = productDetail.images;
            const imageFiles = imageUrls.map((url) => new File([url], url));
            setImage(imageFiles);
            const newVars = variants.map((item) => {
                return {
                    variant: item._id,
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                };
            });
            setVars(newVars);
            setAddVariants(Array.from({ length: newVars.length }, () => ({})));
        }
    }, [mount]);
    return (
        <div className="flex flex-col gap-[10px]">
            <div className="font-bold">
                <div className="flex items-center cursor-pointer" onClick={() => router.push('/warehouse/manage')}>
                    <ChevronLeftRoundedIcon />
                    <span>Back</span>
                </div>
                <span className="block mt-2 text-center text-lg">Update Product</span>
            </div>
            <div className="px-[60px] py-5 bg-white shadow-product mt-5">
                <span className="font-bold text-lg">Images Of Product</span>
                <div className="flex gap-[10px] mt-5 justify-center items-center">
                    <div className="flex gap-5">
                        {image &&
                            image.map((item, i) => (
                                <div
                                    className="w-[100px] h-[100px] relative"
                                    onClick={() => handleDeleteImg(item.name, i)}
                                >
                                    <Image key={i} src={item.name} alt="Shoes" fill className="shadow-cate" />
                                </div>
                            ))}
                    </div>

                    {image === undefined || image.length < 4 ? (
                        <div>
                            <div
                                onClick={handleToggleInput}
                                className="opacity-50 w-[100px] h-[100px] border-4 border-dashed flex flex-col items-center justify-center gap-[5px] p-[10px]"
                            >
                                <AddPhotoAlternateOutlinedIcon />
                                <span className="text-center">Add Image</span>
                            </div>
                            <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} multiple />
                        </div>
                    ) : (
                        <div>
                            <div className="opacity-50 w-[100px] h-[100px] border-4 border-dashed flex flex-col items-center justify-center gap-[5px] p-[10px]">
                                <AddPhotoAlternateOutlinedIcon />
                                <span className="text-center">Max 4 Image (Delete image for Update)</span>
                            </div>
                            <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} multiple />
                        </div>
                    )}
                    <button
                        className="w-[100px] h-[50px] bg-blue opacity-50 text-white font-bold text-sm"
                        onClick={handleUpdateImage}
                    >
                        Update Image
                    </button>
                </div>
            </div>
            <div className="px-10 py-5 bg-white shadow-product flex flex-col gap-5">
                <span className="ml-5 font-bold text-lg">Product Details</span>
                <TextField
                    id="name"
                    label="Name Of Product"
                    variant="outlined"
                    value={product.name}
                    onChange={handleChange}
                />
                <div className="flex justify-between items-center">
                    <FormControl className="w-[320px]">
                        <InputLabel id="categoryId">Category</InputLabel>
                        <Select
                            labelId="categoryId"
                            id="category"
                            value={category}
                            label="Category"
                            onChange={handleChangeCate}
                            className="font-bold"
                        >
                            {categories &&
                                categories.map((item) => (
                                    <MenuItem key={item._id} value={item._id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <FormControl className="w-[320px]">
                        <InputLabel id="brandName">Brand</InputLabel>
                        <Select
                            labelId="brandName"
                            id="brand"
                            value={brand}
                            label="Brand"
                            onChange={handleChangeBrand}
                            className="font-bold"
                        >
                            {brands.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="price"
                        label="Price"
                        variant="outlined"
                        className="w-[320px]"
                        type="tel"
                        inputProps={{
                            className: 'text-orange font-bak',
                        }}
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <TextField
                    id="desc"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={10}
                    value={product.desc}
                    onChange={handleChange}
                />
            </div>
            <div className="px-10 py-5 bg-white shadow-product flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">Variants Of Product</span>
                    <button
                        className="w-[150px] h-10 text-sm font-medium bg-blue bg-opacity-60 text-white"
                        onClick={addVariant}
                    >
                        Add New Variant
                    </button>
                </div>
                <div className="flex flex-col gap-5">
                    {addVariants.map((variant, index) => (
                        <div key={index} className="flex items-center gap-[27px]">
                            <div className="flex justify-between w-full">
                                <TextField
                                    label="Color"
                                    variant="outlined"
                                    inputProps={{
                                        className: 'w-[320px]',
                                    }}
                                    value={index < vars.length ? vars[index].color : ''}
                                    onChange={(event) => handleVariantChange(index, 'color', event.target.value)}
                                />
                                <TextField
                                    label="Size"
                                    variant="outlined"
                                    inputProps={{
                                        className: 'w-[320px]',
                                    }}
                                    value={index < vars.length ? vars[index].size : ''}
                                    onChange={(event) => handleVariantChange(index, 'size', event.target.value)}
                                />
                                <TextField
                                    label="Quantity"
                                    variant="outlined"
                                    inputProps={{
                                        className: 'w-[320px]',
                                    }}
                                    value={index < vars.length ? vars[index].quantity : ''}
                                    onChange={(event) => handleVariantChange(index, 'quantity', event.target.value)}
                                />
                            </div>
                            <button
                                className="w-[100px] h-[50px] bg-blue opacity-50 text-white font-bold text-sm"
                                onClick={() => handleUpdateVariant(vars[index].variant, index)}
                            >
                                Update
                            </button>
                            <CloseOutlinedIcon className="text-red " onClick={() => handleDeleteVariant(index)} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-[26px] justify-end">
                <button className="w-[200px] h-[50px] bg-red opacity-50 text-white font-bold text-sm">CANCEL</button>
                <button
                    className="w-[200px] h-[50px] bg-blue opacity-50 text-white font-bold text-sm"
                    onClick={handleSubmit}
                >
                    Update Info Product
                </button>
            </div>
        </div>
    );
};

export default AddNewProduct;
