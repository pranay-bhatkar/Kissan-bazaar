import React from "react";
import { useSelector } from "react-redux";

const ReferralInfo = () => {
  const user = useSelector((state) => state.user);
  console.log("User from redux:", user); // 🔍 check this

  const referralCode = user?.referralCode;
  if (!referralCode)
    return <p className="text-red-500">No referral code found</p>;

  return (
    <div className="bg-green-50 border border-green-300 p-4 rounded shadow-sm mt-2">
      <h3 className="font-bold text-green-800 mb-1">🎁 Your Referral Code</h3>
      <div className="flex justify-between items-center">
        <span className="font-mono text-green-700">{referralCode}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(referralCode);
            alert("Referral Code Copied!");
          }}
          className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ReferralInfo;
