"use client";
import React from 'react';
import { Ticket, LucideIcon, LifeBuoy, TrendingDown, Gift } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  currentPath: string;
  badgeCount?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href, currentPath, badgeCount }) => {
  const router = useRouter();
  const isActive = currentPath === href;

  return (
    <div
      onClick={() => router.push(href)}
      className={`relative flex flex-col cursor-pointer hover:bg-pink-600/20 pb-2 items-center p-1 px-3 gap-1 rounded-2xl ${isActive ? 'bg-pink-600/20' : 'bg-transparent'}`}
    >
      {badgeCount && badgeCount > 0 && (
        <span className="absolute top-1 right-4 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badgeCount}
        </span>
      )}
      <Icon className="w-6 h-6 text-pink-600" strokeWidth={isActive ? 3 : 2} />
      <span className={`text-sm text-pink-600 leading-none text-center ${isActive ? 'font-extrabold' : 'font-semibold'}`}>{label}</span>
    </div>
  );
};

const NavigationBar: React.FC = () => {
  const currentPath = usePathname();
  if (currentPath === "/login") {
    return null;
  }
  return (
    <div className="fixed top-0 z-50 left-0 w-full border-b-2  bg-pink-400/25 bg-white  border-pink-600 rounded-b-2xl">
      <div className="flex justify-center gap-x-10 items-center py-2">
        <NavItem icon={Ticket} label="Coupons" href="/" currentPath={currentPath} />
        <NavItem icon={LifeBuoy} label="Support" href="/support" currentPath={currentPath} />
        <NavItem icon={TrendingDown} label="Issued Req" href="/issuedrequest" currentPath={currentPath} badgeCount={5} />
        <NavItem icon={Gift} label="Redeem Req" href="/redeemrequest" currentPath={currentPath} badgeCount={2} />
      </div>
    </div>
  );
};

export default NavigationBar;
