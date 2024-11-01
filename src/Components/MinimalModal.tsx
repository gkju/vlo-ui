import React, {
  FunctionComponent, useState, Fragment, FormEventHandler, FormEvent, useEffect, useRef,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useKeyPressEvent } from 'react-use';
import { Handler } from 'react-use/lib/useKey';
import { MinimalModalProps, ModalProps } from './Constants';
import { Centerer } from './Modal';
import { theme } from '../theme';
import { useCancellables } from '../Utils/UseCancelTimeouts';

export const MinimalModal: FunctionComponent<MinimalModalProps> = (props) => {
  const { open, initialValue } = props;
  const [value, setValue] = useState(initialValue ?? '');

  if (open) {
    const html = document.querySelector('html');
    if (html !== null) {
      html.classList.add('locked');
    }
  }

  useEffect(() => {
    if (open && document.activeElement) {
      // @ts-ignore
      document?.activeElement.blur();
    }
  }, [open]);

  useEffect(() => {
    setValue(initialValue ?? '');
  }, [initialValue]);

  const shouldUnlockScroll = () => {
    const modals = document.querySelectorAll('.Modal');
    const html = document.querySelector('html');

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
    exit: {
      opacity: 0,
      background: '#252533',
      boxShadow: 'inset 0px 0px 0px #13131B, inset 0px 0px 0px #272735',
    },
    open: {
      opacity: '100%',
      background: '#1D1D28',
      translateY: '0vh',
      boxShadow: 'inset 5.71px 5.71px 25px #121219, inset -5.71px -5.71px 25px #282837',
      transition: { boxShadow: { delay: 2, duration: 3 }, background: { duration: 2 }, translateY: { type: 'spring', stiffness: 100, damping: 15 } },
    },
    initial: {
      opacity: 0,
      translateY: '-50vh',
      background: '#252533',
      boxShadow: 'inset 0px 0px 0px #13131B, inset 0px 0px 0px #272735',
    },
  };

  let domNode = document.getElementById('minimalModalRoot');
  if (!domNode) {
    const div = document.createElement('div');
    div.setAttribute('id', 'minimalModalRoot');
    domNode = div;
  }

  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const handleStates = useCancellables();
  const [translateX, setTranslateX] = useState(0);
  const handleSubmit: Handler = async (e) => {
    try {
      await props.validator(value);
      setError('');
      await props.handler(value);
      reset();
      await props.close();
    } catch (err: any) {
      setError(err?.message ?? 'err');
      const states: [Function, number][] = [
        [() => setTranslateX(-20), 50],
        [() => setTranslateX(40), 100],
        [() => setTranslateX(-60), 150],
        [() => setTranslateX(0), 200],
      ];

      handleStates(states);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    setValue(e.target?.value);
    if (e.target?.value.length > 3 || touched) {
      try {
        setTouched(true);
        await props.validator(e.target?.value);
        setError('');
      } catch (err: any) {
        setError(err?.message ?? 'err');
      }
    } else {
      setError('');
    }
  };

  const reset = () => {
    setValue('');
    setError('');
    setTouched(false);
  };
  const ref = useRef(null);

  const [alt, setAlt] = useState(false);

  useKeyPressEvent('Alt', () => {
    setAlt(true);
  }, () => {
    setAlt(false);
  });
  useKeyPressEvent('Enter', handleSubmit);
  useKeyPressEvent('Escape', (e) => { e.preventDefault(); reset(); props.close(); });

  return ReactDOM.createPortal(
    <AnimatePresence onExitComplete={shouldUnlockScroll}>
      {open && (
        <>
          <div className="Modal">
            <Centerer>
              <Wrapper
                animate={{ translateX }}
                onPointerDown={(e) => {
                  // @ts-ignore
                  if (ref?.current && !ref?.current?.contains(e.target)) {
                    reset();
                    props.close();
                  }
                }}
              >
                <MinimalModalDiv ref={ref} variants={modalVariants} initial="initial" exit="exit" animate="open" key="modal">
                  <StyledInput autoFocus error={error.length > 0} onChange={handleChange} value={value} type={props?.password && !alt ? 'password' : 'text'} placeholder={props.placeholder} />
                </MinimalModalDiv>
                <Error>{error}</Error>
              </Wrapper>
            </Centerer>
          </div>
          <Backdrop onMouseDown={(e) => { reset(); props.close(); }} variants={backDropVariants} initial="initial" exit="exit" animate="open" key="backdrop" />
        </>
      )}
    </AnimatePresence>,
    domNode,
  );
};

const Wrapper = styled(motion.div)`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

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
  margin-top: calc(50vh - min(45px, 13vh));
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
`;

const Error = styled.p`
  color: #f44336;
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-size: 15px;
  margin-top: 15px;
`;
