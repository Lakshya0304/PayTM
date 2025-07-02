import { Center } from "@repo/ui/centre";
import React from "react";

type Transaction = {
  type: "Credit" | "Debit";
  amount: number;
  timestamp: Date;
  counterpart: string;
};

type Props = {
  transactions: Transaction[];
};

export default function TransactionTable({ transactions }: Props) {

return (
  <div className="h-[75vh]">
    <Center>
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg border border-gray-200 -mt-25">
        <h2 className="text-3xl font-semibold text-[#6a51a6] mb-6 text-center">
          Transaction History
        </h2>

        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Counterpart</th>
                  <th className="px-6 py-3 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4">{transaction.type}</td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        transaction.type === "Credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ₹{transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{transaction.counterpart}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.timestamp).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Center>
  </div>
);

}
