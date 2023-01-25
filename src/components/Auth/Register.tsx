import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "../../helpers/firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputs = document.getElementsByClassName('register__textBox');
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs.item(i);
      input.classList.add('submitted');
    }

    if (!verifyInputs(name, email, password, confirmPassword)) {
      return;
    }
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="register">
      <div className="register__header">
        <h1>Register</h1>
      </div>
      <form onSubmit={register} className="register__container">
        <div className="register__container__textinputs">
          <input
            id="registerName"
            required
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => {
              e.target.classList.remove('wrong');
              setName(e.target.value);
            }}
            placeholder="Full Name"
          />
          <input
            required
            id="registerEmail"
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => {
              e.target.classList.remove('wrong');
              setEmail(e.target.value);
            }}
            placeholder="E-mail Address"
          />
          <input
            required
            id="firstPass"
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => {
              e.target.classList.remove('wrong');
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <input
            required
            id="lastPass"
            type="password"
            className="register__textBox"
            value={confirmPassword}
            onChange={(e) => {
              e.target.classList.remove('wrong');
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm password"
          />
        </div>
        <div className="register__container__buttons">
          <button type="submit" className={"register__btn" + (email.length && password.length && name ? "" : " disabled")}>
            Register
          </button>
        </div>

        <div className="login__register">
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </form>
    </div>
  );
}

function verifyInputs(name: string, email: string, password: string, confirmPassword: string) {
  let whatsWrong = '';
  let valid = true;
  const emailRegex = /[\S]+\@[\S]+\.[\S]+/;

  if (password !== confirmPassword) {
    whatsWrong += 'Your passwords don\'t match.\n';
    document.getElementById('firstPass')?.classList.add('wrong');
    document.getElementById('lastPass')?.classList.add('wrong');
    valid = false;
  }

  if (name.length < 4) {
    document.getElementById('registerName')?.classList.add('wrong');
    whatsWrong += 'Your name has to be at least 4 letters long.\n';
    valid = false;
  }

  if (!emailRegex.test(email)) {
    document.getElementById('registerEmail')?.classList.add('wrong');
    whatsWrong += 'Your email isn\'t valid.\n';
    valid = false;
  }

  if (password.length < 5) {
    whatsWrong += 'Your password is too short.\n';
    document.getElementById('firstPass')?.classList.add('wrong');
    document.getElementById('lastPass')?.classList.add('wrong');
    valid = false;
  }

  if (!valid) {
    alert(whatsWrong);
  }

  return valid;
}

export default Register;