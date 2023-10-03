/* eslint-disable react/prop-types */

import { Container } from "./ButtonText.js";

export function ButtonText({tittle, isActive = false, ...rest}) {

    return (
        <Container type="button" $active={isActive.toString()} {...rest}>
            {tittle}
        </Container>
    );
}