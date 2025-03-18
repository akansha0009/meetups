import { useRouter } from 'next/navigation';
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetupPage(){
    const router = useRouter()

    const addAddMeetupHandler = async (enteredMeetupData) => {
    console.log(enteredMeetupData);
    const response = await fetch('/api/new-meetup', {
        method: "POST",
        body: JSON.stringify(enteredMeetupData),
        headers: {
            'Content-Type': 'application/json'
        } 
    });

    // Now response.json() can be awaited
    const data = await response.json();
    console.log(data, 'data');
    router.push('/')
};


    return <NewMeetupForm onAddMeetup={addAddMeetupHandler} />
}

export default NewMeetupPage