import { Container, Form, Avatar } from "./Profile.js";
import { Input } from "../../components/Input/Input.jsx";
import { Button } from "../../components/Button/Button.jsx";

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";

export default function Profile(){
    return (
        <Container>
            <header>
                <a href="/">
                    <FiArrowLeft/>
                </a>
            </header>
            <Form>

                <Avatar>
                    <img src="https://github.com/Cesar-Rieg.png" alt="Foto do usuário" />
                    <label htmlFor="avatar">
                        <FiCamera/>
                        <input id="avatar" type="file" />
                    </label>
                </Avatar>

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
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                />
                <Input
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                />

                <Button tittle="Salvar"/>

            </Form>
        </Container>
    );
}
