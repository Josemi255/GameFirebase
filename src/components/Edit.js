import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = () => {
    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ genre, setGenre ] = useState('')
    const [ platform, setPlatform ] = useState('')
    const [ publisher, setPublisher ] = useState('')
    const [ stock, setStock ] = useState(0)

    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, "products", id)
        const data = {name: name, price: price, genre: genre, platform: platform, publisher: publisher, stock: stock}
        await updateDoc(product, data)
        navigate('/')
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "products", id) )
        if(product.exists()) {
            //console.log(product.data())
            setName(product.data().name)    
            setPrice(product.data().price)
            setGenre(product.data().genre)    
            setPlatform(product.data().platform)
            setPublisher(product.data().publisher)    
            setStock(product.data().stock)
        }else{
            console.log('El producto no existe')
        }
    }

    useEffect( () => {
        getProductById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar Producto</h1>
                 <form onSubmit={update}>
                 <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={name}
                            onChange={ (e) => setName(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Precio</label>
                        <input
                            value={price}
                            onChange={ (e) => setPrice(e.target.value)} 
                            type="number"
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Género</label>
                        <input
                            value={genre}
                            onChange={ (e) => setGenre(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Plataforma</label>
                        <input
                            value={platform}
                            onChange={ (e) => setPlatform(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Publisher</label>
                        <input
                            value={publisher}
                            onChange={ (e) => setPublisher(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Stock</label>
                        <input
                            value={stock}
                            onChange={ (e)=> setStock(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>
                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                 </form>   
            </div>
        </div>
    </div> 
    )
}

export default Edit