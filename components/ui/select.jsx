import { Root, Trigger, Value, Icon, Portal, Content, ScrollUpButton, Item, Viewport, ScrollDownButton, ItemIndicator, ItemText } from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
export default function CosmicSelect({ placeholder, options, value, onValueChange, required, }) {
    return (<Root value={value} onValueChange={onValueChange} required={required}>
            {/* Trigger styled like .input-style */}
            <Trigger className="input-style flex items-center justify-between gap-2 text-neutral-300 text-sm" aria-label={placeholder}>
                <Value placeholder={placeholder} className="data-[placeholder]:text-neutral-400 text-start text-sm"/>
                <Icon>
                    <img src="/icons/chevron.svg" className="h-4 w-4" alt="chevron"/>
                </Icon>
            </Trigger>

            {/* Dropdown content keeps previous nice styling */}
            <Portal>
                <Content className="z-50 bg-Main-700 border border-Main-500 rounded-md shadow-lg">
                    <ScrollUpButton className="flex items-center justify-center py-1">
                        <ChevronUp className="h-4 w-4 text-space-text"/>
                    </ScrollUpButton>

                    <Viewport className="p-1">
                        {options.map((option) => (<Item key={option} value={option} className="pointer relative flex items-center px-4 py-2 rounded-md text-neutral-200
                                        cursor-pointer hover:bg-space-accent hover:text-white focus:bg-space-accent focus:text-white outline-none">
                                <ItemText>{option}</ItemText>
                                <ItemIndicator className="absolute right-3">
                                    <Check className="h-4 w-4"/>
                                </ItemIndicator>
                            </Item>))}
                    </Viewport>

                    <ScrollDownButton className="flex items-center justify-center py-1">
                        <ChevronDown className="h-4 w-4 text-space-text"/>
                    </ScrollDownButton>
                </Content>
            </Portal>
        </Root>);
}
