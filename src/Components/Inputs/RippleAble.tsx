import { FunctionComponent, PropsWithChildren, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { ButtonProps, InputSize, RippleAbleProps } from '../Constants';

type Ripple = {
    key: number,
    styles: any
}

export const RippleAble: FunctionComponent<PropsWithChildren<RippleAbleProps>> = (props) => {
  const arr: Ripple[] = [];
  const [ripples, setRipples] = useState(arr);
  const [lastKey, setLastKey] = useState(0);

  const handleDown = (e: any) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const maxDim = Math.max(target.clientWidth, target.clientHeight);
    const styles: any = {};
    styles.left = `${e.clientX - rect.left - maxDim / 2}px`;
    styles.top = `${e.clientY - rect.top - maxDim / 2}px`;
    styles.width = styles.height = maxDim;
    const key = lastKey + 1;
    setLastKey(key);
    setRipples([...ripples, { key, styles }]);
  };

  const handleUpOrLeave = (e: any) => {
    const ripples2: Ripple[] = [...ripples];
    if (ripples2.length > 0) {
      ripples2.shift();
    }
    setRipples(ripples2);
  };

  return (
    <Wrapper {...props} onPointerDown={handleDown} onPointerLeave={handleUpOrLeave} onPointerUp={handleUpOrLeave}>
      {props.children}
      <WrapperInner {...props}>
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div key={ripple.key} initial={{ opacity: 0.4 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }}>
              <RippleCircle key={"A" + ripple.key} initial={{ backgroundColor: "rgb(30, 30, 30)" }} animate={{ backgroundColor: "rgb(0,0,0)"}} exit={{ backgroundColor: "rgb(255, 255, 255)"}} style={ripple.styles} />
            </motion.div>
          ))}
        </AnimatePresence>
      </WrapperInner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const WrapperInner = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transform: translateY(-100%);
  pointer-events: none;
  touch-action: none;
`;

const rippleKeyframes = keyframes`
  to {
    transform: scale(4);
  }
`;

const RippleCircle = styled(motion.span)`
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ${rippleKeyframes} 700ms ease-in-out forwards;
`;
