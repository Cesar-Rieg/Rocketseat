import { Container, Brand, Menu, Search, Content, NewNote } from './Home.js';
import { Header } from '../../components/Header/Header.jsx';
import { ButtonText } from '../../components/ButtonText/ButtonText.jsx';
import {FiPlus} from 'react-icons/fi';

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
            </Search>

            <Content>
            </Content>

            <NewNote> 
                <FiPlus/>
                Criar nota
            </NewNote>
        </Container>
    );
}