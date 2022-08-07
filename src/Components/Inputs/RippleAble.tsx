import {
  FunctionComponent,
  PointerEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { ButtonProps, InputSize, RippleAbleProps } from '../Constants';
import { useCancellables } from '../../Utils/UseCancelTimeouts';

type Ripple = {
    key: number,
    styles: any,
    vis: boolean
}

export const RippleAble: FunctionComponent<PropsWithChildren<RippleAbleProps>> = (props) => {
  const arr: Ripple[] = [];
  const [ripples, setRipples] = useState(arr);
  const ripplesRef = useRef(arr);
  const handleStates = useCancellables();
  useEffect(() => { ripplesRef.current = ripples; }, [ripples]);

  const handleDown: PointerEventHandler = (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const maxDim = Math.max(target.clientWidth, target.clientHeight);
    const styles: any = {};
    styles.left = `${e.clientX - rect.left - maxDim / 2}px`;
    styles.top = `${e.clientY - rect.top - maxDim / 2}px`;
    styles.width = maxDim;
    styles.height = maxDim;
    let key: number = ripples[Math.abs(ripples.length - 1)]?.key || 0;
    ++key;
    setRipples([...ripples, { key, styles, vis: true }]);
  };

  const shiftRipples = () => {
    setRipples(ripplesRef.current.slice(1));
  };
  const handleUpOrLeave: PointerEventHandler = (e) => {
    e.preventDefault();
    const ripples2: Ripple[] = [...ripples];
    if (ripples2.length > 0) {
      ripples2[ripples2.length - 1].vis = false;
      handleStates(
        [[shiftRipples, 2000]],
      );
    }
    setRipples(ripples2);
  };

  return (
    <Wrapper {...props} onPointerDown={handleDown} onPointerLeave={(e) => { handleUpOrLeave(e); }} onPointerUp={(e) => { handleUpOrLeave(e); }}>
      {props.children}
      <WrapperInner id="wrap" {...props}>
          {ripples.map((ripple) => (
            <motion.div key={ripple.key} transition={{duration: 2}} initial={{ opacity: 0.4 }} animate={{ opacity: ripple.vis ? 0.2 : 0 }}>
              <RippleCircle key={`${ripple.key}a`} initial={{ backgroundColor: "rgb(30, 30, 30)" }} animate={{ backgroundColor: ripple.vis ? 'rgba(0,0,0,1)' : 'rgba(0, 0, 0, 0)' }} style={ripple.styles} />
            </motion.div>
          ))}
      </WrapperInner>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  position: relative;
  display: inline-block;
`;

const WrapperInner = styled(motion.div)`
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
    transform: scale(5);
  }
`;

const RippleCircle = styled(motion.span)`
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ${rippleKeyframes} 700ms ease-in forwards;
`;
