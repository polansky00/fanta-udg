import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("fantaudg");
  const events = await db.collection("events").find().toArray();
  res.status(200).json(events);
}
