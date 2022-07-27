import {Fragment, FunctionComponent, PropsWithChildren} from "react";
import { useLottie } from "lottie-react";
import animationData from "./Animations/VLoaderData.json";

export interface VLoaderProps {
    style?: any
}

export const VLoader: FunctionComponent<PropsWithChildren<VLoaderProps>> = (props) => {
    const options = {
        animationData,
        loop: true,
        autoplay: true
    };

    const { View } = useLottie(options, props?.style);

    return View;
}
