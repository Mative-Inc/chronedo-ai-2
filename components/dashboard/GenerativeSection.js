"use client";
import { useUser } from '@/context/UserContext';
import { useImage } from '@/context/ImageContext';
import { DownloadIcon, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShimmerEffect = () => {
    return (
        <div className="animate-pulse">
            <div className="h-full w-full bg-gray-700 rounded-xl"></div>
        </div>
    );
};

const GenerativeSection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [userImages, setUserImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();
    const { resultImage } = useImage();

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleDownload = () => {
        if (!selectedImage) return;

        const link = document.createElement('a');
        link.href = selectedImage;
        link.download = 'downloaded_image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const fetchImages = async () => {
            if (!user?.userId && !user?._id) return;

            try {
                const userId = user?.userId || user._id;
                const res = await axios.get(`/api/image/${userId}`);
                setUserImages(res.data.images || []);
            } catch (error) {
                console.error("Error fetching images:", error);
                setUserImages([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [user]);

    useEffect(() => {
        if (resultImage) {
            setUserImages((prevImages) => [resultImage, ...prevImages]);
        }
    }, [resultImage]);

    return (
        <div className='flex flex-col w-full h-full gap-4 px-4 sm:px-6'>
            <p className='text-white font-bold text-lg sm:text-xl'>
                Pickup where you left off in Generative Section
            </p>

            {/* Grid Container */}
            <div className="w-full">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={`shimmer-${index}`}
                                className="aspect-square rounded-xl overflow-hidden"
                            >
                                <ShimmerEffect />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {userImages.map((item, index) => (
                            <div
                                key={`image-${index}`}
                                className="aspect-square border border-gray-50 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-800 transition relative"
                                onClick={() => handleImageClick(item)}
                            >
                                <img
                                    src={item}
                                    alt={`Generated image ${index + 1}`}
                                    className='w-full h-full object-cover'
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className='fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4'>
                    <div className='relative bg-gray-900 rounded-lg w-full max-w-4xl'>
                        <img
                            src={selectedImage}
                            alt="Enlarged view"
                            className='w-full max-h-[70vh] object-contain rounded-xl shadow-lg'
                        />
                        <div className='flex p-2 items-center justify-center mt-4'>
                            <div className='flex items-center border border-[#0093E87D] rounded-xl p-3 sm:p-4 gap-4'>
                                <button
                                    onClick={handleDownload}
                                    className='text-white cursor-pointer bg-gradient-to-r from-[#21ABFD] to-[#0055DE] px-3 py-1 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 text-sm sm:text-base'
                                >
                                    Download
                                    <DownloadIcon className='w-3 h-3 sm:w-4 sm:h-4' />
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className='absolute cursor-pointer top-2 right-2 sm:top-4 sm:right-4 text-white bg-black/50 rounded-full p-1 sm:p-2 hover:bg-black'
                            aria-label="Close image preview"
                        >
                            <XCircle className='w-6 h-6 sm:w-8 sm:h-8' />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerativeSection;