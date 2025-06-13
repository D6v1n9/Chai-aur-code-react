import React, { useId } from 'react';


// This is a dropdown to select the options 

//## NOTE: Looping through the options should be done conditional if there is no value the 100% your app will crash as on map there will be no value to access
// {options?.map()}  or you can also use if-else
function Select({ 
    options,        // Options by default gives you array so loop through them 
    label, 
    className = '', 
    ref, 
    ...props 
}) {
  const id = useId();

  // ...props can be (e.g., name, onChange, disabled, required, aria-label) or custom event handlers,

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;