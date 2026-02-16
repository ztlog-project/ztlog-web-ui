'use client';

import dynamic from 'next/dynamic';
import Footer from './Footer';

const Header = dynamic(() => import('./Header'), { ssr: false });
const SideBar = dynamic(() => import('./SideBar'), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-wrap">
      <Header />
      <div className="wrapper container px-3 px-lg-3 main-section">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <SideBar />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
