import { Container } from "../Note/Note.js";
import { Tag } from "../Tag/Tag.jsx";

export function Note({data, ...rest}){
    return (
        <Container {...rest}>
            <h1>{data.titulo}</h1>
            {
                data.tags &&
                <footer>
                    {
                        data.tags.map(tag => <Tag key={tag.id} tittle={tag.name}/>)
                    }
                </footer>
            }
        </Container>
    );
}
