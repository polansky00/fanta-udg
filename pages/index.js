import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Fanta UDG con MongoDB</h1>
      <p>
        Vai a <Link href="/api/test">/api/test</Link> per vedere eventi dal DB
      </p>
    </div>
  );
}
