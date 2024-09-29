import React, { ReactNode, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useCookies } from "react-cookie";

type colorInfo = {
    background: string,
    backgroundLight: string,
    backgroundDark: string,
    contrast: string,
    contrastLight: string,
    contrastDark: string,
    contrastAlt: string,
    contrastAltDark: string,
    contrastAltLight: string,
    dark: string,
    light: string
}

const colorInfoDefault: colorInfo = {
    background: "#E2E2E2",
    backgroundLight: "#DFDFDF",
    backgroundDark: "#969696",
    contrastLight: "#F0C384",
    contrastDark: "#D08111",
    contrast: "#F0A53B",
    contrastAlt: "#2274A5",
    contrastAltDark: "#09669C",
    contrastAltLight: "#488CB4",
    dark: "#1C1C1C",
    light: "#DFDFDF",
}

type colorContext = {
    activeColor: colorInfo,
    changeActiveColor: (newColor: colorInfo) => void,
    colors: colorInfo[],
    colorsLoaded: boolean,
}


let colors: colorInfo[];

const colorContextDefaultValues: colorContext = {
    activeColor: colorInfoDefault,
    changeActiveColor: (newColor: colorInfo) => {
    },
    colors: [],
    colorsLoaded: false,
};

export const ColorContext = React.createContext<colorContext>(colorContextDefaultValues);

export function useColors() {
    return useContext(ColorContext);
}

type Props = {
    children: ReactNode;
};

export default function ColorsProvider({ children }: Props) {
    const [cookies, setCookie] = useCookies(["activeColor"]);
    const [colorsLoaded, setIsLoaded] = useState<boolean>(false);
    const [activeColor, setColor] = useState<colorInfo>(cookies.activeColor ? cookies.activeColor : colorInfoDefault);

    function updateColorCookie(color: colorInfo) {
        setCookie("activeColor", color, { path: "/", expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
    }

    useEffect(() => {
        fetch("colors.json").then(function (res) {
            return res.json()
        }).then(function (colorsJson) {
            colors = colorsJson.colors;
            setIsLoaded(true);
        });
    });

    const updateStyles = (newColor: colorInfo) => {
        document.documentElement.style
            .setProperty('--bg', newColor.background);
        document.documentElement.style
            .setProperty('--bg-dark', newColor.backgroundDark);
        document.documentElement.style
            .setProperty('--bg-light', newColor.backgroundLight);
        document.documentElement.style
            .setProperty('--contrast', newColor.contrast);
        document.documentElement.style
            .setProperty('--contrast-light', newColor.contrastLight);
        document.documentElement.style
            .setProperty('--contrast-dark', newColor.contrastDark);
        document.documentElement.style
            .setProperty('--contrast-alt', newColor.contrastAlt);
        document.documentElement.style
            .setProperty('--contrast-alt-light', newColor.contrastAltLight);
        document.documentElement.style
            .setProperty('--contrast-alt-dark', newColor.contrastAltDark);
        document.documentElement.style
            .setProperty('--light', newColor.light);
        document.documentElement.style
            .setProperty('--dark', newColor.dark);
    }

    const changeActiveColor = (newColor: colorInfo) => {
        setColor(newColor);
        updateStyles(newColor);
        updateColorCookie(newColor);
    }

    useLayoutEffect(() => {
        updateStyles(activeColor);
        setColor(activeColor)
    }, [activeColor]);


    const value = {
        activeColor,
        changeActiveColor,
        colors,
        colorsLoaded,
    };

    return (
        <>
            <ColorContext.Provider value={value}>
                {children}
            </ColorContext.Provider>
        </>
    );
}
