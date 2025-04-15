
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    await db.collection("users").insertOne({
      name,
      email,
      password,
      role: role || "user",
      score: 0,
      deleted: false
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Errore registrazione:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
