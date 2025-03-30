"use client";
import React, { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
    const [resultImage, setResultImage] = useState("");


    return (
        <ImageContext.Provider value={{ resultImage, setResultImage }}>
            {children}
        </ImageContext.Provider>
    );
};

export const useImage = () => useContext(ImageContext);