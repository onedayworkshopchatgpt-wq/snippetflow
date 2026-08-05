import * as React from "react";

import { cn } from "@/lib/utils";

function ContentContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="content-container"
      className={cn(
        "mx-auto w-full max-w-5xl px-6 py-6",
        className,
      )}
      {...props}
    />
  );
}

export { ContentContainer };
