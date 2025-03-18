// api/new-meetup
import { MongoClient } from "mongodb"


async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body

        const client = await MongoClient.connect('mongodb+srv://chouhanakansha09:thVfgKSeS8Mmxir5@cluster0.n3x7w.mongodb.net/?retryWrites=true&w=majority&appName=meetups')
        const db = client.db()

        const meetupsCollection = db.collection('meetups')
        const result =  await meetupsCollection.insertOne(data)  
        console.log(result)

        await client.close()
        res.status(201).json({ message: 'meetup unserted!'})
    }
}

export default handler