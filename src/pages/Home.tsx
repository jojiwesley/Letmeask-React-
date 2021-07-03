import { useHistory } from 'react-router';
import { useContext } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';

import {auth, firebase} from '../services/firebase';

import '../styles/auth.scss';
import {TextContext} from '../App';


export function Home(){
const history = useHistory();
const value = useContext(TextContext);

function hadleCreateRoom(){
  const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
    console.log(result);
    history.push('/rooms/new'); 
  }) 
}


  return (
    <div id="page-auth">
      <aside>
      <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <h1>{value}</h1>
        <div className="main-content">  
        <img src={logoImg} alt="Letmeask" />
          <button onClick= {hadleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo da Google" />
            Crie sua sala com a Google 
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
            type="text"
            placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}