import { useState } from "react";

const utentiFake = [
  { nome: "Mario Rossi", punteggio: 42 },
  { nome: "Luca Bianchi", punteggio: 36 },
];

export default function AdminPage() {
  const [eventi, setEventi] = useState([]);
  const [nuovoEvento, setNuovoEvento] = useState({ nome: "", data: "", luogo: "" });

  const creaEvento = () => {
    if (nuovoEvento.nome && nuovoEvento.data && nuovoEvento.luogo) {
      setEventi([...eventi, { ...nuovoEvento }]);
      setNuovoEvento({ nome: "", data: "", luogo: "" });
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>Area Admin</h1>

      <h2>Classifica Generale</h2>
      <ul>
        {utentiFake.map((u, i) => (
          <li key={i}>
            {u.nome} – {u.punteggio} pt
            <button style={{ marginLeft: 10 }}>Visualizza</button>
            <button style={{ marginLeft: 5 }}>Modifica punteggio</button>
          </li>
        ))}
      </ul>

      <h2>Crea Nuovo Evento</h2>
      <input placeholder="Nome Evento" value={nuovoEvento.nome} onChange={(e) => setNuovoEvento({ ...nuovoEvento, nome: e.target.value })} />
      <input placeholder="Data (es. 25.04.2025)" value={nuovoEvento.data} onChange={(e) => setNuovoEvento({ ...nuovoEvento, data: e.target.value })} />
      <input placeholder="Luogo (es. Giugliano (NA))" value={nuovoEvento.luogo} onChange={(e) => setNuovoEvento({ ...nuovoEvento, luogo: e.target.value })} />
      <button onClick={creaEvento}>Crea Evento</button>

      <h2>Eventi Creati</h2>
      {eventi.map((ev, idx) => (
        <button key={idx} style={{ display: "block", margin: "10px 0", padding: 10 }}>
          <strong>{ev.nome}</strong><br />
          <small>{ev.luogo} | {ev.data}</small>
        </button>
      ))}
    </div>
  );
}
