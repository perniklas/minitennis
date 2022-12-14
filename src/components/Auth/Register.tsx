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

  const register = () => {
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
      <div className="register__container">
        <div className="register__container__textinputs">
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            className="register__textBox"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>
        <div className="register__container__buttons">
          <button className={"register__btn" + (email.length && password.length && name ? "" : " disabled")}
            onClick={register}>
            Register
          </button>
          {/* <button
            className="register__btn register__google"
            onClick={signInWithGoogle}>
            Register with Google
          </button> */}
        </div>

        <div className="login__register">
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

function verifyInputs(name: string, email: string, password: string, confirmPassword: string) {
  let whatsWrong = '';
  let valid = true;
  const emailRegex = /[\S]+\@[\S]+\.[\S]+/;
  
  if (password !== confirmPassword) {
    whatsWrong += 'Your passwords don\'t match.\n';
  }

  if (name.length < 4) {
    whatsWrong += 'Your name has to be at least 4 letters long.\n';
    valid = false;
  }

  if (!emailRegex.test(email)) {
    whatsWrong += 'Your email isn\'t valid.\n';
    valid = false;
  }

  if (password.length < 5) {
    whatsWrong += 'Your password is too short.\n';
    valid = false;
  }

  if (!valid) {
    alert(whatsWrong);
  }

  console.log(whatsWrong);

  return valid;
}

export default Register;