import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('fantaudg');

  const utenti = await db.collection('utenti').find({ eliminato: { $ne: true } }).toArray();

  for (let utente of utenti) {
    const eventi = await db.collection('punteggi').find({ userId: utente._id }).toArray();
    const punteggioTotale = eventi.reduce((tot, e) => tot + (e.punteggio || 0), 0);

    await db.collection('utenti').updateOne(
      { _id: utente._id },
      { $set: { punteggioTotale } }
    );
  }

  res.status(200).json({ status: 'classifica aggiornata' });
}
