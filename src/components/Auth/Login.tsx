import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../helpers/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  return (
    <div className="login">
      <div className="login__header">
        <h1>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
              fill="currentColor"
            />
          </svg>
          Login
        </h1>
      </div>
      <div className="login__container">
        <div className="login__container__textinputs">
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="login__container__buttons">
          <button
            className={"login__btn" + ((email.length && password.length) ? "" : " disabled")}
            onClick={() => logInWithEmailAndPassword(email, password)}>
            Login
          </button>
          {/* <button className="login__btn login__google" onClick={signInWithGoogle}>
            Login with Google
          </button> */}
        </div>
        <div className="login__container__actions">
          <div className="link__container">
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div className="link__container register">
            <span>
              Don't have an account? <Link to="/register">Register</Link> now.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;