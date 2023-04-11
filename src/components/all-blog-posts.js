import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore/lite'
import firebaseConfig from '../firebase-config'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BlogPosts() {
    const config = firebaseConfig
    const app = initializeApp(config)
    const db = getFirestore(app)

    const postsUrl = collection(db, 'blog-posts')
    const cateogyrUrl = collection(db, 'categories')

    const [blogPosts, setBlogPosts] = useState([])
    const [categoryID, setCategoryID] = useState([])
    let [loading, setLoading] = useState(true)

    const getBlogPosts = async () => {
        const postQuery = query(postsUrl, orderBy('created', 'desc'))
        const postSnapShot = await getDocs(postQuery)
        postSnapShot.forEach((post) => {
            setBlogPosts(blogPosts => [...blogPosts, post.data()])
        })
    }
    const getCategoryID = async () => {
        const idSnapShot = await getDocs(cateogyrUrl)
        idSnapShot.forEach((id) => {
            setCategoryID(categoryID => [...categoryID, id.data()])
        })
    }

    useEffect(() => {
        getBlogPosts()
        getCategoryID()
        setLoading(false)
    }, [])
    if(loading) return <h2>Loading...</h2>
    return (
        blogPosts.map(post => {
            return (
                <>
                    <Link to={'/post/'+post.id+'/'+post.title.replace(/ /g, '-')}><h2 key={post.id}>{post.title}</h2></Link>
                    <small>Posted by {post.author} in category  
                        {
                            categoryID.map(category => {
                                if(post.category_id == category.id) return <><Link to={'/category/'+category.id+'/'+category.name}> {category.name}</Link></>
                            })
                        }
                    </small>
                    <p>{(post.body.length >= 100) ? post.body.slice(0, 100)+'...' : post.body}</p>
                    {(post.body.length >= 100) ? <Link className="btn btn-warning" role="button" to={'/post/'+post.id+'/'+post.title.replace(/ /g, '-')}>Read More</Link> : ''}
                </>
            )
        })
    )
}

export default BlogPosts