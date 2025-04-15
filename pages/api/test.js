import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collections = await db.listCollections().toArray();
    res.status(200).json(collections);
  } catch (e) {
    res.status(500).json({ error: "Errore di connessione al database" });
  }
}