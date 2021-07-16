import React, { ReactElement } from "react";
import Button from "./Button";
import InputField from "./InputField";

interface Props {}

export default function Transfer({}: Props): ReactElement {
  const handleSend = () => {
    console.log("Sending transaction");
  };
  return (
    <div>
      <h2>Transfer Fund</h2>
      <div className="input-field">
        <InputField placeholder="reciever address" onChange={() => {}} />
      </div>
      <div className="input-field">
        <InputField placeholder="amount" type="number" onChange={() => {}} />
      </div>

      <Button onClick={handleSend}> Send</Button>
    </div>
  );
}
