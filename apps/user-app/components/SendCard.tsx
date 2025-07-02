"use client"

import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card'
import { Center } from '@repo/ui/centre'
import { TextInput } from '@repo/ui/textinput'
import React, { useState } from 'react'
import p2pTransfer from '../app/lib/actions/p2pTransfer';

export default function SendCard() {
    const [number , setNumber ] = useState("") ;
    const [amount , setAmount] = useState("");
  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <TextInput
            label="Pnone number"
            placeholder="+91 XXXXXXXXXX"
            onChange={(value) => setNumber(value)}
          ></TextInput>
          <TextInput
            label="Amount"
            placeholder="₹"
            onChange={(value) => setAmount(value)}
          ></TextInput>

          <div className="pt-4 flex justify-center">
            <Button
              onClick={async () => {
                await p2pTransfer(number, Number(amount) );
              }}
            >
              Send
            </Button>
          </div>
        </Card>
      </Center>
    </div>
  );
}
