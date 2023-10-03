/* eslint-disable react/prop-types */

import { Container } from './Section.js';

export function Section({tittle, children}){
    
    return (
        <Container>
            <h2>
                {tittle}
            </h2>
            {children}
        </Container>
    );
}