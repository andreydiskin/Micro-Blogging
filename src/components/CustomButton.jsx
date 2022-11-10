import React from "react";
import * as config from "../helpers/config";

/* customizing a button */
export const CustomButton = (props) => {
  return (
    <button
      className="customBtn"
      onClick={props.onClick}
      as="input"
      type="submit"
    >
      {config.btnText}
    </button>
  );
};
