import { Container } from "./TextArea.js";

export function TextArea({value, ...rest}){
    return (
        <Container {...rest}>
            {value}
        </Container>
    )
}
