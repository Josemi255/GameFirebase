import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {
  //1 - configuramos los hooks
  const [products, setProducts] = useState( [] )

  //2 - referenciamos a la DB firestore
  const productsCollection = collection(db, "products")

  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async ()   => {
   const data = await getDocs(productsCollection)
   //console.log(data.docs)
   setProducts(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   //console.log(products)
  }
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
   const productDoc = doc(db, "products", id)
   await deleteDoc(productDoc)
   getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Eliminar el Producto?',
      text: "¡No Podrás Revertir Esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Bórralo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la funcion para eliminar   
        deleteProduct(id)               
        Swal.fire(
          '¡Eliminado!',
          'Tu Producto ha Sido liminado',
          'success'
        )
      }
    })    
  }
  //6 - usamos useEffect
  useEffect( () => {
    getProducts()
    // eslint-disable-next-line
  }, [] )
  //7 - devolvemos vista de nuestro componente
  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Crear Producto</Link>    
          </div>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Género</th>
                <th>Plataforma</th>
                <th>Publisher</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              { products.map( (product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.genre}</td>
                  <td>{product.platform}</td>
                  <td>{product.publisher}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={ () => { confirmDelete(product.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default Show