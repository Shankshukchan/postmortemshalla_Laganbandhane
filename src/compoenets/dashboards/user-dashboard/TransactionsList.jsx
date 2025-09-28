import React from "react";

const TransactionsList = ({ transactions }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
    <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#D4AF37]/60 scrollbar-track-[#FFF8F0] pr-2">
      <ul>
        {transactions.map((txn) => (
          <li key={txn.id} className="flex justify-between py-2 border-b last:border-b-0">
            <span>{txn.type}</span>
            <span className="text-gray-500">{txn.date}</span>
            <span className={txn.type === "Credit" ? "text-green-600" : "text-red-600"}>
              {txn.type === "Credit" ? "+" : "-"}₹{txn.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default TransactionsList;
