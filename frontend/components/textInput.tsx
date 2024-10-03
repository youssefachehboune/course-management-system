import React from 'react';

/**
 * Reusable text input component
 * @param {Object} props - Component props
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change event handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.type - Input type (text, password, etc.)
 * @param {string | null} props.error - Error message for validation
 * @param {boolean} props.disabled - Flag to disable the input
 * @returns {JSX.Element} - Rendered input component
 */
const TextInput: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  type: string;
  error: string | null;
  disabled: boolean;
  large?: boolean;
}> = ({ value, onChange, placeholder, type, error, disabled , large}) => {
  return (
    <div className="w-full relative group text-[13px] text-black font-normal tracking-[4%]">
      {large ? 
      <textarea
      value={value}
      id={placeholder}
      onChange={onChange}
      className={`w-full rounded-[4px] border ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-0 outline-offset-0
      ${large ? 'h-40 text-start items-start flex' : 'h-10'}    
      ${error ? 'border-red-500' : 'border-[#58575650] focus:border-[#585756]'} p-3 px-3`}
      disabled={disabled}
    />  
      :
      
      <input
      type={type}
      value={value}
      onChange={onChange}
      id={placeholder}
      className={`w-full rounded-[4px] border ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-0 outline-offset-0
      ${large ? 'h-40 text-start items-start flex' : 'h-10'}    
      ${error ? 'border-red-500' : 'border-[#58575650] focus:border-[#585756]'} p-3 px-3`}
      disabled={disabled}
      />
    }
      <label htmlFor={placeholder} className={`transform transition-all absolute  text-[12px] top-0 left-2 flex items-center px-2
      text-[#58575650]
        group-focus-within:bg-white
        group-focus-within:text-[10px] 
        group-focus-within:font-medium
        peer-valid:tracking-[2%]
           group-focus-within:h-max
           group-focus-within:-translate-y-1/2

           ${value ? 'text-[10px] font-medium tracking-[2%] -translate-y-1/2 bg-white h-max' : 'h-10 '}
           ${error && !value && 'h-[80%]'}
           `}
           >{placeholder}</label>

      {error && <p className="text-red-500 text-[10px]">{error}</p>}
    </div>
  );
};

export default TextInput;