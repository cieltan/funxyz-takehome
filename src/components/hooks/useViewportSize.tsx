import { useState, useEffect } from 'react';

interface ViewportSize {
    width: number;
    height: number;
}

export const useViewportSize = () => {
    const [size, setSize] = useState<ViewportSize>({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getDynamicValue = (mobileValue: number, desktopValue: number, breakpoint = 640) => {
        return size.width < breakpoint ? mobileValue : desktopValue;
    };

    return { ...size, getDynamicValue };
}; 