import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import gurl from "../../lib/image-util"


export default function CosmicSelect({
    placeholder,
    options,
    value,
    onValueChange,
    required,
}) {
    return (
        <Select.Root value={value} onValueChange={onValueChange} required={required}>
            {/* Trigger styled like .input-style */}
            <Select.Trigger
                className="input-style flex items-center justify-between gap-2 text-neutral-300 text-sm"
                aria-label={placeholder}
            >
                <Select.Value placeholder={placeholder} className="data-[placeholder]:text-neutral-400 text-start text-sm"/>
                <Select.Icon>
                    <img src={gurl("icons/chevron.svg")} className="h-4 w-4" alt="chevron" />
                </Select.Icon>
            </Select.Trigger>

            {/* Dropdown content keeps previous nice styling */}
            <Select.Portal>
                <Select.Content className="z-50 bg-Main-700 border border-Main-500 rounded-md shadow-lg">
                    <Select.ScrollUpButton className="flex items-center justify-center py-1">
                        <ChevronUp className="h-4 w-4 text-space-text" />
                    </Select.ScrollUpButton>

                    <Select.Viewport className="p-1">
                        {options.map((option) => (
                            <Select.Item
                                key={option}
                                value={option}
                                className="pointer relative flex items-center px-4 py-2 rounded-md text-neutral-200
                                        cursor-pointer hover:bg-space-accent hover:text-white focus:bg-space-accent focus:text-white outline-none"
                            >
                                <Select.ItemText>{option}</Select.ItemText>
                                <Select.ItemIndicator className="absolute right-3">
                                    <Check className="h-4 w-4" />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>

                    <Select.ScrollDownButton className="flex items-center justify-center py-1">
                        <ChevronDown className="h-4 w-4 text-space-text" />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}
