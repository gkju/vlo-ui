import { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ButtonProps, InputSize } from '../Constants';
import { RippleAble } from './RippleAble';
import zIndex from "@mui/material/styles/zIndex";
import { motion } from 'framer-motion';

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = (props) => (
    <RippleAble className={props?.className} style={Object.assign({zIndex: 2, borderRadius: props.radius ? `${props.radius}px` : '20px' }, props?.wrapperStyle)}>
        <StyledButton {...props} style={{ zIndex: 1}} type={props?.type}>
            <TextWrapper>
                {props.children}
            </TextWrapper>
        </StyledButton>
    </RippleAble>
);

const GetWidth = (props: ButtonProps) => {
    return props?.size === InputSize.Big ? 600 : props?.size === InputSize.Medium ? 435 : 200;
};

const GetHeight = (props: ButtonProps) => {
    return props?.squared ? (GetWidth(props) + "px") : "";
};

const StyledButton = styled.button<ButtonProps>`
  outline: none;
  border: none;
  border-radius: ${(props) => (props.radius ? `${props.radius}px` : '20px')};
  background: ${(props) => (props.primaryColor ? props.primaryColor : '#6D5DD3')};
  color: ${(props) => (props.secondaryColor ? props.secondaryColor : '#FFFFFF')};
  width:  ${(props) => GetWidth(props)}px;
  height: ${(props) => GetHeight(props)}px;
  font-family: Raleway, serif;
  font-style: normal;
  font-weight: bold;
  cursor: pointer;
  font-size: ${(props) => (props?.size === InputSize.Big ? 40 : props?.size === InputSize.Medium ? 36 : 20)}px;
  padding: 30px 15px;
  position: relative;
  overflow: hidden;
  transition: all 200ms ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    outline: none;
    border: none;
    filter: brightness(90%);
  }

  &:active {
    outline: none;
    border: none;
  }
`;

const TextWrapper = styled.span`
  z-index: 3;
`;
