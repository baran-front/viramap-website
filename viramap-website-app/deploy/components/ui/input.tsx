import * as React from "react";

import { cn } from "@/components/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-foreground/50 selection:bg-primary selection:text-foreground border-foreground/10 h-12 w-full min-w-0 rounded-xs border bg-transparent px-3 py-1 text-base shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:ring-primary/20 hover:border-primary focus-visible:ring-primary/20 focus-visible:border-primary ring-[3px] ring-transparent focus-visible:placeholder:text-foreground",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
