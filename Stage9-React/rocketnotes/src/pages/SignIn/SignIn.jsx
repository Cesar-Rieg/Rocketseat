import { Container, Form, Background } from './SignIn.js';

import { Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

import { Input } from '../../components/Input/Input.jsx';
import { Button } from '../../components/Button/Button.jsx';

export function SignIn(){
    return (
        <Container>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>
                <h2>Faça seu login</h2>
                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                />
                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                />
                <Button tittle="Entrar"/>

                <Link to="/sign-up">Criar conta</Link>
            </Form>
            <Background/>
        </Container>
    );
}
