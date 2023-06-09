import { Col, Container, Row } from 'react-bootstrap'
import Menu from './components/navbar'
import CategoryList from './components/category-list'
import LatestPosts from './components/latest-posts'
import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore/lite'
import firebaseConfig from './firebase-config'
import BlogPosts from './components/all-blog-posts'

function Home() {
    const config = firebaseConfig
    const app = initializeApp(config)
    const db = getFirestore(app)

    return (
        <>
            <Menu />
            <Container style={{marginTop:'25px'}}>
                
                <Row>
                    <Col xs={9}>
                        <BlogPosts />
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

export default Home