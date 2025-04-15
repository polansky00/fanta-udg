import { useState } from "react";
import { useRouter } from "next/router";
import { users } from "./login";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || password.length < 4 || password.includes(" ")) {
      return setError("Dati non validi.");
    }
    const exists = users.find(u => u.name === name);
    if (exists) return setError("Utente già esistente.");
    users.push({ name, password, role: "user" });
    router.push("/login");
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Registrazione Fanta UDG</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button type="submit">Registrati</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
