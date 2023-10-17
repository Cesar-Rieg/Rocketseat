import { useState } from "react";
import { useAuth } from "../../hooks/auth.jsx";
import { Container, Form, Avatar } from "./Profile.js";
import { Input } from "../../components/Input/Input.jsx";
import { Button } from "../../components/Button/Button.jsx";
import { Link } from 'react-router-dom';

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";

export function Profile(){
    const { user, updateProfile } = useAuth();
    const [ name, setName ] = useState(user.name);
    const [ email, setEmail ] = useState(user.email);
    const [ oldPassword, setOldPassword ] = useState();
    const [ newPassword, setNewPassword ] = useState();

    const [ avatar, setAvatar ] = useState(user.avatar);
    const [ avatarFile, setAvatarFile ] = useState(null);

    async function handleUpdate() {
        const user = {
            name: name,
            email: email,
            old_password: oldPassword, 
            password: newPassword
        }
        await updateProfile({ user, avatarFile });
    }

    function handleAvatarChanged(event) {
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return (
        <Container>
            <header>
                <Link to="/">
                    <FiArrowLeft/>
                </Link>
            </header>
            <Form>

                <Avatar>
                    <img src={avatar} alt="Foto do usuário" />
                    <label htmlFor="avatar">
                        <FiCamera/>
                        <input id="avatar" type="file" onChange={ handleAvatarChanged } />
                    </label>
                </Avatar>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={(event) => setOldPassword(event.target.value)}
                />
                <Input
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    onChange={(event) => setNewPassword(event.target.value)}
                />

                <Button tittle="Salvar" onClick={handleUpdate}/>

            </Form>
        </Container>
    );
}
