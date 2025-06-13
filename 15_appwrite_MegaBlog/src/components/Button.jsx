import React from "react";

function Button({
  children, // this have the text
  type = "button", // This can be like submit, button is just the default value if nothing is passed
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button className={`px-4 py-2 ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
