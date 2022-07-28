import { EditButtonProps } from '../Constants';
import { FunctionComponent } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../../theme';
import { RippleAble } from './RippleAble';

export const EditButton: FunctionComponent<EditButtonProps> = (props) => {

  return (
    <div style={...(props?.style ?? {})}>
      <StyledRipple whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
        <EditButtonStyled {...props}>
          {props.text ?? "Edytuj"}
        </EditButtonStyled>
      </StyledRipple>
    </div>
  )
};

const StyledRipple = styled(RippleAble)`
  border-radius: 15px;
`;

const EditButtonStyled = styled(motion.button)`
  background: ${theme.primaryShade};
  color: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 15px 25px;
  text-transform: uppercase;
  font-family: Raleway, serif;
  font-weight: 700;
  font-size: 20px;
  transition: outline 0.2s ease-in-out;
  border: none;
  outline: none;
  
  &:hover {
    border: none;
    outline: none;
  }

  &:active {
    border: none;
    outline: 15px solid rgba(255, 255, 255, 0.3);
  }
`;
