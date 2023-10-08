import { Header } from '../../components/Header/Header.jsx';
import { Input } from '../../components/Input/Input.jsx';
import { TextArea } from '../../components/TextArea/TextArea.jsx';

import { Container, Form } from './NewNote.js';

export default function NewNote(){
    return (
        <Container>

            <Header/>

            <main>
                <Form>

                    <header>
                        <h1>Criar nota</h1>
                        <a href="/">Voltar</a>
                    </header>

                    <Input
                        placeholder="Titulo"
                    />

                    <TextArea
                        placeholder="Observações"
                    />

                </Form>
            </main>
        </Container>
    );
}
