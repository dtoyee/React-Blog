import { Col, Container, Row } from 'react-bootstrap'
import CategoryList from './components/category-list'
import LatestPosts from './components/latest-posts'
import Menu from './components/navbar'
import PostForm from './components/post-form'

function NewPost() {
    
    return(
        <>
            <Menu />
            <Container style={{marginTop:'25px'}}>
                <Row>
                    <Col xs={9}>
                        <h2>New Post</h2>
                        <hr></hr>
                        <PostForm />
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

export default NewPost