import { Header } from '../../components/Header/Header.jsx';
import { Input } from '../../components/Input/Input.jsx';
import { TextArea } from '../../components/TextArea/TextArea.jsx';
import { NoteItem } from '../../components/NoteItem/NoteItem.jsx';
import { Section } from '../../components/Section/Section.jsx';
import { Button } from '../../components/Button/Button.jsx';

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

                    <Section tittle="Marcadores">
                        <div className="note-tags">
                            <NoteItem
                                value="react"
                            />
                            <NoteItem
                                isNew
                                placeholder="Nova tag"
                            />
                        </div>
                    </Section>

                    <Button tittle="Salvar"/>

                </Form>
            </main>
        </Container>
    );
}
