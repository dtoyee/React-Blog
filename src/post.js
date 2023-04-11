import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, query } from 'firebase/firestore/lite'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import CategoryList from './components/category-list'
import LatestPosts from './components/latest-posts'
import Menu from './components/navbar'
import firebaseConfig from './firebase-config'

function Post() {
    const config = firebaseConfig
    const app = initializeApp(config)
    const db = getFirestore(app)

    const postsUrl = collection(db, 'blog-posts')
    const cateogyrUrl = collection(db, 'categories')

    const { id } = useParams()
    const [blogPost, setBlogPost] = useState([])
    const [categoryID, setCategoryID] = useState([])
    const [loading, setLoading] = useState(true)

    const findBlogPost = async () => {
        // Where statement not working, workaround if statement in place
        const postQuery = query(postsUrl)
        const postSnapshot = await getDocs(postQuery)
        postSnapshot.forEach((post) => {
            if(post.data().id == id) {
                setBlogPost(blogPost => [...blogPost, post.data()])
            }
        })
    }

    const getCategoryID = async () => {
        const idSnapShot = await getDocs(cateogyrUrl)
        idSnapShot.forEach((id) => {
            setCategoryID(categoryID => [...categoryID, id.data()])
        })
    }

    useEffect(() => {
        findBlogPost()
        getCategoryID()
        setLoading(false)
    }, [])

    if(loading) return <h2>Loading...</h2>

    return(
        <>
            <Menu />
            <Container style={{marginTop:'25px'}}>
                
                <Row>
                    <Col xs={9}>
                        {
                            blogPost.map(post => {
                                return (
                                    <>
                                        <h2 key={post.title}>{post.title}</h2>
                                        <small key={post.author}>
                                            Post by {post.author} in category 
                                            {
                                                categoryID.map(category => {
                                                    if(post.category_id == category.id) return <><Link to={'/category/'+category.id+'/'+category.name}> {category.name}</Link></>
                                                })
                                            }
                                        </small>
                                        <p key={post.body}>
                                            {post.body}
                                        </p>
                                    </>
                                )
                            })
                        }
                    </Col>
                    <Col xs={3}>
                        <CategoryList />
                        <LatestPosts />
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Post