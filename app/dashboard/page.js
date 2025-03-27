"use client";

import GenerativeSection from '@/components/dashboard/GenerativeSection';
import HeroSection from '@/components/dashboard/HeroSection';
import { CloudUpload, UploadIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    


    return (
        <div className='flex flex-col w-full h-full gap-4'>
            <HeroSection />
            <GenerativeSection />
        </div>
    );
}
