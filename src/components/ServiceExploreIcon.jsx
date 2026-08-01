import React from 'react';

export default function ServiceExploreIcon({ 'aria-label': ariaLabel }) {
  return (
    <div 
      className="service-explore-icon" 
      aria-label={ariaLabel || "Explore service"} 
      aria-hidden={!ariaLabel}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '56px',
        height: '56px',
        isolation: 'isolate',
        cursor: 'pointer'
      }}
    >
      <style>{`
        .service-explore-icon svg, .service-explore-icon .page { position:absolute; display:block; }
        .service-explore-icon .folder { width:47px; height:48px; left:4px; bottom:2px; z-index:1; }
        .service-explore-icon .back-page { width:40px; height:40px; left:9px; top:3px; z-index:2; transform:rotate(-7deg) translateY(3px); transform-origin:center; transition:transform 260ms cubic-bezier(.22,1,.36,1); }
        .service-explore-icon .front-page { width:40px; height:39px; left:8px; top:1px; z-index:3; transform:rotate(4deg) translateY(5px); transform-origin:center; transition:transform 280ms cubic-bezier(.22,1,.36,1); }
        .service-explore-icon .label { width:48px; height:35px; left:4px; top:6px; z-index:4; opacity:.96; transform:translateY(4px); transition:transform 260ms cubic-bezier(.22,1,.36,1), opacity 180ms ease; }
        .service-explore-icon .see-more { position:absolute; z-index:5; left:50%; top:22px; color:#fff; font-family:cursive; font-size:6px; white-space:nowrap; transform:translate(-50%,-50%) rotate(3deg); opacity:.92; transition:transform 260ms cubic-bezier(.22,1,.36,1); }
        .service-explore-icon .arrow { width:42px; height:26px; left:7px; bottom:0; z-index:0; transition:transform 260ms cubic-bezier(.22,1,.36,1); }
        .service-explore-icon:hover .back-page { transform:rotate(-10deg) translate(-2px,-3px); }
        .service-explore-icon:hover .front-page { transform:rotate(8deg) translate(3px,-8px); }
        .service-explore-icon:hover .label { transform:translateY(-3px); opacity:1; }
        .service-explore-icon:hover .see-more { transform:translate(-50%,-8px) rotate(5deg); }
        .service-explore-icon:hover .arrow { transform:translateY(2px); }
      `}</style>

      <svg className="arrow" viewBox="-1 -1 42 26" fill="none" aria-hidden="true">
        <defs><linearGradient id="arrowGradient" x1="20" y1="1" x2="20" y2="23"><stop stopColor="#666" stopOpacity="0"/><stop offset="1" stopColor="#111"/></linearGradient></defs>
        <path d="M0.0879 0.912V16.786c0 3.608 2.925 6.533 6.533 6.533h26.844c3.608 0 6.533-2.925 6.533-6.533V0.912" stroke="url(#arrowGradient)" strokeWidth="0.57" strokeLinecap="round"/>
      </svg>
      
      <svg className="folder" viewBox="0 0 47 48" fill="none" aria-hidden="true">
        <defs><linearGradient id="folderGradient" x1="23.5" y1="0" x2="24.2" y2="14"><stop stopColor="#4C5054"/><stop offset="1" stopColor="#2A2F38"/></linearGradient></defs>
        <path d="M9.3855 0C4.202 0 0 4.202 0 9.3855v30.558C0 44.3865 3.6018 47.9882 8.0447 47.9882h30.8668c4.443 0 8.0447-3.6017 8.0447-8.0447V14.6381c0-4.443-3.6017-8.0447-8.0447-8.0447H28.465c-.6607 0-1.2703-.3552-1.5961-.9299L25.24 2.7898C24.2626 1.0656 22.4337 0 20.4517 0H9.3855Z" fill="url(#folderGradient)"/>
        <path d="M.0287 9.3855C.0287 4.2179 4.2179.0287 9.3855.0287h11.0662c1.9717 0 3.791 1.06 4.7633 2.7753l1.629 2.8737c.3309.5837.95.9444 1.621.9444h10.4465c4.4271 0 8.0161 3.5889 8.0161 8.0161v25.3054c0 4.4272-3.5889 8.0161-8.0161 8.0161H8.0447c-4.4271 0-8.016-3.5889-8.016-8.0161V9.3855Z" stroke="#585858" strokeWidth=".16"/>
      </svg>
      
      <svg className="page back-page" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M7.1819.3359 35.0163 1.6136c2.831.1299 5.0331 2.5309 4.9184 5.3626l-1.1178 27.598c-.1147 2.8316-2.5026 5.0216-5.3334 4.8917L5.6491 38.1882c-2.831-.1299-5.0331-2.5309-4.9184-5.3626l1.1178-27.598C1.9631 2.3961 4.351.206 7.1819.3359Z" fill="#DFDFDF" stroke="#CECECE" strokeWidth=".16"/>
      </svg>
      
      <svg className="page front-page" viewBox="0 0 40 39" fill="none" aria-hidden="true">
        <path d="M.6349 7.4125C.5273 4.5647 2.7481 2.1578 5.5954 2.0366L33.4093.8519c2.8472-.1213 5.2426 2.089 5.3502 4.9368l.9896 26.1786c.1076 2.8478-2.1133 5.2547-4.9605 5.3759L6.9747 38.5279c-2.8472.1212-5.2426-2.089-5.3503-4.9368L.6349 7.4125Z" fill="#F4F4F4" stroke="#E3E3E3" strokeWidth=".16"/>
      </svg>
      
      <svg className="label" viewBox="0 0 48 35" fill="none" aria-hidden="true">
        <defs><linearGradient id="labelGradient" x1="24" y1="0" x2="27.6" y2="25.8"><stop stopColor="#4C5054"/><stop offset=".78" stopColor="#272A31"/><stop offset="1" stopColor="#23262C"/></linearGradient></defs>
        <path d="M.667 4.6C.667 2.2436 2.5772.3334 4.9337.3334h11.8302c1.2563 0 2.4486.5536 3.2593 1.5132l3.3391 3.9525c.8107.9596 2.003 1.5132 3.2593 1.5132H43.067c2.3564 0 4.2667 1.9103 4.2667 4.2667V27c0 4.4183-3.5818 8-8 8H8.667c-4.4183 0-8-3.5817-8-8V4.6Z" fill="url(#labelGradient)" fillOpacity=".8"/>
      </svg>
      
      <span className="see-more" aria-hidden="true">explore</span>
    </div>
  );
}
