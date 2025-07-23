import React, { ComponentPropsWithoutRef } from "react";

export interface ChildrenProp {
  children?: React.ReactNode;
}

export interface LinkSectionProps extends ChildrenProp {
  label: string | undefined;
  labelClass?: string | undefined;
  sectionClass?: ComponentPropsWithoutRef<"div">["className"];
}

export interface LinkListProps extends ChildrenProp {
  className?: ComponentPropsWithoutRef<"ul">["className"];
}

export interface LinkItemProps extends ChildrenProp {
  href: string;
}
