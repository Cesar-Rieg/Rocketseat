import { Container, Brand, Menu, Search, Content, NewNote } from './Home.js';
import { Header } from '../../components/Header/Header.jsx';
import { Note } from '../../components/Note/Note.jsx';
import { Input } from '../../components/Input/Input.jsx';
import { Section } from '../../components/Section/Section.jsx';
import { ButtonText } from '../../components/ButtonText/ButtonText.jsx';
import {FiPlus, FiSearch} from 'react-icons/fi';

export default function Home() {

    return (
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li><ButtonText tittle="Todos" isactive/></li>
                <li><ButtonText tittle="React"/></li>
                <li><ButtonText tittle="Node"/></li>
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

            <NewNote>
                <FiPlus/>
                Criar nota
            </NewNote>
        </Container>
    );
}
