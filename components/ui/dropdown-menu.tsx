"use client"

import * as React from 'react';

import {
  DropdownMenu as RadixDropdownMenu,
} from '@radix-ui/react-dropdown-menu';

export const DropdownMenu = ({ children }) => {
  return <RadixDropdownMenu>{children}</RadixDropdownMenu>;
};

export const DropdownMenuContent = ({ children }) => {
  return <RadixDropdownMenu.Content>{children}</RadixDropdownMenu.Content>;
};

export const DropdownMenuItem = ({ children, onSelect }) => {
  return (
    <RadixDropdownMenu.Item onSelect={onSelect}>
      {children}
    </RadixDropdownMenu.Item>
  );
};
