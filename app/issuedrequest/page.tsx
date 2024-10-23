"use client";
import IssuanceRequest from "@/components/IssuanceRequest";
import CouponSkeleton from "@/components/ui/CouponSkeleton";
import { getHeaders } from "@/lib/helperFunctions";
import { API_VERSION, BASE_URL, VENDOR_LOCAL_DATA } from "@/lib/routes";
import { IssuanceRequestType } from "@/types/IssuanceRequest.type";
import { Vendor } from "@/types/Vendor.type";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function IssueRequestPage() {
  const [loading, setLoading] = useState(true);

  const [vendor, setVendor] = useState<Vendor | undefined>(undefined);

  const navigate = useRouter();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [issueRequests, setIssueRequests] = useState<IssuanceRequestType[]>([]);

  async function getIssueRequests() {
    await axios
      .get(`${BASE_URL}${API_VERSION}/vendor/my-issue-requests`, {
        headers: getHeaders(vendor?.token ?? ""),
      })
      .then(({ data }) => {
        console.log(data);
        setIssueRequests(data.requests);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (vendor) {
      getIssueRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor]);

  return (
    <div className=" mt-5 md:mt-20 flex flex-col items-center">
      <h1 className="text-center text-2xl text-pink-600 font-bold ">
        Issued Requests
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center w-[95vw] pt-6 mx-auto pb-40">
        {loading ? (
          <>
            <div className="flex justify-center items-center px-5 ">
              <CouponSkeleton />
            </div>
            <div className="flex justify-center items-center px-5 ">
              <CouponSkeleton />
            </div>
            <div className="flex justify-center items-center px-5 ">
              <CouponSkeleton />
            </div>
          </>
        ) : issueRequests.length != 0 ? (
          issueRequests.map((request, idx) => {
            return (
              vendor?.token && (
                <IssuanceRequest
                  request={request}
                  key={idx}
                  userToken={vendor?.token}
                />
              )
            );
          })
        ) : (
          <div className="w-[90%] mx-auto flex justify-center">
            <span className="text-center">
              No issue requests found on your scan.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
