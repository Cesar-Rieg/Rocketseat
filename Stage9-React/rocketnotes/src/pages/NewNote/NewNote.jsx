import { useState } from 'react';
import { Header } from '../../components/Header/Header.jsx';
import { Input } from '../../components/Input/Input.jsx';
import { TextArea } from '../../components/TextArea/TextArea.jsx';
import { NoteItem } from '../../components/NoteItem/NoteItem.jsx';
import { Section } from '../../components/Section/Section.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { Link } from 'react-router-dom';

import { Container, Form } from './NewNote.js';

export function NewNote(){
    const [ links, setLinks ] = useState([]);
    const [ newLink, setNewLink ] = useState("");

    function handleAddLink() {
        if (!newLink) 
            return alert("O link não pode ser nulo.");

        setLinks(prevState => [...prevState, newLink]);
        setNewLink("");
    }

    function handleRemoveLink(removeItem) {
        setLinks(prevState => prevState.filter(link => link !== removeItem))
        
    }

    return (
        <Container>

            <Header/>

            <main>
                <Form>

                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/">Voltar</Link>
                    </header>

                    <Input
                        placeholder="Titulo"
                    />

                    <TextArea
                        placeholder="Observações"
                    />

                    <Section tittle="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }
                        <NoteItem
                            isNew="true"
                            placeholder="Novo link"
                            value={newLink}
                            onChange={(event) => setNewLink(event.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section tittle="Marcadores">
                        <div className="note-tags">
                            <NoteItem
                                value="react"
                            />
                            <NoteItem
                                isNew="true"
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
