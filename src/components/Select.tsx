import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

interface SelectProps {
  children?: React.ReactNode;
  value?: any;
  className?: string;
}

export default function Select ({
  children,
  value,
  className,
}: SelectProps) {
  const selectRef = useRef<null | HTMLDivElement>(null);
  const displayRef = useRef<null | HTMLDivElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [displayHeight, setDisplayHeight] = useState<number>(0);
  const [selectedItemDisplay, setSelectedItemDisplay] = useState<any>(null);

  // 초기 선택값 설정
  useEffect(() => {
    setSelectedItemDisplay(Array.isArray(children)
    ? children.find(item => item.props.value === value).props.children
    : value);
  }, [children, value]);

  // 초기 디스플레이 높이값 구하기
  useEffect(() => {
    displayRef.current && setDisplayHeight(displayRef.current.offsetHeight);
  }, []);

  // 셀렉트 박스 외부 클릭 시 닫기
  const handleCloseSelect = useCallback((e: any) => {
    if (isOpen && selectRef.current && !selectRef.current.contains(e.target)) setOpen(false);
  }, [isOpen]);
  useEffect(() => {
    document.addEventListener("click", handleCloseSelect);
    return () => document.removeEventListener("click", handleCloseSelect);
  }, [handleCloseSelect]);
  
  // 메뉴 열기
  const handleClickDisplay = () => {
    setOpen(prev => !prev);
    displayRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 선택시 디스플레이 값 변경
  useEffect(() => {
    setSelectedItemDisplay(Array.isArray(children)
    ? children.find(item => item.props.value === value).props.children
    : value);
  }, [children, value]);

  return (
    <StyledSelect 
      ref={selectRef}
      isOpen={isOpen} 
      displayHeight={displayHeight}
    >
      <div 
        ref={displayRef} 
        className={`select-display${className ? ` ${className}` : ""}`}
        onClick={handleClickDisplay}
      >
        <div className="select-display-text">{selectedItemDisplay}</div>
        <div className="icon-dropdown"></div>
      </div>
      <ul className="select-menu">{children}</ul>
    </StyledSelect>
  )
}

type StyledSelectProps = {
  isOpen: boolean;
  displayHeight: number;
}

const StyledSelect = styled.div<StyledSelectProps>`
  width: 100%;
  position: relative;
  .select-display {
    padding: 15px 16px;
    border: 1px solid black;
    border-radius: 8px;
    position: relative;
    cursor: pointer;
    .icon-dropdown {
      position: absolute;
      right: 12px;
      top: 22px;
      border-top: 7px solid black;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid transparent;
      ${props => props.isOpen && css`
        transform: rotate(180deg) translateY(7px);
      `}
    }
    &:hover {
      border: 1px solid skyblue;
    }
    ${props => props.isOpen && css`
      border: 1px solid skyblue;
    `}
  }
  .select-menu {
    width: 100%;
    position: absolute;
    left: 0; 
    ${props => props.displayHeight && css`
      top: ${props.displayHeight + 28}px
    `};
    margin: 0;
    z-index: 12;
    padding-inline-start: 0;
    padding: 8px 0;
    border: 1px solid #FFF;
    filter: drop-shadow(5px 5px 10px #eee);
    border-radius: 8px;
    background-color: #FFF;
    transform: scale(1, 0) translateY(-8px);
    transition: .3s;
    transform-origin: top center;
    ${props => props.isOpen && css`
      transform: scale(1, 1);
    `}
  }
`;
