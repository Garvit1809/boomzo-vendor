"use client";
import React, { useEffect, useState } from "react";
import Coupon from "@/components/ui/Coupon";
import CouponSkeleton from "@/components/ui/CouponSkeleton";
import { CircleFadingArrowUp, Ticket } from "lucide-react";
import axios from "axios";
import { API_VERSION, BASE_URL, VENDOR_LOCAL_DATA } from "@/lib/routes";
import { Vendor } from "@/types/Vendor.type";
import { getHeaders } from "@/lib/helperFunctions";
import { useRouter } from "next/navigation";
import { CouponType } from "@/types/Coupon.type";

interface CouponStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const Home: React.FC = () => {
  const navigate = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  const [vendor, setVendor] = useState<Vendor | undefined>(undefined);

  useEffect(() => {
    const vendor_data = localStorage.getItem(VENDOR_LOCAL_DATA);
    if (!vendor_data) {
      navigate.push("/login");
    }
  }, []);

  const checkVendor = () => {
    const storedVendor = localStorage.getItem(VENDOR_LOCAL_DATA); // 'user' can be any key you store vendor data with

    if (storedVendor) {
      try {
        const parsedVendor: Vendor = JSON.parse(storedVendor);
        setVendor(parsedVendor);
      } catch (error) {
        console.error("Error parsing vendor data from local storage:", error);
        setVendor(undefined);
        navigate.push("/login");
      }
    } else {
      setVendor(undefined);
    }

    setLoading(false); // Set loading to false after checking local storage
  };

  useEffect(() => {
    checkVendor();
  }, []);

  const [vendorCoupons, setVendorCoupons] = useState<CouponType[]>([]);

  async function getVendorCoupons() {
    if (vendor) {
      axios
        .get(`${BASE_URL}${API_VERSION}/vendor/my-coupons`, {
          headers: getHeaders(vendor.token),
        })
        .then(({ data }) => {
          console.log(data);
          setVendorCoupons(data.coupons);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (vendor) {
      getVendorCoupons();
    }
  }, [vendor]);

  return (
    <div className="mt-5 md:mt-20 flex flex-col items-center">
      <h1 className="text-center text-2xl text-pink-600 font-bold">
        My Coupons
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-[95vw] pt-6 mx-auto pb-40">
        {vendorCoupons.map((coupon, idx) => {
          return <CouponCard data={coupon} key={idx} />;
        })}

        {loading &&
          Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                onClick={() => setLoading(false)}
                className="flex justify-center items-center px-5"
              >
                <CouponSkeleton />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;

interface CouponStatProps {
  icon: React.ReactNode; // Type for the icon (can be any JSX element)
  label: string; // Label for the stat (a string)
  statValue: string | number; // Value for the stat (can be a string or a number)
}

const CouponStat: React.FC<CouponStatProps> = ({ icon, label, statValue }) => (
  <div className="flex justify-center items-center gap-x-2">
    <span className="text-pink-600 p-2 rounded-full bg-pink-600/20">
      {icon}
    </span>
    <div>
      <h1 className="text-pink-800 text-xs font-semibold">{label}</h1>
      <h1 className="text-pink-800 font-bold">{statValue}</h1>
    </div>
  </div>
);

const CouponCard: React.FC<{ data: CouponType }> = ({ data }) => (
  <div className="flex flex-col border-2 border-pink-600 border-dashed rounded-2xl pt-2 pb-5 px-2">
    <Coupon
      coupon={data}
      // bgColor={data.bgColor}
      className="hover:filter hover:brightness-105 hover:transition hover:scale-95"
    />
    <div className="info grid grid-cols-2 my-2  place-items-start px-2 gap-y-2 gap-x-1">
      <CouponStat
        icon={<CircleFadingArrowUp size={24} />}
        label="Total Clicks"
        statValue={data.clicks}
        value=""
      />
      <CouponStat
        icon={<Ticket size={24} />}
        label="Total Impressions"
        statValue={data.impressions}
        value=""
      />
      {/* <CouponStat
        icon={<TicketCheck size={24} />}
        label="Coupons Issued"
        value="300+"
      />
      <CouponStat
        icon={<TicketCheck size={24} />}
        label="Coupons Redeemed"
        value="200+"
      /> */}
    </div>
  </div>
);
