import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Brand, Menu, Search, Content, NewNote } from './Home.js';
import { Header } from '../../components/Header/Header.jsx';
import { Note } from '../../components/Note/Note.jsx';
import { Input } from '../../components/Input/Input.jsx';
import { Section } from '../../components/Section/Section.jsx';
import { ButtonText } from '../../components/ButtonText/ButtonText.jsx';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { api } from '../../services/ApiServices.js';

export function Home() {
    const [ search, setSearch ] = useState("");
    const [ notes, setNotes ] = useState([]);
    const [ tags, setTags ] = useState([]);
    const [ tagsSelected, setTagsSelected ] = useState([]);

    const navigate = useNavigate();

    function handleTagsSelected(tagName) {
        if (tagName === "Todos"){
            return setTagsSelected([]);
        }

        const alreadySelected = tagsSelected.includes(tagName);
        if (alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags);
        }
        else {
            setTagsSelected(prevState => [...prevState, tagName]);
        }
    }

    function handleDetails(noteId) {
        navigate(`/details/${noteId}`);        
    }

    useEffect(() => {
        async function fetchNotesTags() {
            const response = await api.get("/notes-tags");
            setTags(response.data);
        }

        fetchNotesTags();
    }, []);

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?tittle=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }

        fetchNotes();
    }, [tagsSelected, search]);

    return (
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li>
                    <ButtonText 
                        tittle="Todos" 
                        onClick={() => handleTagsSelected("Todos")}
                        isactive={tagsSelected.length === 0}
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                                tittle={tag.name}
                                onClick={() => handleTagsSelected(tag.name)}
                                isactive={tagsSelected.includes(tag.name)}
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título" 
                    icon={FiSearch}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </Search>

            <Content>
                <Section tittle="Minhas notas">
                    {
                        notes.map(note => (
                            <Note 
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>
            </Content>

            <NewNote to="new-note">
                <FiPlus/>
                Criar nota
            </NewNote>
        </Container>
    );
}
