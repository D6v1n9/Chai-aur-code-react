import React, { useId } from "react";

function Input({
  label, // For username or password, For what is that input for 
  type = "text",    // Password type or anything
  className = "",
  ref, // pull in the ref
  ...props // everything else
}) {
  const id = useId();

  //htmlFor={id} binds the label to the input with id={id}.  Not so neccesary you can remove it also

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        {...props}
        className={`
          px-3 py-2 rounded-lg bg-white text-black 
          outline-none focus:bg-gray-50 duration-200 
          border border-gray-200 w-full ${className}
        `}
      />
    </div>
  );
}

export default Input;
