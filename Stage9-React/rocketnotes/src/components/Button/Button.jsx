import { Container } from "./Button.js";

// O parâmetro "...rest" é usado para não ter que declarar cada parâmetro de entrada do componente. 
// Caso o parâmetro seja passado na chamada do componente, o REACT irá criar o parâmetro no componente.
export function Button({tittle, loading = false, ...rest}) {

    Button.propTypes = {
        tittle: String.isRequired,
        loading: Boolean
    }

    return (
        <Container 
            type="button"
            disabled={loading}
            {...rest}>
                 { getButtonTittle(tittle, loading) } 
        </Container>
    );

    function getButtonTittle(tittle, loading){
        return loading 
                ? 'Carregando'
                : tittle;
    }
}

