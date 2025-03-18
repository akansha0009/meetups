import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head'

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'My First meet up',
//     image: 'https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-taj-mahal.jpg',
//     address: 'Some Address',
//     description: 'This is the first meet up'
//   },
//   {
//     id: 'm2',
//     title: 'My First meet up',
//     image: 'https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-taj-mahal.jpg',
//     address: 'Some Address',
//     description: 'This is the first meet up'
//   },
//   {
//     id: 'm3',
//     title: 'My First meet up',
//     image: 'https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-taj-mahal.jpg',
//     address: 'Some Address',
//     description: 'This is the first meet up'
//   },
//   {
//     id: 'm4',
//     title: 'My First meet up',
//     image: 'https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-taj-mahal.jpg',
//     address: 'Some Address',
//     description: 'This is the first meet up'
//   }

// ]

function HomePage(props){
  return <>
    <Head>
      <title>React Meetups</title>
      <meta name='description' content='Browse a huge list of highly active React meetups' />
    </Head>
    <MeetupList meetups={props.meetups} />
  </>
}

// export async function getServerSideProps(context){
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps(){
  const client = await MongoClient.connect('mongodb+srv://chouhanakansha09:thVfgKSeS8Mmxir5@cluster0.n3x7w.mongodb.net/?retryWrites=true&w=majority&appName=meetups')
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find().toArray()
  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title:meetup.title,
        image:meetup.image,
        address:meetup.address,
        id:meetup._id.toString()
      }))
    },
    revalidate: 1
  }
}

export default HomePage