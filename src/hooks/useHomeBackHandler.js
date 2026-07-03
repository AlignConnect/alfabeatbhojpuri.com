// hooks/useHomeBackHandler.js
import { useEffect, useRef } from 'react';

export const useHomeBackHandler = (redirectUrl = "https://www.youtube.com/@alfabeatbhojpuri") => {
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Handle popstate (browser back/forward buttons)
    const handlePopState = (event) => {
      if (!hasRedirected.current) {
        hasRedirected.current = true;
        // Open YouTube in new tab
        window.open(redirectUrl, '_blank');
        // Also redirect current page to home or keep it
        // window.location.href = '/';
      }
    };

    // Handle beforeunload (user closing tab or navigating away)
    const handleBeforeUnload = (event) => {
      if (!hasRedirected.current) {
        hasRedirected.current = true;
        // Open YouTube in new tab when user tries to leave
        window.open(redirectUrl, '_blank');
        // We can't prevent the unload, but we can open the new tab
      }
    };

    // Push a state to the history so that popstate fires
    window.history.pushState(null, '', window.location.href);

    // Add event listeners
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [redirectUrl]);

  // Function to handle custom back button click
  const handleBackClick = () => {
    if (!hasRedirected.current) {
      hasRedirected.current = true;
      window.open(redirectUrl, '_blank');
    }
  };

  return { handleBackClick };
};