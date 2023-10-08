import { Header } from '../../components/Header/Header.jsx';
import { Input } from '../../components/Input/Input.jsx';
import { TextArea } from '../../components/TextArea/TextArea.jsx';
import { NoteItem } from '../../components/NoteItem/NoteItem.jsx';
import { Section } from '../../components/Section/Section.jsx';

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

                    <Section tittle="Links úteis">
                        <NoteItem
                            value="https://rocketseat.com.br"
                        />
                        <NoteItem
                            isNew
                            placeholder="Novo link"
                        />
                    </Section>

                </Form>
            </main>
        </Container>
    );
}
