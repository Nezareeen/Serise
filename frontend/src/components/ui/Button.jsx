import React from 'react';

export default function Button({children, ...props}){
  return (
    <button {...props} className="px-3 py-1 rounded bg-blue-600 text-white">
      {children}
    </button>
  );
}
