import { useRouter } from "next/router";

export default function UserPage() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>Benvenuto {name}</h1>
      <p>Questa è la tua dashboard utente su Fanta UDG.</p>
    </div>
  );
}
