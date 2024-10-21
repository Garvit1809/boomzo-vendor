"use client";
import React from "react";
import { Ticket, LucideIcon, LifeBuoy, TrendingDown, Gift } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface BarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  currentPath: string;
  badgeCount?: number;
}

const BarItem: React.FC<BarItemProps> = ({
  icon: Icon,
  label,
  href,
  currentPath,
  // badgeCount,
}) => {
  const router = useRouter();
  const isActive = currentPath === href;

  return (
    <div
      onClick={() => router.push(href)}
      className={`relative flex flex-col hover:bg-pink-600/20 pb-2 items-center p-1 px-3 gap-y-1 rounded-2xl`}
    >
      {/* {badgeCount && badgeCount > 0 && (
        <span className="absolute top-1 right-4 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badgeCount}
        </span>
      )} */}
      <div
        className={`w-14 h-8 rounded-full flex items-center justify-center ${
          isActive ? "bg-pink-600/20" : "bg-transparent"
        }`}
      >
        <Icon
          className={`w-6 h-6 text-pink-600`}
          strokeWidth={isActive ? 3 : 2}
        />
      </div>
      <span
        className={`text-xs text-pink-600 leading-none text-center ${
          isActive ? "font-extrabold" : "font-semibold"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

const AppBottomBar: React.FC = () => {
  const currentPath = usePathname();
  if (currentPath === "/login") {
    return null;
  }
  return (
    <div className="fixed bottom-0 left-0 w-full border-t-2 drop-shadow-xl bg-pink-400/25 bg-white shadow-pink-500 border-pink-600 rounded-t-2xl">
      <div className="flex justify-center gap-x-1 items-center py-2">
        <BarItem
          icon={Ticket}
          label="My Coupons"
          href="/"
          currentPath={currentPath}
        />
        <BarItem
          icon={LifeBuoy}
          label="Support"
          href="/support"
          currentPath={currentPath}
        />
        <BarItem
          icon={TrendingDown}
          label="Issues"
          href="/issuedrequest"
          currentPath={currentPath}
          badgeCount={5}
        />
        <BarItem
          icon={Gift}
          label="Redeems"
          href="/redeemrequest"
          currentPath={currentPath}
          badgeCount={3}
        />
      </div>
    </div>
  );
};

export default AppBottomBar;
