import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid2, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import uploadImg from '/images/upload-img.jpg';
import { WiStars } from "react-icons/wi";
import { IoIosCloseCircle } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import ProductCart from './product-cart';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from './common/loader';
import Preview, { IPhonePreview } from './iphone-preview';


const Middleware = () => {


    const [ formData, setFormData ] = useState({
        tagline: '',
        subtitle: '',
        product_title: '',
        announcement: '',
        description: '',
        price: '',
        variant_id: ''
    });

    const [ productItem, setProductItem ] = useState('');
    const [products, setProducts] = useState([]);

    const [ isFormEmpty, setFormEmpty ] = useState(true);

    const fileRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ showLoader, setShowLoader ] = useState(false);

    useEffect(() => {

        const getAllProductsList = async (cursor = null) => {

            try {

                const response = await axios.get('http://54.162.201.2:8000/api/products');
                const productData = response.data.products;

                const updatedProductData = productData.map((x) => ({ id: x.id, title: x.title, key: x.id.match(/(\d+)$/)[0] }))
                setProducts(updatedProductData);

            } catch (e) {

                console.log(e.message);
                toast.error('Something went wrong!');

            }

        }

        getAllProductsList();

    }, []);

    const handleChange = (e) => {

        const key = e.target.name;
        const value = e.target.value;

        // if (key === 'product_title' || key === 'price' ) {

        //     if (value === '') setFormEmpty(false);
        //     console.log({ key, value })

        // }

        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const handleFileOpen = () => {

        fileRef.current?.click();

    }

    const handleFiles = (e) => {

        const allFiles = Array.from(e.target.files);
        const allURLs = allFiles.map(v => URL.createObjectURL(v));
        setFiles([ ...files, ...allURLs ]);
        console.log(allFiles);

    }

    const removeFiles = (index) => {
        setFiles(files.filter((_, i) => i !== index))
    }

    const handleReset = () => {

        setFiles([]);
        setFormData({ tagline: '', subtitle: '', product_title: '', price: '', announcement: '', description: '', variant_id: '' });
        setFormEmpty(true);

    }

    const handleProducts = (e) => {

        setProductItem(e.target.value);

    }

    const handleGenerate = async () => {

        setLoading(true);
        setTimeout(() => {

            setLoading(false);
            if (formData.product_title !== '' && formData.price !== '')
                setFormEmpty(false);

        },500);

    }

    const handleFetchProduct = async () => {

        try {

            setShowLoader(true)
            const response = await axios.get(`http://54.162.201.2:8000/api/products/${productItem}`);
            const result = response.data.product;
            console.log(result);
            setFormData({ ...formData, product_title: result.title, price: result.price, description: result.description, variant_id: result.variant_id })
            // setFormEmpty(false);
            setFiles(result.images);

        } catch (e) {

            toast.error('Something went wrong!');

        } finally {

            setShowLoader(false);

        }

    }

    return (
        <div className='min-h-screen'>
            <div className='md:flex gap-2 m-4 h-full'>

                <div className='border rounded-md h-full md:w-1/2 mb-3'>
                    <div className='p-3 border-b font-normal underline'>Dynamic Template Generation</div>
                    <div>
                        <div className='m-2'>
                            <Grid2 container spacing={1}>
                    
                                <Grid2 spacing={1} container size={12}>
                                    <Grid2 size={{ xs: 12, md: 8 }}>
                                        <TextField id="select" label="Products" disabled={products.length === 0} value={productItem} onChange={handleProducts} select fullWidth>
                                            {products.map((x) => (
                                                <MenuItem key={x.key} value={x.key}>{x.title}</MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 4 }}>
                                        {
                                            showLoader ?
                                            <button className='bg-blue-700 cursor-wait w-full opacity-50 text-white p-4 rounded-md'><Loader color='#ffffff' /></button> :
                                            <button onClick={handleFetchProduct} className='bg-blue-700 w-full hover:bg-blue-800 transition-all duration-150 text-white p-4 rounded-md'>Fetch Details</button>
                                        }
                                    </Grid2>
                                </Grid2>
                                
                            </Grid2>
                        </div>

                        <Divider />

                        <div className='m-2'>
                            <Grid2 container spacing={1}>
                                <Grid2 spacing={1} container size={12}>
                                    <TextField disabled={productItem === ''} name='announcement' value={formData.announcement} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Announcement (optional)" variant="outlined" fullWidth />
                                    <TextField disabled={productItem === ''} name='tagline' value={formData.tagline} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Tagline (optional)" variant="outlined" fullWidth />
                                    <TextField disabled={productItem === ''} name='subtitle' value={formData.subtitle} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Sub title (optional)" variant="outlined" fullWidth />
                                    <TextField disabled={productItem === ''} name='description' value={formData.description} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Description" variant="outlined" multiline rows={5} fullWidth />
                                
                                    <Grid2 spacing={1} container size={12}>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField disabled={productItem === ''} name='product_title' fullWidth value={formData.product_title} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Product title" variant="outlined" />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField disabled name='price' type='number' fullWidth value={formData.price} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Price ($)" variant="outlined" />
                                        </Grid2>
                                    </Grid2>
                                    
                                    <div className='w-full'>
                                        <div className='border-dashed w-full min-h-[300px] border border-black rounded-md'>
                                            <input ref={fileRef} type='file' disabled={productItem === ''} accept="image/*" onChange={handleFiles} multiple max={4} min={1} className='hidden' />
                                            {files.length > 0 ? 
                                            
                                                <>
                                                <div className='flex justify-end m-1'><button onClick={handleFileOpen} className='p-2 border border-gray-300 rounded-sm hover:bg-gray-300 transition-colors duration-150'><FiUpload /></button></div>
                                                <div className='m-2 flex gap-2 w-full h-[300px] overflow-auto flex-wrap'>
                                                    {files.map((x, i) => {

                                                        return (
                                                            <div key={i} className='h-[100px] w-[100px] relative group'>
                                                                <div className='border border-gray-600 h-full w-full rounded-sm bg-contain bg-no-repeat bg-center' style={{ backgroundImage: `url(${x})` }}>
                                                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm flex items-center justify-center">
                                                                        <button className="absolute top-1 right-1 text-red-500 bg-white" onClick={() => removeFiles(i)} >
                                                                            <IoIosCloseCircle className="h-5 w-5" />
                                                                            <span className="sr-only">Remove image</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )

                                                    })}
                                                </div>
                                                </>
                                                
                                            :
                                                <div className='w-full h-[300px] flex justify-center items-center' onClick={handleFileOpen}>
                                                    <img className={`opacity-50 ${productItem === '' ? 'cursor-not-allowed' : 'cursor-pointer'}`} src={uploadImg} height={100} width={150} alt='upload-images' />
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    <div className='w-full'>
                                        <div className='w-full flex justify-end items-center gap-2'>
                                            <button onClick={handleReset} className='w-[100px] border rounded-md p-3 bg-black border-black text-white hover:bg-white hover:text-black transition-colors duration-150'>Reset</button>
                                            {loading ? 
                                                <button className='p-3 gap-2 border rounded-md border-black opacity-50 w-[100px] cursor-wait'>
                                                    <Loader color='#000000' />
                                                </button>
                                                : <button disabled={formData.product_title === '' || formData.price === ''} onClick={handleGenerate} className={`p-3 flex items-center gap-2 border rounded-md ${formData.product_title === '' || formData.price === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white transition-colors duration-150'} border-black`}>
                                                    <span className='flex items-center gap-2'>Generate site <WiStars size={25} /></span>
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </Grid2>
                            </Grid2>
                        </div>

                    </div>
                </div>

                <div className='md:w-1/2 border rounded-md'>
                    {!isFormEmpty ? <div className='overflow-y-auto overflow-x-hidden m-1 border h-[99%] w-[98.5%]'>
                        <ProductCart variantId={formData.variant_id} productItem={productItem} tagline={formData.tagline} sub_title={formData.subtitle} product_title={formData.product_title} price={formData.price} images={files} description={formData.description} announcement={formData.announcement} />
                    </div> : <div className='text-red-500 flex justify-center items-center h-full'>No Preview</div>}
                    
                    {/* <IPhonePreview>
                        {!isFormEmpty ? <div className='overflow-y-auto overflow-x-hidden scrollbar-hide m-1 border h-[99%] w-[98.5%]'>
                            <ProductCart variantId={formData.variant_id} productItem={productItem} tagline={formData.tagline} sub_title={formData.subtitle} product_title={formData.product_title} price={formData.price} images={files} description={formData.description} announcement={formData.announcement} />
                        </div> : <div className='text-red-500 flex justify-center items-center h-full'>No Preview</div>}
                    </IPhonePreview> */}

                </div>

            </div>
        </div>
    );

}

export default Middleware