import axios from "axios";

export const ENV = import.meta.env.VITE_ENV;
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
export const VITE_DOMAIN = import.meta.env.VITE_DOMAIN;
export const VITE_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const PAGE_URL = axios.create({
    baseURL: import.meta.env.VITE_PAGE_URL
})

export const SERVER_URL = axios.create({
    baseURL: ENV === 'dev' ? import.meta.env.VITE_DEV_SERVER_URL : import.meta.env.VITE_PROD_SERVER_URL
})


// This function accepts a list of images, seperate blog url/images from them and upload them to s3. 
// In response it returns a similar array of images with s3 urls in place of the blob once.
export const s3ImageListProcessor = async (images) => {
    const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
    const region = import.meta.env.VITE_AWS_REGION;

    const processedImagesList = await Promise.all(
        images.map(async (image) => {
            if (image.startsWith('blob:')) {
                // Convert blob URL to file object
                const response = await fetch(image);
                const blob = await response.blob();
                const file = new File([blob], `file-${Date.now()}`, { type: blob.type });

                // Request a pre-signed URL from the backend using SERVER_URL
                const presignedResponse = await SERVER_URL.post('/generate-presigned-url', {
                    fileName: file.name,
                    fileType: file.type,
                });

                const { url: s3Url, key } = presignedResponse.data;

                // Upload the file to S3
                await fetch(s3Url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': file.type,
                    },
                    body: file,
                });

                // Return the S3 URL
                return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
            }

            // Return the existing URL if it's not a blob
            return image;
        })
    );
    
    return processedImagesList;
};


