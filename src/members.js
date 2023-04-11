import { Col, Container, Row } from 'react-bootstrap'
import CategoryList from './components/category-list'
import LatestPosts from './components/latest-posts'
import Menu from './components/navbar'
import ShowMembers from './components/all-members'

function Members() {
    return(
        <>
            <Menu />
            <Container style={{marginTop:'25px'}}>
                <Row>
                    <Col xs={9}>
                        <ShowMembers />
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

export default Members