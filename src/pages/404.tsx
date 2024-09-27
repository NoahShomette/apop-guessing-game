import React from 'react';
import { ButtonSize } from "../utils/options";
import Button, { LinkType } from '../components/interface/Button';

function FourOhFour() {
    return (
        <>
            <h1>Page not found</h1>
            <Button link={{ link: "/", linkType: LinkType.internal }} buttonText={{ buttonText: "Home", textSize: ButtonSize.medium }} background={true} />
        </>

    );
}

export default FourOhFour;
