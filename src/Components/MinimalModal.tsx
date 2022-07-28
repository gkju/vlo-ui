import React, { FunctionComponent, useState, Fragment, FormEventHandler, FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { MinimalModalProps, ModalProps } from './Constants';
import { Centerer } from './Modal';
import { theme } from '../theme';
import { useKeyPressEvent } from 'react-use';
import { Handler } from 'react-use/lib/useKey';
import { useCancellables } from '../Utils/UseCancelTimeouts';

export const MinimalModal: FunctionComponent<MinimalModalProps> = (props) => {
  const { open } = props;
  const [value, setValue] = useState(props?.initialValue ?? '');

  if (open) {
    const html = document.querySelector('html');

    if (html !== null) {
      html.classList.add('locked');
    }
  }

  const shouldUnlockScroll = () => {
    const modals = document.querySelectorAll('.Modal');
    const html = document.querySelector('html');
    const [error, setError] = useState(false);

    if (modals.length === 1 && html !== null) {
      html.classList.remove('locked');
    }
  };

  const backDropVariants = {
    exit: { opacity: 0 },
    open: { opacity: 0.98 },
    initial: { opacity: 0 },
  };

  const modalVariants = {
    exit: { opacity: 0 ,
      background: "#252533",
      boxShadow: 'inset 0px 0px 0px #13131B, inset 0px 0px 0px #272735'},
    open: { opacity: '100%',
      background: "#1D1D28",
      translateY: '0vh',
      boxShadow: 'inset 5.71px 5.71px 25px #121219, inset -5.71px -5.71px 25px #282837',
      transition: {boxShadow: {delay: 2, duration: 3}, background: {duration: 2}, translateY: {type: 'spring', stiffness: 100, damping: 15}}},
    initial: { opacity: 0 ,
      translateY: '-50vh',
      background: "#252533",
      boxShadow: 'inset 0px 0px 0px #13131B, inset 0px 0px 0px #272735'},
  };

  let domNode = document.getElementById('modalRoot');
  if(!domNode) {
    let div = document.createElement('div');
    div.setAttribute('id', 'modalRoot');
    domNode = div;
  }

  const [error, setError] = useState(false);
  const handleStates = useCancellables();
  const [translateX, setTranslateX] = useState(0);
  const handleSubmit: Handler = (e) => {
    let r = props.validator(value);
    setError(!r);
    if(r) {
      props.handler(value);
      reset();
      props.close();
    } else {
      const states: [Function, number][] = [
        [() => setTranslateX(-20), 50],
        [() => setTranslateX(40), 100],
        [() => setTranslateX(-60), 150],
        [() => setTranslateX(0), 200],
      ];

      handleStates(states);
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setValue(e.target?.value);
    if(e.target?.value.length > 3) {
      setError(!props.validator(value));
    } else {
      setError(false);
    }
  };

  const reset = () => {
    setValue('');
    setError(false);
  };

  useKeyPressEvent('Enter', handleSubmit);
  useKeyPressEvent('Escape', e => {e.preventDefault(); reset(); props.close();});

  return ReactDOM.createPortal(
    <AnimatePresence onExitComplete={shouldUnlockScroll}>
      {open && (
        <>
          <div className="Modal">
            <Centerer>
              <motion.div animate={{translateX}}>
                <MinimalModalDiv variants={modalVariants} initial="initial" exit="exit" animate="open" key="modal">
                  <StyledInput error={error} onChange={handleChange} value={value} type="text" placeholder="Enter your name" />
                </MinimalModalDiv>
              </motion.div>
            </Centerer>
          </div>
          <Backdrop onMouseDown={e => props.close()} variants={backDropVariants} initial="initial" exit="exit" animate="open" key="backdrop" />
        </>
      )}
    </AnimatePresence>,
    domNode,
  );
};

const MinimalModalDiv = styled(motion.div)`
  width: 600px;
  height: 90px;
  max-width: 80vw;
  max-height: 26vh;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-radius: 20px;
`;

const Backdrop = styled(motion.div)`
  position: absolute;
  z-index: 2136;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${theme.primaryShade};
`;

const StyledInput = styled.input<{error?: boolean}>`
    display: block;
    border: none;
    background: transparent;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    border-radius: 20px;
    color: white;
    font-size: 35px;
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: ${(props) => (props?.error ? '0px 0px 5px 5px #f44336' : '')};
    &:focus {
      outline: none;
      color: white;
      box-shadow: ${(props) => !props?.error && '0px 0px 5px 5px #6D5DD3'};;
    }
`
