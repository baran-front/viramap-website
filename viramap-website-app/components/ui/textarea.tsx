import * as React from "react";

import { cn } from "@/components/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-foreground/50 selection:bg-primary selection:text-foreground border-foreground/10 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-xs border bg-transparent px-3 py-2 text-base shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:ring-primary/20 hover:border-primary focus-visible:ring-primary/20 focus-visible:border-primary ring-[3px] ring-transparent focus-visible:placeholder:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
