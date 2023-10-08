import { Container, Form, Background } from './SignUp.js';

import { FiMail, FiLock, FiUser } from 'react-icons/fi';

import { Input } from '../../components/Input/Input.jsx';
import { Button } from '../../components/Button/Button.jsx';

export function SignUp(){
    return (
        <Container>

            <Background/>

            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>
                <h2>Crie sua conta</h2>
                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                />
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
                <Button tittle="Cadastrar"/>

                <a href="javascript:">Voltar para o login</a>
            </Form>
        </Container>
    );
}
