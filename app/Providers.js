// // app/Providers.js
// "use client"; // Mark this as a Client Component

// import { SessionProvider } from "next-auth/react";

// export default function Providers({ children }) {
//     return <SessionProvider>{children}</SessionProvider>;
// }

// app/Providers.js
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-FCK76CXTKB', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return <SessionProvider>{children}</SessionProvider>;
}
