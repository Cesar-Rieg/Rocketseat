import { useState } from 'react';
import { Header } from '../../components/Header/Header.jsx';
import { Input } from '../../components/Input/Input.jsx';
import { TextArea } from '../../components/TextArea/TextArea.jsx';
import { NoteItem } from '../../components/NoteItem/NoteItem.jsx';
import { Section } from '../../components/Section/Section.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { ButtonText } from '../../components/ButtonText/ButtonText.jsx';

import { Container, Form } from './NewNote.js';
import { api } from '../../services/ApiServices.js';
import { useNavigate } from 'react-router-dom';

export function NewNote(){
    const [ tittle, setTittle ] = useState("");
    const [ description, setDescription ] = useState("");

    const [ links, setLinks ] = useState([]);
    const [ newLink, setNewLink ] = useState("");

    const [ tags, setTags ] = useState([]);
    const [ newTag, setNewTag ] = useState("");

    const navigate = useNavigate();

    function handleAddLink() {
        if (!newLink) 
            return alert("O link não pode ser nulo.");

        setLinks(prevState => [...prevState, newLink]);
        setNewLink("");
    }

    function handleBackToPreviousPage() {
        if (tittle || description || links.length > 0 || tags.length > 0){
            const confirm = window.confirm("Tem certeza que deseja voltar?\r\nOs dados informados serão descartados.");
            if (!confirm) return;
        }
        navigate(-1);
      } 

    function handleRemoveLink(removeItem) {
        setLinks(prevState => prevState.filter(link => link !== removeItem))
    }

    function handleAddTag() {
        if (!newTag) 
            return alert("O marcador não pode ser nulo.");

        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }

    function handleRemoveTag(removeTag) {
        setTags(prevState => prevState.filter(tag => tag !== removeTag))
    }

    async function handleNewNote() {
        if (!tittle || links.length === 0 || tags.length === 0) {
            return alert("Não foi possível salvar a nota, existem campos obrigatórios.");
        }
        if (newLink) {
            return alert("Existem links em edição. Por favor, verifique.")
        }
        if (newTag) {
            return alert("Existem marcadores em edição. Por favor, verifique.")
        }

        await api.post("/notes", {
            tittle,
            description,
            links,
            tags
        });

        alert("Nota criada com sucesso!");
        navigate("/");
    }

    return (
        <Container>

            <Header/>

            <main>
                <Form>

                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText 
                            tittle="Voltar"
                            onClick={handleBackToPreviousPage}
                        />
                    </header>

                    <Input
                        placeholder="Titulo"
                        onChange={(event) => setTittle(event.target.value)}
                    />

                    <TextArea
                        placeholder="Observações"
                        onChange={(event) => setDescription(event.target.value)}
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
                            {
                                tags.map((tag, index) => (
                                    <NoteItem
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            <NoteItem
                                isNew="true"
                                placeholder="Nova tag"
                                onChange={(event) => setNewTag(event.target.value)}
                                value={newTag}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button tittle="Salvar" onClick={handleNewNote}/>

                </Form>
            </main>
        </Container>
    );
}
