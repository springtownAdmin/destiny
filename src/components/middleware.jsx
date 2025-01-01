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
import { PAGE_URL, SERVER_URL } from '../helper/constants';
import { MdPublishedWithChanges } from "react-icons/md";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoCopyOutline } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ReactSelect from 'react-select';
import { Template01, Template02 } from './templates';

const Middleware = () => {

    const [formData, setFormData] = useState({
        product_id: '',
        tagline: '',
        subtitle: '',
        product_title: '',
        announcement: '',
        description: '',
        price: '',
        variant_id: '',
        template_id: '1',

        head_tagline: '',
        button_title: '',
        benefits: []

    });

    const [products, setProducts] = useState([]);
    const [templates, setTemplates] = useState([
        {
            id: 1,
            name: 'Template - 01',
            key: 'template-01',
            value: '1'
        },
        {
            id: 2,
            name: 'Template - 02',
            key: 'template-02',
            value: '2'
        }
    ])

    const [isFormEmpty, setFormEmpty] = useState(true);

    const fileRef = useRef(null);
    const fileRef2 = useRef(null);
    const fileRef3 = useRef(null);
    const [files, setFiles] = useState([]);
    const [files2, setFiles2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [getUrl, setUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [templateId, setTemplateId] = useState('1');
    const [benefits, setBenefits] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [benefitId, setCurrentBenefitId] = useState(0);

    const [multiselectProduct, setMultiSelectProduct] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [currentBenefit, setCurrentBenefit] = useState({
        id: 1,
        benefit: '',
        description: '',
        file: []
    });

    useEffect(() => {

        const getAllProductsList = async (cursor = null) => {

            try {

                const response = await SERVER_URL.get('api/products');
                const productData = response.data.products;

                const updatedProductData = productData.map((x) => ({ id: x.id, title: x.title, key: x.id.match(/(\d+)$/)[0] }))
                setProducts(updatedProductData);

                setMultiSelectProduct(updatedProductData.map((x) => ({ value: x.key, label: x.title })));

            } catch (e) {

                console.log(e.message);
                toast.error('Something went wrong!');

            }

        }

        getAllProductsList();

    }, []);

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const handleChange2 = (e) => {

        setCurrentBenefit({ ...currentBenefit, [e.target.name]: e.target.value });

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

    const handleFiles2 = (e) => {

        const allFiles = Array.from(e.target.files);
        const allURLs = allFiles.map(v => URL.createObjectURL(v));
        setFiles2([ ...files2, ...allURLs ]);
        // console.log(allFiles);

    }

    const handleFiles3 = (e) => {

        const allFiles = Array.from(e.target.files);
        const allURLs = allFiles.map(v => URL.createObjectURL(v));
        // setFiles3([ ...files3, ...allURLs ]);
        setCurrentBenefit({ ...currentBenefit, file: [ ...currentBenefit.file, ...allURLs ] });
        // console.log(allFiles);

    }

    const removeFiles = (index) => {
        setFiles(files.filter((_, i) => i !== index))
    }

    const removeFiles2 = (index) => {
        setFiles2(files2.filter((_, i) => i !== index))
    }

    const removeFiles3 = (index) => {

        const allFiles = currentBenefit.file.filter((_, i) => i !== index);
        setCurrentBenefit({ ...currentBenefit, file: allFiles });
        // setFiles3(files3.filter((_, i) => i !== index))
    }

    const handleReset = () => {

        setFiles([]);
        setFiles2([]);
        setFormData({
            tagline: '',
            subtitle: '',
            product_title: '',
            price: '',
            announcement: '',
            description: '',
            variant_id: '',
            product_id: '',
            template_id: '1',

            head_tagline: '',
            button_title: 'Shop Now',
            benefits: []
        });
        setFormEmpty(true);
        setBenefits([]);
        setCurrentBenefit({ id: 1, benefit: '', description: '', file: [] });

    }

    const handleGenerate = async () => {

        setLoading(true);
        setTimeout(() => {

            setLoading(false);
            if (formData.product_title !== '' && formData.price !== '')
                setFormEmpty(false);

        }, 500);

    }

    const handleOpenModal = () => setOpenModal(true);
    const handleOpenModal2 = () => { setEdit(false); setOpenModal2(true); }

    const handleCloseModal = () => setOpenModal(false);
    const handleCloseModal2 = () => {
        
        setOpenModal2(false);
        setCurrentBenefit({ id: 1, benefit: '', description: '', file: [] });

    }

    const handlePublish = async () => {

        let url = ''

        try {

            const reqBody = {
                product_id: formData.product_id,
                announcement: formData.announcement,
                tagline: formData.tagline,
                sub_title: formData.subtitle,
                description: formData.description,
                product_title: formData.product_title,
                price: formData.price,
                variant_id: formData.variant_id,
                images: files,
                template_id: formData.template_id
            }

            setLoading2(true);
            const resp = await PAGE_URL.post('/get-live-url', reqBody);
            const result = resp.data.result;

            setUrl(result.data);
            url = result.data;

        } catch (e) {

            toast.error('Something went wrong!');
            console.log(e.message);

        } finally {

            setLoading2(false);
            url !== '' && handleOpenModal();

        }

    }

    const handleFetchProduct = async () => {

        try {

            setShowLoader(true);
            const response = await SERVER_URL.get(`api/products/${formData.product_id}`);
            const result = response.data.product;
            console.log(result);
            setFormData({
                tagline: '',
                subtitle: '',
                announcement: '',
                template_id: '1',
                button_title: 'Shop Now',
                product_id: result.id.match(/(\d+)$/)[0],
                product_title: result.title,
                price: result.price,
                description: result.description,
                variant_id: result.variant_id.match(/(\d+)$/)[0]
            })
            setFiles(result.images);

        } catch (e) {

            toast.error('Something went wrong!');

        } finally {

            setShowLoader(false);
            if (formData.product_title !== '' && formData.price !== '')
                setFormEmpty(false);

        }

    }

    const handleCopyURL = async () => {

        try {

            await navigator.clipboard.writeText(getUrl);
            setCopied(true);

            // Reset the copied state after a delay
            setTimeout(() => setCopied(false), 800);

        } catch (error) {

            console.error("Failed to copy: ", error);

        }

    }

    const handleTemplate = () => {
        setTemplateId(formData.template_id);
    }

    const handleFileOpen2 = () => {

        fileRef2.current?.click();

    }

    const handleFileOpen3 = () => {

        fileRef3.current?.click();

    }

    const handleDeleteItem = (ind) => {

        setBenefits(benefits.filter((_,i) => i !== ind));

    }

    const handleEditItem = (ind) => {

        setOpenModal2(true);
        setCurrentBenefit(benefits[ind]);
        setCurrentBenefitId(ind);
        setEdit(true);

    }

    const handleSelectedProducts = (selectedOption) => {

        setSelectedProducts(selectedOption || []);

    }

    const handleSaveModal = () => {

        if (isEdit) {

            const allData = benefits.map((x, i) => {
                if (i === benefitId) {
                    return {
                        id: i+1,
                        benefit: currentBenefit.benefit,
                        description: currentBenefit.description,
                        file: currentBenefit.file
                    };
                }
                return x;
            });

            setBenefits(allData);
            handleCloseModal2();
            setEdit(false);

            return;

        }

        const allBenefits = [ ...benefits ];
        const benefit = {
            id: allBenefits.length + 1,
            benefit: currentBenefit.benefit,
            description: currentBenefit.description,
            file: currentBenefit.file
        }
        allBenefits.push(benefit);
        setBenefits(allBenefits);
        handleCloseModal2();
        

    }

    return (
        <div className='min-h-screen'>
            <div className='md:flex gap-2 m-4 h-full'>

                <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
                    <DialogTitle>Published URL</DialogTitle>
                    <DialogContent dividers>
                        <div className='flex w-full relative items-center border p-2 rounded-sm bg-gray-50 border-dashed border-gray-500'>
                            <div className='font-light text-black truncate w-[90%]'>{getUrl}</div>
                            <div disabled={!copied} onClick={handleCopyURL} className={`absolute right-1 border bg-gray-200 ${copied ? 'cursor-not-allowed' : 'hover:bg-gray-300 transition-colors duration-200 cursor-pointer'} p-2 rounded-md`}>
                                {copied ? <IoCheckmarkDoneSharp /> : <IoCopyOutline />}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleCloseModal} className='p-2 rounded-sm bg-red-500 hover:bg-red-700 transition-colors duration-150 text-white w-[100px]'>Close</button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openModal2} onClose={handleCloseModal2} fullWidth>
                    <DialogTitle>{isEdit ? 'Edit' : 'Add'} Benefit</DialogTitle>
                    <DialogContent dividers>
                        <TextField name='benefit' value={currentBenefit.benefit} onChange={handleChange2} id="outlined-basic" className='focus:outline-black' label="Benefit" variant="outlined" fullWidth />
                        <TextField name='description' value={currentBenefit.description} onChange={handleChange2} id="outlined-basic" className='focus:outline-black' style={{ marginTop: '0.5rem' }} label="Description" variant="outlined" multiline rows={3} fullWidth />
                        <div className='w-full mt-2'>
                            <div className='border-dashed w-full min-h-[300px] border border-black rounded-md'>
                                <input ref={fileRef3} type='file' accept="image/*" onChange={handleFiles3} max={4} min={1} multiple className='hidden' />

                                {currentBenefit.file.length > 0 ?
                                
                                    <>
                                        <div className='flex justify-end m-1'><button onClick={handleFileOpen3} className='p-2 border border-gray-300 rounded-sm hover:bg-gray-300 transition-colors duration-150'><FiUpload /></button></div> 
                                        <div className='m-2 flex gap-2 w-full h-[300px] overflow-auto flex-wrap'>
                                            {currentBenefit.file.map((x, i) => {

                                                return (
                                                    <>
                                                        <div key={i} className='h-[100px] w-[100px] relative group'>
                                                            <div className='border border-gray-600 h-full w-full rounded-sm bg-contain bg-no-repeat bg-center' style={{ backgroundImage: `url(${x})` }}>
                                                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm flex items-center justify-center">
                                                                    <button className="absolute top-1 right-1 text-red-500 bg-white" onClick={() => removeFiles3(i)} >
                                                                        <IoIosCloseCircle className="h-5 w-5" />
                                                                        <span className="sr-only">Remove image</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )

                                            })}
                                        </div>
                                    </>

                                :
                                    <div className='w-full h-[300px] flex justify-center items-center' onClick={handleFileOpen3}>
                                        <img className={`opacity-50 ${formData.product_id === '' ? 'cursor-not-allowed' : 'cursor-pointer'}`} src={uploadImg} height={100} width={150} alt='upload-images' />
                                    </div>
                                }
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleSaveModal} className='p-2 rounded-sm bg-black hover:opacity-70 transition-colors duration-150 text-white w-[100px]'>{isEdit ? 'Edit' : 'Add'}</button>
                        <button onClick={handleCloseModal2} className='p-2 rounded-sm bg-red-500 hover:bg-red-700 transition-colors duration-150 text-white w-[100px]'>Close</button>
                    </DialogActions>
                </Dialog>

                <div className='border rounded-md h-full md:w-1/2 mb-3'>
                    <div className='p-3 border-b font-normal underline'>Dynamic Template Generation</div>
                    <div>

                        <div className='m-2'>
                            <Grid2 container spacing={1}>

                                <Grid2 spacing={1} container size={12}>
                                    <Grid2 size={{ xs: 12, md: 8 }}>
                                        <TextField id="select" label="Products" disabled={products.length === 0} name="product_id" value={formData.product_id} onChange={handleChange} select fullWidth>
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
                                    <Grid2 size={{ xs: 12, md: 12 }}>
                                        <TextField id="select" label="Templates" disabled={formData.variant_id === ''} name="template_id" value={formData.template_id} onChange={handleChange} select fullWidth>
                                            {templates.map((x) => (
                                                <MenuItem key={x.key} value={x.value}>{x.name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid2>
                                </Grid2>

                            </Grid2>
                        </div>

                        <Divider />

                        <div className='m-2'>
                            <Grid2 container spacing={1}>
                                <Grid2 spacing={1} container size={12}>
                                    {formData.template_id === '2' && <TextField disabled={formData.product_id === ''} name='announcement' value={formData.announcement} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Announcement (optional)" variant="outlined" fullWidth />}
                                    {formData.template_id  === '2' && <TextField name='head_tagline' value={formData.head_tagline} onChange={handleChange} id="head_tagline" className='focus:outline-black' label='Top Headline (Optional)' variant='outlined' fullWidth />}
                                    {formData.template_id === '2' && 
                                        <div className='w-full'>
                                            <div className='border-dashed w-full min-h-[300px] border border-black rounded-md'>
                                                <input ref={fileRef2} type='file' accept="image/*" onChange={handleFiles2} max={4} min={1} className='hidden' />
                                                {files2.length > 0 ?
    
                                                    <>
                                                        {/* <div className='flex justify-end m-1'><button onClick={handleFileOpen} className='p-2 border border-gray-300 rounded-sm hover:bg-gray-300 transition-colors duration-150'><FiUpload /></button></div> */}
                                                        <div className='m-2 flex gap-2 w-full h-[300px] overflow-auto flex-wrap'>
                                                            {files2.map((x, i) => {
    
                                                                return (
                                                                    <div key={i} className='h-full w-[97%] relative group'>
                                                                        <div className='border border-gray-600 h-full w-full rounded-sm bg-contain bg-no-repeat bg-center' style={{ backgroundImage: `url(${x})` }}>
                                                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm flex items-center justify-center">
                                                                                <button className="absolute top-1 right-1 text-red-500 bg-white" onClick={() => removeFiles2(i)} >
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

                                                    <div className='w-full h-[300px] flex justify-center items-center' onClick={handleFileOpen2}>
                                                        <img className={`opacity-50 ${formData.product_id === '' ? 'cursor-not-allowed' : 'cursor-pointer'}`} src={uploadImg} height={100} width={150} alt='upload-images' />
                                                    </div>

                                                }
                                            </div>
                                        </div>
                                    }
                                    {formData.template_id === '2' && <TextField name='button_title' value={formData.button_title} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Button Titles" variant="outlined" fullWidth />}
                                    {formData.template_id === '2' && 
                                        <div className='w-full'>
                                            <div className='border rounded-md w-full min-h-[300px]'>
                                                <div className='p-3 flex justify-between items-center'>
                                                    <div className='text-gray-500 text-sm'>Product benefits</div>
                                                    <button onClick={handleOpenModal2} className='bg-black p-2 text-white rounded-md hover:opacity-70 transition-all duration-150'><IoMdAddCircleOutline /></button>
                                                </div>
                                                <hr />
                                                <div className='rounded-md h-full'>
                                                    <div className='m-3 max-h-[200px] overflow-y-auto'>

                                                        {
                                                            benefits.map((_, i) => (

                                                                <div key={`benefit-${i}`} className='w-full mb-1 flex items-center justify-between p-2 bg-gray-50 '>
                                                                    <div>Benefit - {i+1}</div>
                                                                    <div className='flex gap-3'>
                                                                        <button onClick={() => handleEditItem(i)} className='hover:text-blue-500 transition-all duration-150'><MdEdit /></button>
                                                                        <button onClick={() => handleDeleteItem(i)} className='hover:text-red-500 transition-all duration-150'><MdDelete /></button>
                                                                    </div>
                                                                </div>

                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {formData.template_id === '1' && <TextField disabled={formData.product_id === ''} name='announcement' value={formData.announcement} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Announcement (optional)" variant="outlined" fullWidth />}
                                    <TextField disabled={formData.product_id === ''} name='tagline' value={formData.tagline} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Tagline (optional)" variant="outlined" fullWidth />
                                    <TextField disabled={formData.product_id === ''} name='subtitle' value={formData.subtitle} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Sub title (optional)" variant="outlined" fullWidth />
                                    <TextField disabled={formData.product_id === ''} name='description' value={formData.description} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Description" variant="outlined" multiline rows={5} fullWidth />

                                    <Grid2 spacing={1} container size={12}>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField disabled={true} name='product_title' fullWidth value={formData.product_title} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Product title" variant="outlined" />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField disabled name='price' type='number' fullWidth value={formData.price} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Price ($)" variant="outlined" />
                                        </Grid2>
                                    </Grid2>

                                    <div className='w-full'>
                                        <div className='border-dashed w-full min-h-[300px] border border-black rounded-md'>
                                            <input ref={fileRef} type='file' disabled={formData.product_id === ''} accept="image/*" onChange={handleFiles} multiple max={4} min={1} className='hidden' />
                                            {files.length > 0 ?

                                                <>
                                                    {/* <div className='flex justify-end m-1'><button onClick={handleFileOpen} className='p-2 border border-gray-300 rounded-sm hover:bg-gray-300 transition-colors duration-150'><FiUpload /></button></div> */}
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
                                                    <img className={`opacity-50 ${formData.product_id === '' ? 'cursor-not-allowed' : 'cursor-pointer'}`} src={uploadImg} height={100} width={150} alt='upload-images' />
                                                </div>
                                            }
                                        </div>
                                    </div>

                                   {formData.template_id === '2' && <div className='w-full'>
                                        <div className='border border-gray-400 w-full rounded-md'>
                                            <ReactSelect className='focus:outline-black' isMulti value={selectedProducts} onChange={handleSelectedProducts} placeholder='Select Products' options={multiselectProduct} />
                                        </div>
                                    </div>}

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

                    {!isFormEmpty && <div className='flex justify-end m-2'>
                        <button disabled={loading} onClick={handlePublish} className={`bg-black p-3 flex items-center justify-center gap-2 rounded-md text-white font-light ${loading2 ? 'cursor-wait' : 'hover:opacity-70 transition-colors duration-150'} w-full md:w-[200px]`}>
                            {loading2 ? <Loader color='#ffffff' /> : <><MdPublishedWithChanges />  Save & Publish</>}
                        </button>
                    </div>}

                    {!isFormEmpty ? <div className='overflow-y-auto overflow-x-hidden m-1 border border-black border-dashed rounded-md w-[98.5%]'>
                        {formData.template_id === '1' ?
                            <Template01 variantId={formData.variant_id} productItem={formData.product_id} tagline={formData.tagline} sub_title={formData.subtitle} product_title={formData.product_title} price={formData.price} images={files} description={formData.description} announcement={formData.announcement} payment={false} /> : 
                            <Template02 
                                button_title={formData.button_title}
                                mainBg={files2[0]}
                                head_tagline={formData.head_tagline} 
                                benefitsData={benefits}

                                variantId={formData.variant_id} 
                                productItem={formData.product_id} 
                                sub_title={formData.subtitle} 
                                product_title={formData.product_title} 
                                price={formData.price} 
                                images={files} 
                                description={formData.description} 
                                announcement={formData.announcement} 
                                payment={false} 
                            />
                        }
                    </div> : <div className='text-red-500 flex justify-center items-center h-[95%]'>No Preview</div>}


                    {/* {!isFormEmpty ? <div className='overflow-y-auto overflow-x-hidden m-1 border border-black border-dashed rounded-md w-[98.5%]'>
                        <ProductCart variantId={formData.variant_id} productItem={formData.product_id} tagline={formData.tagline} sub_title={formData.subtitle} product_title={formData.product_title} price={formData.price} images={files} description={formData.description} announcement={formData.announcement} payment={false} />
                    </div> : <div className='text-red-500 flex justify-center items-center h-[95%]'>No Preview</div>} */}

                    {/* <IPhonePreview>
                        {!isFormEmpty ? <div className='overflow-y-auto overflow-x-hidden scrollbar-hide m-1 border h-[99%] w-[98.5%]'>
                            <ProductCart insideIphonePreview={true} variantId={formData.variant_id} productItem={formData.product_id} tagline={formData.tagline} sub_title={formData.subtitle} product_title={formData.product_title} price={formData.price} images={files} description={formData.description} announcement={formData.announcement} />
                        </div> : <div className='text-red-500 flex justify-center items-center h-full'>No Preview</div>}
                    </IPhonePreview> */}

                </div>

            </div>
        </div>
    );

}

export default Middleware