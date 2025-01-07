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
import { PAGE_URL, s3ImageListProcessor, SERVER_URL } from '../helper/constants';
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
import UploadFilesInput from './common/upload_files_input';

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
        header_section: {
            announcement: "",
            tagline: "",
            sub_title: "",
            description: "",
            images: []
        },
        head_tagline: '',
        button_title: '',
        benefits_section: [],
        similar_products: [],
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
            similar_products:[],
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
        handleFetchSimilarProducts();
        setTimeout(() => {

            setLoading(false);
            if (formData.product_title !== '' && formData.price !== '')
                setFormEmpty(false);

        }, 500);

        // const images = await s3ImageListProcessor(files);
        // console.log(images);

    }


    const handleOpenModal = () => setOpenModal(true);
    const handleOpenModal2 = () => { setEdit(false); setOpenModal2(true); }

    const handleCloseModal = () => setOpenModal(false);
    const handleCloseModal2 = () => {

        setOpenModal2(false);
        setCurrentBenefit({ id: 1, benefit: '', description: '', file: [] });

    }

    const handlePublish = async () => {
        let url = '';
    
        try {
            setLoading2(true);
    
            // Create a local copy of formData to ensure synchronization
            let updatedFormData = { ...formData };
    
            // Process files2 and update header_section
            if (files2.length >= 0) {
                const images = await s3ImageListProcessor(files2);
            
                // Prepare header_section with all required fields
                const updatedHeaderSection = {
                    ...formData.header_section, // Preserve existing fields in header_section
                    announcement: formData.announcement, // Ensure announcement is updated
                    tagline: formData.head_tagline, // Ensure tagline is updated
                    sub_title: formData.subtitle, // Map subtitle to sub_title
                    description: formData.description, // Map description
                    images, // Add processed images
                };
                
                 // Update the local copy of updatedFormData
                updatedFormData = {
                    ...updatedFormData,
                    header_section: updatedHeaderSection,
                };
            }
            
    
            // Process files and update images
            if (files.length >= 0) {
                const images = await s3ImageListProcessor(files);
                updatedFormData.images = images;
            }
    
            // Process benefits_section
            if (benefits.length > 0) {
                const updatedBenefits = await Promise.all(
                    benefits.map(async (benefit) => {
                        const processedFiles = await s3ImageListProcessor(benefit.file);
                        return { ...benefit, file: processedFiles };
                    })
                );
                updatedFormData.benefits_section = updatedBenefits;
            }
    
            // Update formData state with the final processed data
            setFormData(updatedFormData);
            // Construct the request body using the updated local copy
            const reqBody = {
                product_id: updatedFormData.product_id,
                announcement: updatedFormData.announcement,
                tagline: updatedFormData.tagline,
                sub_title: updatedFormData.subtitle,
                description: updatedFormData.description,
                product_title: updatedFormData.product_title,
                price: updatedFormData.price,
                variant_id: updatedFormData.variant_id,
                images: updatedFormData.images,
                benefits_section: updatedFormData.benefits_section,
                template_id: updatedFormData.template_id,
                header_section: updatedFormData.header_section,
                similar_products: updatedFormData.similar_products.map(product => (product.value)),
                template_type: updatedFormData.template_id,
                Custom_Button_Label: updatedFormData.button_title,
            };

            // Send the request
            const resp = await PAGE_URL.post('/get-live-url', reqBody);
            const result = resp.data.result;
    
            setUrl(result.data);
            url = result.data;
    
        } catch (e) {
            toast.error('Something went wrong!');
            console.log(e.message);
        } finally {
            setLoading2(false);
            if (url !== '') {
                handleOpenModal();
            }
        }
    };
    
    

    const handleFetchProduct = async () => {

        try {

            setShowLoader(true);
            const response = await SERVER_URL.get(`api/products/${formData.product_id}`);
            const result = response.data.product;            

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
            setFiles2([result.images[0]]);
            setFiles(result.images);


        } catch (e) {

            toast.error('Something went wrong!');

        } finally {

            setShowLoader(false);
            if (formData.product_title !== '' && formData.price !== '')
                setFormEmpty(false);

        }

    }


    const handleFetchSimilarProducts = async () => {

            try {
        
                setShowLoader(true);
        
                // Assuming formData.product_ids is an array of product IDs
                const productIds = formData.similar_products.map((item)=>item.value); // Example: ['6924359565473', '7009265811617']
        
                // Make an array of promises for each product request
                const productRequests = productIds.map(id => SERVER_URL.get(`api/products/${id}`));
        
                // Use Promise.all to fetch all products concurrently
                const responses = await Promise.all(productRequests);
                const similarProducts = responses.map(response => response.data.product);
                setSelectedProducts(similarProducts);
                
        
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

    const handleDeleteItem = (ind) => {
        setBenefits(benefits.filter((_, i) => i !== ind));
    }

    const handleEditItem = (ind) => {

        setOpenModal2(true);
        setCurrentBenefit(benefits[ind]);
        setCurrentBenefitId(ind);
        setEdit(true);

    }

    const handleSelectedProducts = (selectedProducts) => {
        // Extract only the 'value' (product IDs) from the selected products
    
        // Update the similar_products field in formData
        setFormData(prevState => ({
            ...prevState,
            similar_products: selectedProducts, // This updates the state with the selected product IDs
        }));
    };
    
    

    const handleSaveModal = () => {

        if (isEdit) {

            const allData = benefits.map((x, i) => {
                if (i === benefitId) {
                    return {
                        id: i + 1,
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

        const allBenefits = [...benefits];
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

                        <UploadFilesInput formData={formData} sectionState={currentBenefit}
                            setSectionState={setCurrentBenefit} />

                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleSaveModal} className='p-2 rounded-sm bg-black hover:opacity-70 transition-colors duration-150 text-white w-[100px]'>{isEdit ? 'Edit' : 'Add'}</button>
                        <button onClick={handleCloseModal2} className='p-2 rounded-sm bg-red-500 hover:bg-red-700 transition-colors duration-150 text-white w-[100px]'>Close</button>
                    </DialogActions>
                </Dialog>

                {/* All the modals/Dialogs on top for readbility */}

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
                            <div className='p-2 bg-black w-full rounded-sm text-white'>Header Section</div>
                                <Grid2 spacing={1} container size={12}>
                                    {formData.template_id === '2' && <TextField disabled={formData.product_id === ''} name='announcement' value={formData.announcement} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Announcement (optional)" variant="outlined" fullWidth />}
                                    {formData.template_id === '2' && <TextField name='head_tagline' value={formData.head_tagline} onChange={handleChange} id="head_tagline" className='focus:outline-black' label='Top Headline (Optional)' variant='outlined' fullWidth />}
                                    {formData.template_id === '2' &&
                                        <UploadFilesInput formData={formData} sectionState={files2} setSectionState={setFiles2} />
                                    }
                                    {formData.template_id === '2' && <TextField name='button_title' value={formData.button_title} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Button Titles" variant="outlined" fullWidth />}

                                    
                                    {formData.template_id === '2' &&
                                        <div className='w-full'>
                                            <div className='p-2 bg-black w-full rounded-sm text-white mb-2'>Branding</div>
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
                                                                    <div>Benefit - {i + 1}</div>
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
                                    {formData.template_id === '1' && <>
                                        <TextField disabled={formData.product_id === ''} name='announcement' value={formData.announcement} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Announcement (optional)" variant="outlined" fullWidth />
                                    <TextField disabled={formData.product_id === ''} name='tagline' value={formData.tagline} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Tagline (optional)" variant="outlined" fullWidth />
                                    <TextField disabled={formData.product_id === ''} name='subtitle' value={formData.subtitle} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Sub title (optional)" variant="outlined" fullWidth />
                                    </>
                                    }
                                    
                                    <div className='p-2 bg-black w-full rounded-sm text-white mb-2'>Product Details</div>
                                    <Grid2 spacing={1} container size={12}>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField disabled={true} name='product_title' fullWidth value={formData.product_title} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Product title" variant="outlined" />
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 6 }}>
                                            <TextField disabled name='price' type='number' fullWidth value={formData.price} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Price ($)" variant="outlined" />
                                        </Grid2>
                                    </Grid2>
                                    <TextField disabled={formData.product_id === ''} name='description' value={formData.description} onChange={handleChange} id="outlined-basic" className='focus:outline-black' label="Description" variant="outlined" multiline rows={5} fullWidth />

                                    <UploadFilesInput formData={formData} sectionState={files} setSectionState={setFiles} />

                                    {formData.template_id === '2' && <div className='w-full'>
                                        <div className='p-2 bg-black w-full rounded-sm text-white mb-2'>Recommend Similar Products</div>
                                        <div className='border border-gray-400 w-full rounded-md'>
                                            <ReactSelect className='focus:outline-black' isMulti value={formData.similar_products} onChange={handleSelectedProducts} placeholder='Select Products' options={multiselectProduct} />
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
                                similarProductsDetails={selectedProducts}
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