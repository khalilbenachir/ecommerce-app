"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useMemo } from "react";

const getRoutes = (id: string, pathName: string) => [
  {
    href: `/${id}`,
    label: "Overview",
    active: pathName === `/${id}`,
  },
  {
    href: `/${id}/billboards`,
    label: "Billboards",
    active: pathName === `/${id}/billboards`,
  },
  {
    href: `/${id}/settings`,
    label: "Settings",
    active: pathName === `/${id}/settings`,
  },
];

const MainNav = ({
  className,
  ...others
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = useMemo(
    () => getRoutes(params?.storeId as string, pathName),
    [params?.storeId, pathName]
  );

  return (
    <nav className={cn("flex justify-center items-center gap-3", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
