import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid2 } from '@mui/material';
import uploadImg from '/images/upload-img.jpg';
import { WiStars } from "react-icons/wi";
import { IoIosCloseCircle } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import ProductCart from './product-cart';

const Middleware = () => {


    const [ formData, setFormData ] = useState({
        tagline: '',
        subtitle: '',
        product_title: '',
        price: ''
    });

    const [isFormEmpty, setFormEmpty] = useState(true);

    const fileRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

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
        setFormData({ tagline: '', subtitle: '', product_title: '', price: '' });
        setFormEmpty(true);

    }

    const handleGenerate = () => {

        setLoading(true);
        setTimeout(() => {

            setLoading(false);
            if (formData.product_title !== '' && formData.price !== '' && formData.tagline !== '')
                setFormEmpty(false);

        },2000);

    }

    return (
        <div className='min-h-screen'>
            <div className='md:flex gap-2 m-4 h-full'>

                <div className='border rounded-md h-full md:w-1/2 mb-3'>
                    <div className='p-3 border-b font-normal underline'>Dynamic Template Generation</div>
                    <div className='m-2'>
                        <Grid2 container spacing={1}>
                            <TextField name='tagline' value={formData.tagline} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Tagline" variant="outlined" fullWidth />
                            <TextField name='subtitle' value={formData.subtitle} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Sub title" variant="outlined" fullWidth />
                            <Grid2 spacing={1} container size={12}>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <TextField name='product_title' fullWidth value={formData.product_title} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Product title" variant="outlined" />
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <TextField name='price' type='number' fullWidth value={formData.price} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Price ($)" variant="outlined" />
                                </Grid2>
                            </Grid2>
                            <div className='w-full'>
                                <div className='border-dashed w-full min-h-[300px] border border-black rounded-md'>
                                    <input ref={fileRef} type='file' accept="image/*" onChange={handleFiles} multiple max={4} min={1} className='hidden' />
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
                                            <img className='opacity-50 cursor-pointer' src={uploadImg} height={100} width={150} alt='upload-images' />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className='w-full'>
                                <div className='w-full flex justify-end items-center gap-2'>
                                    <button onClick={handleReset} className='w-[100px] border rounded-md p-3 bg-black border-black text-white hover:bg-white hover:text-black transition-colors duration-150'>Reset</button>
                                    <button className='p-3 flex items-center gap-2 border rounded-md border-black hover:bg-black hover:text-white transition-colors duration-150'>
                                        {loading ? <>Loading...</> : <span className='flex items-center gap-2' onClick={handleGenerate}>Generate site <WiStars size={25} /></span> }
                                    </button>
                                </div>
                            </div>
                        </Grid2>
                    </div>
                </div>

                <div className='md:w-1/2 border rounded-md'>
                    {!isFormEmpty && <div className='overflow-auto m-1'>
                        <ProductCart tagline={formData.tagline} sub_title={formData.subtitle} product_title={formData.product_title} price={formData.price} images={files} />
                    </div>}
                </div>

            </div>
        </div>
    );

}

export default Middleware