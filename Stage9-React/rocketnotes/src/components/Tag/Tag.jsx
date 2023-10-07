/* eslint-disable react/prop-types */

import { Container } from "../Tag/Tag.js";

export function Tag({tittle, ...rest}) {

    return (
        <Container {...rest}>
            {tittle}
        </Container>
    );
}
