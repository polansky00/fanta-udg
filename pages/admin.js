import { useState } from "react";

export default function AdminPage() {
  const [utenti, setUtenti] = useState([
    { nome: "Mario Rossi", punteggio: 42 },
    { nome: "Luca Bianchi", punteggio: 36 },
  ]);
  const [eventi, setEventi] = useState([]);
  const [nuovoEvento, setNuovoEvento] = useState({ nome: "", data: "", luogo: "" });

  const creaEvento = () => {
    if (nuovoEvento.nome && nuovoEvento.data && nuovoEvento.luogo) {
      setEventi([...eventi, { ...nuovoEvento }]);
      setNuovoEvento({ nome: "", data: "", luogo: "" });
    }
  };

  const eliminaEvento = (index) => {
    const nuoviEventi = [...eventi];
    nuoviEventi.splice(index, 1);
    setEventi(nuoviEventi);
  };

  const eliminaUtente = (index) => {
    const nuoviUtenti = [...utenti];
    nuoviUtenti.splice(index, 1);
    setUtenti(nuoviUtenti);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>Area Admin</h1>

      <h2>Classifica Generale</h2>
      <ul>
        {utenti.map((u, i) => (
          <li key={i}>
            {u.nome} – {u.punteggio} pt
            <button style={{ marginLeft: 10 }}>Visualizza</button>
            <button style={{ marginLeft: 5 }}>Modifica punteggio</button>
            <button style={{ marginLeft: 5 }} onClick={() => eliminaUtente(i)}>❌</button>
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
        <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <button style={{ padding: 10, flex: 1 }}>
            <strong>{ev.nome}</strong><br />
            <small>{ev.luogo} | {ev.data}</small>
          </button>
          <button onClick={() => eliminaEvento(idx)} style={{ marginLeft: 10 }}>❌</button>
        </div>
      ))}
    </div>
  );
}
