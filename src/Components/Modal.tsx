import { FunctionComponent, useState, Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { ModalProps } from './Constants';

export const Modal: FunctionComponent<ModalProps> = (props) => {
  const { open } = props;

  if (open) {
    const html = document.querySelector('html');

    if (html !== null) {
      html.classList.add('locked');
    }
  }

  const shouldUnlockScroll = () => {
    const modals = document.querySelectorAll('.Modal');
    const html = document.querySelector('html');

    if (modals.length === 1 && html !== null) {
      html.classList.remove('locked');
    }
  };

  const backDropVariants = {
    exit: { opacity: 0 },
    open: { opacity: 1 },
    initial: { opacity: 0 },
  };

  const modalVariants = {
    exit: { scale: 0 },
    open: { scale: '100%', transition: { type: 'spring' } },
    initial: { scale: 0, transition: { type: 'spring', velocity: 2 } },
  };

  // @ts-ignore
  const domNode: Element = document.getElementById('modalRoot');

  return ReactDOM.createPortal(
    <AnimatePresence onExitComplete={shouldUnlockScroll}>
      {open && (
        <>
          <div className="Modal">
            <Centerer>
              <ModalDiv variants={modalVariants} initial="initial" exit="exit" animate="open" key="modal" className="Modal">{props.children}</ModalDiv>
            </Centerer>
          </div>
          <Backdrop onMouseDown={props.close} variants={backDropVariants} initial="initial" exit="exit" animate="open" key="backdrop" />
        </>
      )}
    </AnimatePresence>,
    domNode,
  );
};

const Centerer = styled.div`
  position: absolute;
  z-index: 2137;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ModalDiv = styled(motion.div)`
  font-family: Raleway, serif;
  font-style: normal;
  font-weight: bold;
  color: white;
  font-size: 15px;
  text-align: center;
`;

const Backdrop = styled(motion.div)`
  position: absolute;
  z-index: 2136;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
`;
