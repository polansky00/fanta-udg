import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('fantaudg');
  const utenti = await db.collection('utenti').find({ eliminato: { $ne: true } }).toArray();
  utenti.sort((a, b) => b.punteggioTotale - a.punteggioTotale);
  res.status(200).json(utenti);
}
