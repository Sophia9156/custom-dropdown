import React from "react";
import styled from "styled-components";

interface MenuItemProps {
  children?: string | React.ReactNode;
  value: any;
  onSelect?: (value: any) => void;
}

export default function MenuItem ({
  children,
  value,
  onSelect,
}: MenuItemProps) {
  return (
    <StyledMenuItem onClick={() => onSelect?.(value)}>
      {children}
    </StyledMenuItem>
  )
};

const StyledMenuItem = styled.li`
  list-style: none;
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: skyblue;
  }
`;
