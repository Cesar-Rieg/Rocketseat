import { useState, useEffect } from 'react';
import { Container, Brand, Menu, Search, Content, NewNote } from './Home.js';
import { Header } from '../../components/Header/Header.jsx';
import { Note } from '../../components/Note/Note.jsx';
import { Input } from '../../components/Input/Input.jsx';
import { Section } from '../../components/Section/Section.jsx';
import { ButtonText } from '../../components/ButtonText/ButtonText.jsx';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { api } from '../../services/ApiServices.js';

export function Home() {
    const [ tags, setTags ] = useState([]);


    useEffect(() => {
        async function fetchNotesTags() {
            const response = await api.get("/notes-tags");
            setTags(response.data);
        }

        fetchNotesTags();
    }, []);

    return (
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li><ButtonText tittle="Todos" isactive/></li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText tittle={tag.name}/>
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input placeholder="Pesquisar pelo título" icon={FiSearch}/>
            </Search>

            <Content>
                <Section tittle="Minhas notas">
                    <Note data={{
                        tittle: 'React',
                        tags: [
                            {id: 1, name: 'React'},
                            {id: 2, name: 'Vue'},
                        ]
                    }}/>
                </Section>
            </Content>

            <NewNote to="new-note">
                <FiPlus/>
                Criar nota
            </NewNote>
        </Container>
    );
}
