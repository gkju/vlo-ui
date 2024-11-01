import React, { PropsWithChildren } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './Button';
import styled from "styled-components";

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    size: {
      options: ['Big', 'Medium', 'Small'],
      mapping: {
        Big: 0,
        Medium: 1,
        Small: 2,
      },
    },
    primaryColor: { control: 'color' },
    secondaryColor: { control: 'color' },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ children, ...props }) => <Button {...props}>{children}</Button>;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  primaryColor: '#6D5DD3',
  secondaryColor: '#FFFFFF',
};
