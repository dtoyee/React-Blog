import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { initializeApp } from 'firebase/app'
import { addDoc, collection, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc } from 'firebase/firestore/lite'
import firebaseConfig from '../firebase-config'
import { useEffect, useRef, useState } from 'react';

function PostForm() {
    const config = firebaseConfig
    const app = initializeApp(config)
    const db = getFirestore(app)

    const postUrl = collection(db, 'blog-posts')
    const categoryUrl = collection(db, 'categories')

    const [categories, setCategories] = useState([])
    const [lastID, setLastID] = useState("")
    const [loading, setLoading] = useState(true)

    const title = useRef()
    const cat = useRef()
    const body = useRef()

    const loadCategories = async () => {
        const categoryQuery = await getDocs(categoryUrl)
        categoryQuery.forEach(category => {
            setCategories(categories => [...categories, category.data()])
        })
    }

    const getLastID = async () => {
        const idQuery = query(postUrl, orderBy('id', 'desc'), limit(1))
        const getIds = await getDocs(idQuery)
        getIds.forEach(id => {
            setLastID(id.data().id + 1)
        })
    }

    const addPost = (e) => {
        e.preventDefault()
        // Probably not the best way to do this
        if(title.current.value != "" && cat.current.value != "" && body.current.value != "") {
            addDoc(postUrl, {
                id: Number(lastID),
                title: title.current.value,
                category_id: cat.current.value,
                author: "admin",
                body: body.current.value,
                created: Date.now()
            })
        } else {
            alert("All fields are required.")
        }
    }

    useEffect(() => {
        loadCategories()
        getLastID()
        setLoading(false)
    }, [])

    if(loading) return <h2>Loading...</h2>

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" ref={title} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example">
                    {
                        categories.map(category => {
                            return (
                                <>
                                    <option value={category.id} key={category.id} ref={cat}>{category.name}</option>
                                </>
                            )
                        })
                    }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Body</Form.Label>
                <Form.Control as="textarea" rows={10} ref={body} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={addPost}>
                Submit
            </Button>
        </Form>
    )
}

export default PostForm