import React from "react";

const PurchasesList = ({ purchases }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Latest Purchases</h3>
  <div className="max-h-96 overflow-y-scroll scrollbar scrollbar-thumb-[#D4AF37]/80 scrollbar-track-[#FFF8F0] pr-2">
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id} className="flex justify-between py-2 border-b last:border-b-0">
            <span>{purchase.item}</span>
            <span className="text-gray-500">{purchase.date}</span>
            <span className="font-semibold">₹{purchase.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default PurchasesList;
