import React from "react"
import { Item, Header, Trigger, Content, Root } from "@radix-ui/react-accordion"
import { cn } from "../../lib/utils/utils" // Adjusted import path

const Accordion = Root

const AccordionItem = React.memo(
  React.forwardRef(({ className, ...props }, ref) => (
    <Item ref={ref} className={cn("", className)} {...props} />
  ))
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.memo(
  React.forwardRef(({ className, children, ...props }, ref) => (
    <Header className="flex">
      <Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-1 md:py-2 font-medium transition-all hover:text-Main-300 [&[data-state=open]>img]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <img src="/icons/chevron.svg" className="h-4 w-4 shrink-0 transition-transform duration-200 mr-2" alt="" aria-hidden="true" />
      </Trigger>
    </Header>
  ))
)
AccordionTrigger.displayName = Trigger.displayName

const AccordionContent = React.memo(
  React.forwardRef(({ className, children, ...props }, ref) => (
    <Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className,
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </Content>
  ))
)
AccordionContent.displayName = Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
