import { toast } from "@/hooks/use-toast";
import { formatDate, getHeaders, getTimeInIST } from "@/lib/helperFunctions";
import { API_VERSION, BASE_URL } from "@/lib/routes";
import { IssuanceRequestType } from "@/types/IssuanceRequest.type";
import axios from "axios";
import { CalendarDays, Clock3, Phone, User } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  request: IssuanceRequestType;
  userToken: string;
  isOnRedeemScreen?: boolean;
};

const IssuanceRequest = ({ request, userToken, isOnRedeemScreen }: Props) => {
  // issance accept request
  async function acceptIssuance() {
    await axios
      .post(
        `${BASE_URL}${API_VERSION}/vendor/accept-issuance/${request._id}`,
        {
          customerID: request.customerID._id,
          couponID: request.couponID,
        },
        {
          headers: getHeaders(userToken),
        }
      )
      .then(({ data }) => {
        console.log(data);
        toast({
          variant: "default",
          title: "Issue request accepted!",
        });
        // Adding a 1 second delay before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 1000ms = 1 second
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Error Occurred!",
        });
      });
  }

  // reject issuance request
  async function rejectIssuance() {
    await axios
      .post(
        `${BASE_URL}${API_VERSION}/vendor/reject-issuance/${request._id}`,
        {},
        {
          headers: getHeaders(userToken),
        }
      )
      .then(({ data }) => {
        console.log(data);
        toast({
          variant: "default",
          title: "Issue request rejected!",
        });
        // Adding a 1 second delay before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 1000ms = 1 second
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Error Occurred!",
        });
      });
  }

  // redemption accept request
  async function acceptRedemption() {
    await axios
      .post(
        `${BASE_URL}${API_VERSION}/vendor/accept-redemption/${request._id}`,
        {},
        {
          headers: getHeaders(userToken),
        }
      )
      .then(({ data }) => {
        console.log(data);
        toast({
          variant: "default",
          title: "Redeem request accepted!",
        });
        // Adding a 1 second delay before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 1000ms = 1 second
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Error Occurred!",
        });
      });
  }

  // reject redemption request
  async function rejectRedemption() {
    await axios
      .post(
        `${BASE_URL}${API_VERSION}/vendor/reject-redemption/${request._id}`,
        {},
        {
          headers: getHeaders(userToken),
        }
      )
      .then(({ data }) => {
        console.log(data);
        toast({
          variant: "default",
          title: "Redeem request rejected!",
        });
        // Adding a 1 second delay before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 1000ms = 1 second
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Error Occurred!",
        });
      });
  }

  return (
    <div className="w-full border-2 flex flex-col gap-y-2 px-4 py-4 border-black rounded-xl">
      <h1 className="text-start font-bold text-xl text-[#a2225a] ">
        Availed By
      </h1>
      <div className="flex border-0 border-red-600">
        <div className="flex flex-col gap-y-2 w-[60%] border-0 border-red-500 ">
          {/*list items */}
          <div className="flex flex-row items-center gap-x-2">
            <div className="flex gap-x-1">
              <span>
                <User size={18} />
              </span>
            </div>
            <span className="text-sm font-semibold">
              {request.customerID.name}
            </span>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <div className="flex gap-x-1">
              <span>
                <Phone size={18} />
              </span>
            </div>
            <span className="text-sm font-semibold">
              {request.customerID.phone}
            </span>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <div className="flex gap-x-1">
              <span>
                <CalendarDays size={18} />
              </span>
            </div>
            <span className="text-sm font-semibold">
              {formatDate(request.createdAt)}
            </span>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <div className="flex gap-x-1">
              <span>
                <Clock3 size={18} />
              </span>
            </div>
            <span className="text-sm font-semibold">
              {getTimeInIST(request.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center w-[40%]">
          <Image
            src={request.floaterID.img}
            alt="img"
            width={100}
            height={100}
            className="rounded-full w-[100px] h-[100px] object-contain border-2 border-black p-1"
          />
        </div>
      </div>
      {/* Buttons */}
      {!request.isAccepted && (
        <div className="action flex mt-2 gap-x-2">
          <button
            onClick={acceptIssuance}
            className=" w-fit p-2 bg-transparent border-2 font-bold text-green-600 flex justify-center rounded-2xl border-green-600"
          >
            Accept
          </button>
          <button
            onClick={rejectIssuance}
            className=" w-fit p-2 bg-transparent border-2 font-bold text-red-600 flex justify-center rounded-2xl border-red-600"
          >
            Reject
          </button>
        </div>
      )}
      {isOnRedeemScreen &&
        request.hasAskedRedemption &&
        !request.isRedeemed && (
          <div className="action flex mt-2 gap-x-2">
            <button
              onClick={acceptRedemption}
              className=" w-fit p-2 bg-transparent border-2 font-bold text-green-600 flex justify-center rounded-2xl border-green-600"
            >
              Accept Redeem
            </button>
            <button
              onClick={rejectRedemption}
              className=" w-fit p-2 bg-transparent border-2 font-bold text-red-600 flex justify-center rounded-2xl border-red-600"
            >
              Reject
            </button>
          </div>
        )}
    </div>
  );
};

export default IssuanceRequest;
