import { useState } from 'react';
import { api } from '../../services/ApiServices.js';

import { Container, Form, Background } from './SignUp.js';

import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

import { Input } from '../../components/Input/Input.jsx';
import { Button } from '../../components/Button/Button.jsx';

export function SignUp(){
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();

    function salvarUsuario(){
        if (!name) return alert ("O campo nome não pode ser vazio.");
        if (!email) return alert("O campo email não pode ser vazio.");
        if (!password) return alert("O campo senha não pode ser vazio.");

        api.post("/users", {name, email, password})
            .then(() => {
                redirecionarParaOLogin();
            })
            .catch(error => {
                tratarRetornoDeErro(error);
            });
    }

    function redirecionarParaOLogin(){
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
    }

    function tratarRetornoDeErro(error){
        console.log(error);
        if (error.response){
            alert(error.response.data.Message);
        }else {
            alert("Não foi possível realizar o cadastro.");
        }
    }

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
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button tittle="Cadastrar" onClick={salvarUsuario}/>

                <Link to="/">Voltar para o login</Link>
            </Form>
        </Container>
    );
}
