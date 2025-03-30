// GalleryCarousel.js
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const GalleryCarousel = () => {
    const CustomArrow = ({ direction, onClick }) => (
        <button 
            onClick={onClick}
            className={`absolute top-1/2 z-10 -translate-y-1/2 
                        bg-black bg-opacity-50 cursor-pointer hover:bg-opacity-75 rounded-full p-2
                        ${direction === 'prev' ? 'left-2' : 'right-2'}`}
            aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
        >
            {direction === 'prev' ? (
                <ChevronLeft className="text-white w-6 h-6" />
            ) : (
                <ChevronRight className="text-white w-6 h-6" />
            )}
        </button>
    );

    return (
        <div className="relative h-full">
            <Carousel
                autoPlay
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) => (
                    <CustomArrow direction="prev" onClick={onClickHandler} />
                )}
                renderArrowNext={(onClickHandler, hasNext, label) => (
                    <CustomArrow direction="next" onClick={onClickHandler} />
                )}
                renderIndicator={() => null}
                className="h-full"
            >
                <div className="max-h-[600px]">
                    <img src="/1.png" alt="Luxury Watch 1" className="object-contain h-full w-full" />
                </div>
                <div className="max-h-[600px]">
                    <img src="/2.png" alt="Luxury Watch 2" className="object-contain h-full w-full" />
                </div>
                <div className="max-h-[600px]">
                    <img src="/3.png" alt="Luxury Watch 2" className="object-contain h-full w-full" />
                </div>
                <div className="max-h-[600px]">
                    <img src="/4.png" alt="Luxury Watch 2" className="object-contain h-full w-full" />
                </div>
                <div className="max-h-[600px]">
                    <img src="/5.png" alt="Luxury Watch 2" className="object-contain h-full w-full" />
                </div>
                <div className="max-h-[600px]">
                    <img src="/6.png" alt="Luxury Watch 2" className="object-contain h-full w-full" />
                </div>
                <div className="max-h-[600px]">
                    <img src="/7.png" alt="Luxury Watch 2" className="object-contain h-full w-full" />
                </div>
                <div className="max-h-[600px]">
                    <img src="/8.png" alt="Luxury Watch 2" className="object-contain h-full w-full" />
                </div>
                <div className="max-h-[600px]">
                    <img src="/9.png" alt="Luxury Watch 2" className="object-contain h-full w-full" />
                </div>
                <div className="max-h-[600px]">
                    <img src="/10.png" alt="Luxury Watch 2" className="object-contain h-full w-full" />
                </div>
            </Carousel>
        </div>
    );
};

export default GalleryCarousel;