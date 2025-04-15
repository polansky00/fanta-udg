
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("fanta_udg");

    const user = await db.collection("users").findOne({ email, password });

    if (!user || user.deleted) {
      return res.status(401).json({ message: "Credenziali errate o account eliminato" });
    }

    return res.status(200).json({
      message: "Login riuscito",
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Errore nel login", error });
  }
}
