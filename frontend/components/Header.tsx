// Copyright 2024 the JSR authors. All rights reserved. MIT license.

import { FullUser } from "../utils/api_types.ts";
import { PackageSearch } from "../islands/PackageSearch.tsx";
import { UserMenu } from "../islands/UserMenu.tsx";
import { Logo } from "./Logo.tsx";
import { GitHub } from "./icons/GitHub.tsx";

export function Header({ user, url }: {
  user: FullUser | null;
  url: URL;
}) {
  const redirectUrl = `${url.pathname}${url.search}${url.hash}`;
  const loginUrl = `/login?redirect=${encodeURIComponent(redirectUrl)}`;
  const logoutUrl = `/logout?redirect=${encodeURIComponent(redirectUrl)}`;

  const apiKey = Deno.env.get("ORAMA_PUBLIC_API_KEY");
  const indexId = Deno.env.get("ORAMA_PUBLIC_INDEX_ID");

  const isHomepage = url.pathname === "/";

  return (
    <div
      class={`section-x-inset-xl w-full py-4 sm:h-[72px] ${
        isHomepage
          ? "absolute z-50 top-0 left-0 right-0 bg-transparent pointer-events-none"
          : ""
      }`}
    >
      <div class="flex justify-between items-center text-base md:text-lg flex-wrap gap-4 lg:gap-8 h-full">
        {isHomepage ? <div></div> : (
          <a
            href="/"
            class="group outline-none focus-visible:ring-2 ring-cyan-700 will-change-transform"
          >
            <span className="sr-only">JSR home</span>
            <Logo class="h-[28px] flex-none group-hover:animate-rotate-180 transition-transform duration-[360ms] ease-[cubic-bezier(0.67,-0.33,0.28,1.28)]" />
          </a>
        )}
        <div class="hidden sm:block grow-1 flex-1">
          {!isHomepage && (
            <PackageSearch
              query={(url.pathname === "/packages"
                ? url.searchParams.get("search")
                : undefined) ?? undefined}
              apiKey={apiKey}
              indexId={indexId}
            />
          )}
        </div>
        <div class="flex gap-2 sm:gap-4 items-center pointer-events-auto">
          <a
            href="/packages"
            class="link-header"
          >
            Browse packages
          </a>
          <span class="text-gray-200 select-none">|</span>
          <a
            href="/docs"
            class="link-header"
          >
            Docs
          </a>
          <span class="text-gray-200 select-none">|</span>
          {user
            ? <UserMenu user={user} logoutUrl={logoutUrl} />
            : (
              <a href={loginUrl} class="link flex items-center gap-2">
                <GitHub class="h-5 w-5 flex-none" />
                Sign in
              </a>
            )}
        </div>
      </div>
      <div class="mt-4 sm:hidden">
        {!isHomepage && (
          <PackageSearch
            query={url.searchParams.get("search") ?? undefined}
            apiKey={apiKey}
            indexId={indexId}
          />
        )}
      </div>
    </div>
  );
}
