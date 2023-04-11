import ListGroup from 'react-bootstrap/ListGroup'
import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite'
import firebaseConfig from '../firebase-config'
import { useEffect, useState } from 'react'

function CategoryList() {
    const config = firebaseConfig
    const app = initializeApp(config)
    const db = getFirestore(app)
    const categoryRef = collection(db, 'categories')

    const [categories, setCategories] = useState([])
    let [loading, setLoading] = useState(true)

    const getCategoryList = async () => {
        const catSnap = await getDocs(categoryRef)
        catSnap.forEach((cat) => {
            setCategories(categories => [...categories, cat.data()])
        })
    }

    useEffect(() => {
        getCategoryList()
        setLoading(false)
    }, [])
    if(loading) return <h2>Loading...</h2>
    return (
        <>
            <h2>Categories</h2>
            <ListGroup>
                {
                    categories.map(category => {
                        return (
                            <ListGroup.Item action href={'/category/'+category.id+'/'+category.name} key={category.id}>
                                {category.name}
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </>
    )
}

export default CategoryList