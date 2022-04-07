import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {VLoader} from "./VLoader";
import {Menu} from "./LeftMenu";

export default {
    title: 'V preloader',
    component: VLoader,
} as ComponentMeta<typeof VLoader>;

const Template: ComponentStory<typeof VLoader> = ({ children, ...props }) => <div><VLoader {...props}>{children}</VLoader></div>;
export const Default = Template.bind({});
Default.args = {

};