
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("fanta_udg");
    const existing = await db.collection("users").findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Utente già registrato." });
    }

    await db.collection("users").insertOne({
      name,
      email,
      password,
      points: 0,
      deleted: false,
      isAdmin: false,
    });

    return res.status(200).json({ message: "Registrazione completata" });
  } catch (error) {
    return res.status(500).json({ message: "Errore nel salvataggio", error });
  }
}
