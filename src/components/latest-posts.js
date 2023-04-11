import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore/lite'
import { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import firebaseConfig from '../firebase-config'

function LatestPosts() {
    const config = firebaseConfig
    const app = initializeApp(config)
    const db = getFirestore(app)

    const postsUrl = collection(db, 'blog-posts')

    const [loading, setLoading] = useState(true)
    const [latestPosts, setLatestPosts] = useState([])

    const getLatestPosts = async () => {
        const postQuery = query(postsUrl, orderBy('created', 'desc'), limit(5))
        const posts = await getDocs(postQuery)
        posts.forEach(post => {
            setLatestPosts(latestPosts => [...latestPosts, post.data()])
        })
    }

    useEffect(() => {
        getLatestPosts()
        setLoading(false)
    }, [])

    if(loading) return <h2>Loading...</h2>

    return (
        <>
            <h2 style={{marginTop:'25px'}}>Latest Posts</h2>
            <ListGroup>
                {
                    latestPosts.map(post => {
                        return (
                            <ListGroup.Item action href={'/post/'+post.id+'/'+post.title.replace(/ /g, '-')} key={post.id}>
                                {(post.title.length >= 30) ? post.title + '...' : post.title}
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </>
    )
}

export default LatestPosts