import { useParams } from "react-router-dom"
import { Col, Container, Row } from 'react-bootstrap'
import CategoryList from './components/category-list'
import LatestPosts from './components/latest-posts'
import Menu from './components/navbar'

function Profile() {
    const { id, username } = useParams()
    return(
        <>
            <Menu />
            <Container style={{marginTop:'25px'}}>
                <Row>
                    <Col xs={9}>
                        <h2>{username}</h2>
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

export default Profile