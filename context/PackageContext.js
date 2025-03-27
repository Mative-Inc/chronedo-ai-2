"use client"
import React, { createContext, useContext, useState } from "react";

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
    const [selectedPackage, setSelectedPackage] = useState(null);

    const savePackage = async (packageData) => {
        try {
            // Save the package to the database
            const response = await fetch("/api/packages/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(packageData),
            });

            if (!response.ok) {
                throw new Error("Failed to save package");
            }

            const data = await response.json();
            console.log("Package saved:", data);
            setSelectedPackage(data); 
        } catch (error) {
            console.error("Error saving package:", error);
        }
    };

    return (
        <PackageContext.Provider value={{ selectedPackage, savePackage }}>
            {children}
        </PackageContext.Provider>
    );
};

export const usePackage = () => useContext(PackageContext);