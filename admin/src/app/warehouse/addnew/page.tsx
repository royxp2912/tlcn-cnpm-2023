'use client';
import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import TextField from '@mui/material/TextField';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { createProduct } from '@/slices/productSlice';
import { Product } from '@/types/type';
import axios from '@/utils/axios';

const AddNewProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [image, setImage] = useState<File[]>();
    const [addVariants, setAddVariants] = useState<{}[]>([]);
    const [variants, setVariants] = useState<{ color: string; size: string; quantity: string }[]>([]);
    const [product, setProduct] = useState<{
        name: string;
        category: string;
        brand: string;
        price: number;
        desc: string;
    }>({
        name: '',
        category: '',
        brand: '',
        price: 0,
        desc: '',
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleToggleInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const arr = [];
        if (files) {
            for (let i = 0; i < files.length; i++) {
                arr.push(files[i]);
            }
        }
        setImage(arr);
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
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index] = {
                ...updatedVariants[index],
                [field]: value,
            };
            return updatedVariants;
        });
    };
    const handleDeleteVariant = (index: number) => {
        setVariants((prevVariants) => {
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
    const handleSubmit = async () => {
        const formData = new FormData();
        const rating = 0;
        formData.append('name', product.name);
        formData.append('desc', product.desc);
        image &&
            image.forEach((i) => {
                formData.append('images', i);
            });
        formData.append('brand', product.brand);
        formData.append('price', product.price.toString());
        formData.append('rating', rating.toString()), formData.append('category', '6518dd3405588557052f184b');
        formData.append('variants', JSON.stringify(variants));

        const { data } = await axios.post('/products/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <div className="flex flex-col gap-[10px]">
            <div>
                <span>Back</span>
                <span>Add New Product</span>
            </div>
            <div className="px-[60px] py-5 bg-white shadow-product mt-5">
                <span className="font-bold text-lg">Images Of Product</span>
                <div>
                    <div className="flex gap-5">
                        {image &&
                            image.map((item, i) => (
                                <Image
                                    key={i}
                                    src={`/${item.name}`}
                                    alt="Shoes"
                                    width={100}
                                    height={100}
                                    className="bg-product"
                                />
                            ))}
                    </div>
                    <div onClick={handleToggleInput}>
                        <AddPhotoAlternateOutlinedIcon />
                        <span>Add Image</span>
                    </div>
                    <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} multiple />
                </div>
            </div>
            <div className="px-10 py-5 bg-white shadow-product flex flex-col gap-5">
                <span className="ml-5 font-bold text-lg">Product Details</span>
                <TextField id="name" label="Name Of Product" variant="outlined" onChange={handleChange} />
                <div className="flex justify-between">
                    <TextField
                        id="category"
                        label="Category"
                        variant="outlined"
                        inputProps={{
                            className: 'w-[320px]',
                        }}
                        onChange={handleChange}
                    />
                    <TextField
                        id="brand"
                        label="Brand"
                        variant="outlined"
                        inputProps={{
                            className: ' w-[320px]',
                        }}
                        onChange={handleChange}
                    />
                    <TextField
                        id="price"
                        label="Price"
                        variant="outlined"
                        inputProps={{
                            className: 'text-orange w-[320px]',
                        }}
                        onChange={handleChange}
                    />
                </div>
                <TextField
                    id="desc"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={10}
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
                                    onChange={(event) => handleVariantChange(index, 'color', event.target.value)}
                                />
                                <TextField
                                    label="Size"
                                    variant="outlined"
                                    inputProps={{
                                        className: 'w-[320px]',
                                    }}
                                    onChange={(event) => handleVariantChange(index, 'size', event.target.value)}
                                />
                                <TextField
                                    label="Quantity"
                                    variant="outlined"
                                    inputProps={{
                                        className: 'w-[320px]',
                                    }}
                                    onChange={(event) => handleVariantChange(index, 'quantity', event.target.value)}
                                />
                            </div>
                            <CloseOutlinedIcon className="text-red " onClick={() => handleDeleteVariant(index)} />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button>CANCEL</button>
                <button onClick={handleSubmit}>SAVE & ON SALE</button>
                <button>SAVE & HIDDEN</button>
            </div>
        </div>
    );
};

export default AddNewProduct;
