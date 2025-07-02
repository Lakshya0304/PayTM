"use client"
import React, { useEffect, useState } from "react";
import { getTransactions } from "../../lib/actions/getTransactions"
import TransactionTable from "../../../components/TransactionTable";

export default function() {
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
      const fetchTransactions = async () => {
        const data = await getTransactions();
        setTransactions(data);
      };

      fetchTransactions();
    }, []);

    return (
      <div className="max-w-4xl mx-auto mt-10">
        <TransactionTable transactions={transactions} />
      </div>
    );
}

