import React, { PropsWithChildren } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import styled from "styled-components";
import { MinimalModal } from './MinimalModal';

/*
interface MinimalModalProps {
    open: Boolean,
    close: MouseEventHandler<HTMLDivElement>,
    handler: (input: string) => void,
    placeholder: string
}
 */
export default {
  title: 'Minimal Modal',
  component: MinimalModal,
  argTypes: {
    open: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof MinimalModal>;

const Template: ComponentStory<typeof MinimalModal> = ({ ...props }) => (
  <>
    <div id="modalRoot"></div>
    <MinimalModal {...props} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  validator: (s) => {console.log(s); return s.length > 5;},
};
