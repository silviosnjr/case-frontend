import { useState } from "react";
import { login } from "../services/api";

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const data = await login(email, senha);
      localStorage.setItem("token", data.token); // guarda o JWT
      onLoginSuccess(); // redireciona ou muda o estado
    } catch (err) {
      setErro("Login falhou. Verifique seu e-mail e senha.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <label>
        E-mail:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Senha:
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </label>

      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginForm;