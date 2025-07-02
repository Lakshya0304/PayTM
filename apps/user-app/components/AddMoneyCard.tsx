"use client"
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card'
import { Select } from '@repo/ui/select';
import { TextInput } from '@repo/ui/textinput'
import React, { useState } from 'react'
import createOnRampTransaction from '../app/lib/actions/createOnRampTransaction';

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export default function AddMoney() {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount , setAmount] = useState(0);
  return (
    <div>
      <Card title="Add Money">
        <TextInput
          label="Amount"
          placeholder=" ₹"
          onChange={(v) => setAmount(Number(v))}
        ></TextInput>
      <div className="py-4 text-left">Bank</div>
      <Select
        onSelect={(value) => {
            setRedirectUrl(
                SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
                SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
        }}
        options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
        }))}
        />

      <div className="pt-4 flex justify-center">
        <Button
          onClick={async () => await createOnRampTransaction(provider, amount)}
          >
          Add to Wallet
        </Button>
      </div>
    </Card>
    </div>
  );
}
