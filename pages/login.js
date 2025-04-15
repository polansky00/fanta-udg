import { useState } from "react";
import { useRouter } from "next/router";

const admins = ["admin01", "admin02"];
const PASSWORD = "taekwon2024"; // può essere cambiata

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (password.trim().length < 4 || password.includes(" ")) {
      return setError("Password non valida.");
    }

    if (admins.includes(name.toLowerCase()) && password === PASSWORD) {
      router.push("/admin");
    } else if (name.trim().length > 0 && password === PASSWORD) {
      router.push("/user?name=" + encodeURIComponent(name));
    } else {
      setError("Credenziali errate.");
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Login Fanta UDG</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nome e Cognome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Accedi</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
