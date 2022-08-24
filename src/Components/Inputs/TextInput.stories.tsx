import React, { PropsWithChildren } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Formik } from 'formik';
import { TextInput } from './TextInput';

export default {
  title: 'Text input',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = ({ children, ...props }) => {

  return (
    <Formik
      initialValues={{ example: '' }}
      onSubmit={console.log}
    >
      <TextInput {...props}>{children}</TextInput>
    </Formik>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'example',
  placeholder: 'example',
};
