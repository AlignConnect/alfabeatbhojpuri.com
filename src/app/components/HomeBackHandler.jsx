// components/HomeBackHandler.jsx
"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const HomeBackHandler = () => {
    const pathname = usePathname();
    const hasRedirected = useRef(false);
    const redirectUrl = "https://www.youtube.com/@alfabeatbhojpuri/videos";
    const isHomePage = pathname === '/';

    useEffect(() => {
        // Sirf Home page par hi kaam kare
        if (!isHomePage) return;

        // Push initial state to history
        window.history.pushState(null, '', window.location.href);

        // Handle popstate (browser back button)
        const handlePopState = (event) => {
            if (!hasRedirected.current) {
                hasRedirected.current = true;

                // Open YouTube in new tab
                const newWindow = window.open(redirectUrl, '_blank');

                // If popup blocked, redirect in same window
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                    window.location.href = redirectUrl;
                }

                // Push state again so user stays on page
                setTimeout(() => {
                    window.history.pushState(null, '', window.location.href);
                    hasRedirected.current = false;
                }, 200);
            }
        };

        // Handle mobile back button
        const handleMobileBack = (event) => {
            if (!hasRedirected.current) {
                hasRedirected.current = true;
                window.open(redirectUrl, '_blank');
                setTimeout(() => {
                    window.history.pushState(null, '', window.location.href);
                    hasRedirected.current = false;
                }, 200);
            }
        };

        // Add event listeners
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('hashchange', handleMobileBack);

        // Cleanup
        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('hashchange', handleMobileBack);
        };
    }, [isHomePage, redirectUrl]);

    return null;
};

export default HomeBackHandler;