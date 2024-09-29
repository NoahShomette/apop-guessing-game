import styles from "./Button.module.css";
import { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { ButtonSize } from "../../utils/options";
import { useColors } from "../../context/colorsContext";
import { Link } from "react-router-dom";


interface ButtonProps {
    // Settings to give the button text
    buttonText?: ButtonText;
    // Settings to give the button an icon
    buttonIcon?: ButtonIcon;

    // Settings to give the button a link. Links can be external or internal
    link?: LinkSettings;

    // An optional on click event
    buttonOnClick?: React.MouseEventHandler;

    // If this button should have a background
    background?: boolean;
    // Override color for the background
    backgroundColor?: string;
    // override hover color for the background
    backgroundHover?: string;
}

interface LinkSettings {
    linkType: LinkType,
    link: string,
}

export enum LinkType {
    internal,
    external
}

interface ButtonText {
    //specify what the text size is
    textSize: ButtonSize,
    // specify what the button text is
    buttonText: string,
    // change the text color, defaults to --color-contrast
    textColor?: string,
    // change the text color on hover, defaults to --color-main-alt
    textHover?: string,
}

interface ButtonIcon {
    iconDefinition: IconDefinition;
    iconSize: SizeProp;
    iconColor?: string;
    iconHover?: string;
}

export default function Button(props: ButtonProps) {
    let colors = useColors();

    const [hovered, setHovered] = useState(false);

    function handleMouseEnter() {
        setHovered(true)
    }

    function handleMouseLeave() {
        setHovered(false)
    }

    let buttonStyles = "";
    let textStyles = "";
    let backgroundColor = props.backgroundColor ? props.backgroundColor : colors.activeColor.contrastLight;

    // If it has a text or an icon check and see if it has a manual color
    let textColor = props.buttonText?.textHover ? props.buttonText.textHover : colors.activeColor.contrastDark;
    let iconColor = props.buttonIcon?.iconColor ? props.buttonIcon.iconColor : colors.activeColor.contrastDark;



    if (hovered) {
        buttonStyles = buttonStyles + " " + styles.hovered;
        textStyles = textStyles + " " + styles.hovered;
        if (props.background) {
            backgroundColor = props.backgroundHover ? props.backgroundHover : colors.activeColor.contrastDark;
        }
        // If it has a text or an icon check and see if it has a manual color
        textColor = props.buttonText?.textHover ? props.buttonText.textHover : colors.activeColor.contrastLight;
        iconColor = props.buttonIcon?.iconColor ? props.buttonIcon.iconColor : colors.activeColor.contrastLight;

    }

    if (props.background) {
        buttonStyles = buttonStyles + " " + styles.background;
    }

    if (props.buttonText) {
        switch (props.buttonText.textSize) {
            case ButtonSize.extraSmall:
                textStyles = textStyles + " " + styles.extraSmall;
                break;
            case ButtonSize.small:
                textStyles = textStyles + " " + styles.small;
                break;
            case ButtonSize.large:
                textStyles = textStyles + " " + styles.large;
                break;
            case ButtonSize.extraLarge:
                textStyles = textStyles + " " + styles.extraLarge;
                break;
            default:
                break;
        }
    }


    function getButton() {
        if (props.link) {
            switch (props.link.linkType) {
                case LinkType.external:
                    return (<a href={props.link.link} target="_blank" rel="noopener noreferrer"
                        className={[styles.button, buttonStyles].join(" ")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave} onClick={props.buttonOnClick}
                        {...props.background ? { style: { backgroundColor: backgroundColor } } : undefined}
                    >
                        {getContent()}
                    </a>)
                case LinkType.internal:
                    return (<Link className={[styles.button, buttonStyles].join(" ")} to={props.link.link} onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={props.buttonOnClick} {...props.background ? { style: { backgroundColor: backgroundColor } } : undefined}>
                        {getContent()}
                    </Link>)
            }

        } else {
            return (<div className={[styles.button, buttonStyles].join(" ")} onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} onClick={props.buttonOnClick}
                {...props.background ? { style: { backgroundColor: backgroundColor } } : undefined}
            >
                {getContent()}
            </div>)
        }
    }

    function getContent() {

        let content: ReactNode[] = [];

        if (props.buttonIcon) {
            content.push(<div key={0}>
                <FontAwesomeIcon icon={props.buttonIcon.iconDefinition} className={[styles.icon, textStyles].join(" ")}
                    size={props.buttonIcon.iconSize} style={{ color: iconColor }} />
            </div>)
        }

        if (props.buttonText && props.buttonIcon) {
            content.push(
                <div className={styles.spacer} key={1}></div>
            )
        }

        if (props.buttonText) {
            content.push(
                <div className={[styles.text, textStyles].join(" ")} key={2}
                    style={{ color: textColor }}>{props.buttonText.buttonText}</div>
            )
        }

        return (
            content
        )
    }

    return (
        getButton()
    )
}
