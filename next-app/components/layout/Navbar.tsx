import Link from 'next/link';
import Image from 'next/image';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { TelegramIcon } from '@/components/icons/TelegramIcon';
import { NavigationLinks } from './NavigationLinks.client';
import { MobileMenu } from './MobileMenu.client';

export function Navbar() {
  const centerLinks = [
    { label: 'Works', index: 0, href: '/work' },
    { label: 'About', index: 1, href: '/about' },
    { label: 'Services', index: 2, href: '/services' },
    { label: 'Pricing', index: 3, href: '/#pricing' },
    { label: 'Blog', index: 4, href: '/blog' },
    { label: 'FAQs', index: 5, href: '/#faqs' },
  ];

  const rightActions = [
    { 
      type: 'icon', 
      label: 'WhatsApp', 
      bg: 'bg-transparent', 
      index: 5, 
      href: 'https://wa.me/919769285318?text=Hi%20Llamacorp%2C%20I%27d%20like%20to%20discuss%20a%20project.', 
      target: '_blank', 
      rel: 'noopener noreferrer', 
      ariaLabel: 'Chat with Llamacorp on WhatsApp', 
      icon: <WhatsAppIcon className="w-full h-full" /> 
    },
    { 
      type: 'icon', 
      label: 'Telegram', 
      bg: 'bg-transparent', 
      index: 6, 
      href: 'https://t.me/+919769285318', 
      target: '_blank', 
      rel: 'noopener noreferrer', 
      ariaLabel: 'Chat with Llamacorp on Telegram', 
      icon: <TelegramIcon className="w-full h-full" /> 
    },
    { 
      type: 'button', 
      label: "Let's Work", 
      index: 7, 
      href: "mailto:llamacorp8@gmail.com?subject=New%20Project%20Inquiry%20from%20Llamacorp&body=Hi%20Llamacorp%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project.%0A%0AName%3A%0ACompany%3A%0AProject%20details%3A%0ABudget%3A%0ATimeline%3A" 
    }
  ];

  return (
    <header className="fixed top-4 md:top-6 left-0 w-full flex justify-center z-[100] px-4 md:px-5 pointer-events-none box-border">
      <nav 
        className="pointer-events-auto bg-white/70 backdrop-blur-xl border border-black/5 text-[#111] rounded-full p-2 md:p-2.5 flex items-center justify-between w-full max-w-[430px] md:max-w-[950px] shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      >
        {/* Logo - Server Rendered */}
        <Link href="/" className="flex items-center gap-2 pl-2 md:pl-4 pr-2 md:pr-8 font-semibold text-[15px] cursor-pointer shrink-0 no-underline text-[#111]">
          <Image src="/logo2.svg" alt="Llamacorp Logo" width={32} height={32} className="w-8 h-8 object-contain rounded-[5px] overflow-hidden" />
          <span className="hidden md:inline">Llamacorp</span>
        </Link>

        {/* Center Links - Client Interactive Component */}
        <NavigationLinks links={centerLinks} />

        {/* Right Actions & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-3 pl-4 md:pl-8 pr-1">
          {rightActions.map((item) => {
            if (item.type === 'icon') {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  aria-label={item.ariaLabel}
                  className={`hidden md:flex items-center justify-center w-[38px] h-[38px] rounded-full ${item.bg} cursor-pointer hover:scale-105 transition-transform`}
                >
                  {item.icon}
                </a>
              );
            }
            if (item.type === 'button') {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="bg-[#111] text-white py-2.5 px-5 md:px-6 rounded-full no-underline text-[13px] md:text-[14px] font-medium cursor-pointer ml-1 block hover:bg-[#333] transition-colors"
                >
                  {item.label}
                </a>
              );
            }
          })}
          
          {/* Mobile Menu Toggle - Client Interactive Component */}
          <MobileMenu links={centerLinks} actions={rightActions} />
        </div>
      </nav>
    </header>
  );
}
