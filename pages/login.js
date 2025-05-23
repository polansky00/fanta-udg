import { useState } from "react";
import { useRouter } from "next/router";

export let users = [
  { name: "admin01", password: "taekwon2024", role: "admin" },
  { name: "admin02", password: "taekwon2024", role: "admin" },
];

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.name === name && u.password === password);
    if (!user) return setError("Credenziali errate.");
    if (user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/user?name=" + encodeURIComponent(user.name));
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Login Fanta UDG</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button type="submit">Accedi</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>Non hai un account? <a href="/register">Registrati</a></p>
    </div>
  );
}
