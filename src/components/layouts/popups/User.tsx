import React from "react";
import { useUser } from "@hooks";
import { UserProps } from "@types";

export const User: React.FC<UserProps> = ({ }) => {
  let {  } = useUser();

  return (
    <div className="user">

    </div>
  );
};