import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
  const [ name, setName ] = useState('')
  const [ price, setPrice ] = useState(0)
  const [ genre, setGenre ] = useState('')
  const [ platform, setPlatform ] = useState('')
  const [ publisher, setPublisher ] = useState('')
  const [ stock, setStock ] = useState(0)
  const navigate = useNavigate()

  const productsCollection = collection(db, "products")

  const store = async (e) => {
    e.preventDefault()
    await addDoc( productsCollection, { name: name, price: price, genre: genre, platform: platform, publisher: publisher, stock: stock } )
    navigate('/')
    //console.log(e.target[0].value)
  }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Crear Producto</h1>
                 <form onSubmit={store}>
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
                    <button type='submit' className='btn btn-primary'>Guardar</button>
                 </form>   
            </div>
        </div>
    </div> 
  )
}

export default Create