import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, query } from 'firebase/firestore/lite'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import CategoryList from './components/category-list'
import LatestPosts from './components/latest-posts'
import Menu from './components/navbar'
import firebaseConfig from './firebase-config'

function Category() {
    const config = firebaseConfig
    const app = initializeApp(config)
    const db = getFirestore(app)

    const postsUrl = collection(db, 'blog-posts')

    const { id, name } = useParams()
    const [blogPost, setBlogPost] = useState([])
    const [loading, setLoading] = useState(true)

    const findBlogPosts = async () => {
        const posts = await getDocs(postsUrl)
        posts.forEach(post => {
            if(post.data().category_id == id) {
                setBlogPost(blogPost => [...blogPost, post.data()])
            }
        })
    }

    useEffect(() => {
        findBlogPosts()
        setLoading(false)
    }, [])

    if(loading) return <h2>Loading...</h2>

    return(
        <>
            <Menu />
            <Container style={{marginTop:'25px'}}>
                
                <Row>
                    <Col xs={9}>
                        <h2>{name}</h2>
                        <hr></hr>
                        {
                            blogPost.map(post => {
                                return (
                                    <>
                                        <Link to={'/post/'+post.id+'/'+post.title.replace(/ /g, '-')}><h2 key={post.title}>{post.title}</h2></Link>
                                        <small key={post.author}>
                                            Post by {post.author} in category 
                                            {
                                                <Link to={'/category/'+id+'/'+name}> {name}</Link>
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

export default Category