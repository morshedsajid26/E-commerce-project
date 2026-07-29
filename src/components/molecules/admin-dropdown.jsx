"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminDropdown = ({
  label = "",
  placeholder = "",
  options = [],
  onSelect,
  className,
  inputClass,
  optionClass,
  labelClass,
  icon,
  value,
  ...props
}) => {
  const [selected, setSelected] = useState(value || "");
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setSelected(value || "");
  }
  
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (val) => {
    setSelected(val);
    setShow(false);
    if (onSelect) onSelect(val);
  };

  const getDisplayValue = () => {
    if (!selected) return "";
    const option = options.find(opt => (typeof opt === 'object' ? opt.value : opt) === selected);
    if (option) {
      return typeof option === 'object' ? option.label : option;
    }
    return selected;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={cn("flex flex-col gap-1.5 relative", className)}
      {...props}
    >
      {label && (
        <label className={cn("text-[10px] font-bold uppercase tracking-wider text-muted-foreground", labelClass)}>
          {label}
        </label>
      )}

      <div className="relative">
        <div onClick={() => setShow(!show)} className="relative">
          <input
            readOnly
            value={getDisplayValue()}
            className={cn(
              "w-full bg-background border border-border outline-none px-3 h-9 text-xs font-semibold text-foreground rounded-lg placeholder:text-muted-foreground cursor-pointer transition-all focus:border-primary focus:ring-1 focus:ring-primary shadow-sm",
              inputClass
            )}
            placeholder={placeholder}
          />

          <div className={cn("absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground transition-transform duration-200", show ? 'rotate-180' : '', icon)}>
            <ChevronDown size={16} />
          </div>
        </div>

        <div
          className={cn(
            "absolute left-0 top-full mt-1 w-full bg-background border border-border rounded-lg shadow-xl text-foreground z-50 transition-all duration-200 overflow-hidden",
            show ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible",
            optionClass
          )}
        >
          <div className="max-h-60 overflow-y-auto">
            {options.map((item, index) => {
              const itemLabel = typeof item === 'object' ? item.label : item;
              const itemValue = typeof item === 'object' ? item.value : item;
              return (
                <div
                  key={index}
                  onClick={() => handleSelect(itemValue)}
                  className={cn(
                    "py-2.5 px-4 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors text-xs font-medium",
                    selected === itemValue ? 'bg-primary/10 text-primary font-bold' : ''
                  )}
                >
                  {itemLabel}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
