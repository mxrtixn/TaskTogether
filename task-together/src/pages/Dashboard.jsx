import { useEffect, useState } from 'react';
export default function Dashboard() {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        const name = localStorage.getItem("displayName");

        if (storedEmail) {
        setEmail(storedEmail);
        setDisplayName(name);
        } else {
        // Redirect to login if no data found (optional)
        window.location.href = '/login';
        }
    }, []);
    return(<h1>Hello: {displayName} - {email} </h1>);  
}