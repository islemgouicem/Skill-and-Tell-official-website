import React from "react"
import { Item, Header, Trigger, Content, Root } from "@radix-ui/react-accordion"
import { cn } from "@/lib/utils/utils"
import { ChevronDown } from "lucide-react"

// Root Accordion
const Accordion = Root

// Accordion Item
const AccordionItem = React.memo(
  React.forwardRef(({ className, ...props }, ref) => (
    <Item ref={ref} className={cn("", className)} {...props} />
  ))
)
AccordionItem.displayName = "AccordionItem"

// Accordion Trigger with default Chevron
const AccordionTrigger = React.memo(
  React.forwardRef(({ className, children, ...props }, ref) => (
    <Header className="flex">
      <Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-1 md:py-2 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 mr-2" />
      </Trigger>
    </Header>
  ))
)
AccordionTrigger.displayName = Trigger.displayName

// Accordion Content
const AccordionContent = React.memo(
  React.forwardRef(({ className, children, ...props }, ref) => (
    <Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </Content>
  ))
)
AccordionContent.displayName = Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
