import React, { PropsWithChildren } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { EditButton } from './EditButton';
import styled from "styled-components";

export default {
  title: 'EditButton',
  component: EditButton,
  argTypes: {
    text: { control: 'text' },
  },
} as ComponentMeta<typeof EditButton>;

const Template: ComponentStory<typeof EditButton> = (props) => <EditButton {...props} />;

export const Default = Template.bind({});
Default.args = {

};
