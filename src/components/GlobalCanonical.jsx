import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function GlobalCanonical() {
  const location = useLocation();
  const canonical = `https://www.llamacorp.in${location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '')}`;
  
  return (
    <Helmet>
      <link data-rh="true" rel="canonical" href={canonical} />
      <meta data-rh="true" property="og:url" content={canonical} />
    </Helmet>
  );
}
