"use client";

import { createContext, use } from "react";

export interface AvatarGroupContextProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const AvatarGroupContext = createContext<AvatarGroupContextProps | undefined>(undefined);

/**
 * Read the current `<AvatarGroup />` context. Returns `undefined` when used outside a group.
 */
function useAvatarGroupContext(): AvatarGroupContextProps | undefined {
  return use(AvatarGroupContext);
}

export { AvatarGroupContext, useAvatarGroupContext };
