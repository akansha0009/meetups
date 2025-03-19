import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from "../../components/meetups/MeetupDetail"
import { Fragment } from 'react'
import Head from 'next/head'

function MeetupDetailsPage(props){
    return (
        <Fragment>
            <Head>
            <title>Add a New Meetup</title>
            <meta name='description' content='Add your own meet up and create your amazing network.' />
            </Head>
            <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
        </Fragment>
    )
}

export async function getStaticPaths(){
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray()

    return {
        fallback: false,
        paths: meetups.map(meetup => ({ 
            params: {meetupId: meetup._id.toString()} 
        })) 
    }
}

export async function getStaticProps(context){
    const meetupId =  context.params.meetupId
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),
    })

    console.log(meetupId)
    return {
        props: {
            meetupData : {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                description: selectedMeetup.description,
                address: selectedMeetup.address,
                image: selectedMeetup.image
            }
        }
    }
}

export default MeetupDetailsPage