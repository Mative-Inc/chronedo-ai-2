import User from '@/models/User';
import connectDB from '@/lib/mongodb';
import axios from 'axios';

/**
 * Checks if a user exists with the given email
 * @param {string} email - The email to check
 * @returns {Promise<boolean>} - Returns true if user exists, false otherwise
 */
export const checkUserExists = async (email) => {
    try {
        await connectDB();
        const userExists = await User.findOne({ email });
        return !!userExists;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
};

/**
 * Checks if user has reached their upload limit
 * @param {Object} user - The user object (null for visitors)
 * @returns {Promise<{canUpload: boolean, message: string, availableCount: number}>} - Returns upload status
 */
export const checkUploadLimit = async (user) => {
    try {
        if (!user) {
            // Visitor logic
            const maxLimit = 5;
            const currentCount = parseInt(localStorage.getItem("count")) || 0;
            
            return {
                canUpload: currentCount < maxLimit,
                message: currentCount >= maxLimit ? "You've reached the visitor limit. Please upgrade to continue." : "",
                availableCount: maxLimit - currentCount
            };
        } else {
            // Subscriber logic
            const userId = user?.userId || user._id;
            const packageRes = await axios.get(`/api/packages/${userId}`);

            if (!packageRes.data?.name) {
                // Default package for unverified subscribers
                await savePackage({
                    UserId: userId,
                    name: "Free",
                    price: "0",
                    images: 25,
                });
                return {
                    canUpload: true,
                    message: "",
                    availableCount: 25
                };
            }

            const availableCount = packageRes.data.images;
            return {
                canUpload: availableCount > 0,
                message: availableCount <= 0 ? "You've reached your image limit." : "",
                availableCount: availableCount
            };
        }
    } catch (error) {
        console.error('Error checking upload limit:', error);
        throw error;
    }
}; 