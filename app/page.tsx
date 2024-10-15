"use client";
import React, { useState } from "react";
import Coupon from "@/components/ui/Coupon";
import CouponSkeleton from "@/components/ui/CouponSkeleton";
import { CircleFadingArrowUp, Ticket, TicketCheck } from "lucide-react";

interface CouponData {
  brandName: string;
  imgUrl: string;
  couponCount: string;
  offerText: string;
  validity: string;
  bgColor: string;
}

const couponData: CouponData = {
  brandName: "The Raymond Shop",
  imgUrl: "/logo.jpg",
  couponCount: "001",
  offerText: "10% Off",
  validity: "Valid till 31st Dec",
  bgColor: "#FEE2E2",
};

interface CouponStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}


const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="mt-5 md:mt-20 flex flex-col items-center">
      <h1 className="text-center text-2xl text-pink-600 font-bold">My Coupons</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-[95vw] pt-6 mx-auto pb-40">
        <CouponCard data={couponData} />
        <CouponCard data={couponData} />
      
        {loading &&
          Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index} onClick={() => setLoading(false)} className="flex justify-center items-center px-5">
                <CouponSkeleton />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;


const CouponStat: React.FC<CouponStatProps> = ({ icon, label, value }) => (
  <div className="flex justify-center items-center gap-x-2">
    <span className="text-pink-600 p-2 rounded-full bg-pink-600/20">{icon}</span>
    <div>
      <h1 className="text-pink-800 text-sm font-semibold">{label}</h1>
      <h1 className="text-pink-800 font-bold">{value}</h1>
    </div>
  </div>
);

const CouponCard: React.FC<{ data: CouponData }> = ({ data }) => (
  <div className="flex flex-col border-2 border-pink-600 border-dashed rounded-2xl py-5 px-2">
    <Coupon
      brandName={data.brandName}
      ImgUrl={data.imgUrl}
      CouponCount={data.couponCount}
      offerText={data.offerText}
      Validity={data.validity}
      bgColor={data.bgColor}
      className="hover:filter hover:brightness-105 hover:transition hover:scale-95"
    />
    <div className="info grid grid-cols-2 my-2  place-items-start px-2 gap-y-2 gap-x-1">
      <CouponStat icon={<CircleFadingArrowUp size={24} />} label="Total Clicks Rate" value="1000+" />
      <CouponStat icon={<Ticket size={24} />} label="Available Coupons" value="500+" />
      <CouponStat icon={<TicketCheck size={24} />} label="Used Coupons" value="300+" />
      <CouponStat icon={<TicketCheck size={24} />} label="Remaining Coupons" value="200+" />
    </div>
  </div>
);
