import { initializeApp } from 'firebase/app'
import { collection, getDoc, getDocs, getFirestore, orderBy, query } from 'firebase/firestore/lite'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import firebaseConfig from '../firebase-config'

function ShowMembers() {
    const config = firebaseConfig
    const app = initializeApp(config)
    const db = getFirestore(app)

    const membersUrl = collection(db, 'users')

    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)

    const getMembers = async () => {
        const membersQuery = query(membersUrl, orderBy('id', 'desc'))
        const members = await getDocs(membersQuery)
        members.forEach(member => {
            setMembers(members => [...members, member.data()])
        })
    }

    useEffect(() => {
        getMembers()
        setLoading(false)
    }, [])

    if(loading) return <h2>Loading...</h2>
    return (
        <>
            <h2>Members</h2>
            <hr></hr>
            {
                members.map(member => {
                    return (
                        <>
                            <Card style={{ width: '100px', display: 'inline-block', marginLeft: '10px' }}>
                                <Card.Img variant='top' src='https://placehold.co/30x30' />
                                <Card.Body>
                                    <Link to={'/user/'+member.id+'/'+member.username}>
                                        <Card.Title style={{ textAlign: 'center' }}>
                                            {member.username}
                                        </Card.Title>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })
            }
        </>
    )
}

export default ShowMembers