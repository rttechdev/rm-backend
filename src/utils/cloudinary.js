import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_SECRET, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Use environment variable for API secret
});

/**
 * Upload an image to Cloudinary
 * @param {string} imagePath - Path or URL of the image to upload
 * @param {string} publicId - Public ID for the uploaded image
 * @returns {Promise<Object>} Upload result from Cloudinary
 */
const uploadOnCloudinary = async (imagePath, publicId) => {
    try {
        if(!imagePath || !publicId) return null
        const uploadResult = await cloudinary.uploader.upload(imagePath, {
            //public_id: publicId,
            resource_type: 'auto', 
        });
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(imagePath); // Clean up the file if upload fails
        console.error('Error uploading image:', error);
        throw error;
    }
};

/**
 * Generate optimized URL for an image
 * @param {string} publicId - Public ID of the image
 * @returns {string} Optimized image URL
 */
const getOptimizedUrl = (publicId) => {
    return cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto'
    });
};

/**
 * Generate auto-cropped square URL for an image
 * @param {string} publicId - Public ID of the image
 * @param {number} width - Width of the cropped image (default: 500)
 * @param {number} height - Height of the cropped image (default: 500)
 * @returns {string} Auto-cropped image URL
 */
const getAutoCropUrl = (publicId, width = 500, height = 500) => {
    return cloudinary.url(publicId, {
        crop: 'auto',
        gravity: 'auto',
        width: width,
        height: height,
    });
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<Object>} Deletion result from Cloudinary
 */
const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

// Export all functions
export {
    uploadOnCloudinary,
    getOptimizedUrl,
    getAutoCropUrl,
    deleteImage
};

// Default export for the main cloudinary instance
export default cloudinary;