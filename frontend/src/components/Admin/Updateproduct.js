import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateProduct, clearErrors,getProductDetails } from '../../actions/productAction'
import {useAlert} from 'react-alert'
import MetaData from '../Layout/MetaData'
import { useState,useEffect } from 'react'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstant'
import { useNavigate } from 'react-router-dom'



function Updateproduct() {

    const {id} = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, product } = useSelector(state => state.productDetails)
    const { error: updateError, isUpdated } = useSelector(state => state.productUpdate)

     const [name,setName] = useState( '')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [quantity, setQuantity ] = useState('')
    const [image,setImage] = useState([])
    const [imagesPreview,setImagesPreview] = useState([])

    console.log("IsUpdated",isUpdated)

    useEffect(() => {

        if(product && product._id !== id){
            dispatch(getProductDetails(id))
        }else{
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setQuantity(product.quantity)
            setImage(product.images)
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())

        }

        if(updateError){
            alert.error(updateError)

            dispatch(clearErrors())
        }

        if(isUpdated){
            alert.success('Product Updated Successfully')
            navigate('/admin/products')
            dispatch({type:UPDATE_PRODUCT_RESET})
        }

    }, [dispatch,alert,error,isUpdated,updateError,product,id, navigate])

   


    const updateProductSubmitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('name',name)
        formData.set('price',price)
        formData.set('description',description)
        formData.set('category',category)
        formData.set('quantity',quantity)

        image.forEach(image => {
            formData.append('image',image)

        })

        dispatch(updateProduct(id,formData))

    }

    const createProductImageChangeHandler = (e) => {
        const files = Array.from(e.target.files)
        setImage([])
        setImagesPreview([])
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if(reader.readyState === 2){
                    setImage(prevState => [...prevState,reader.result])
                    setImagesPreview(prevState => [...prevState,reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }


  return (<>

    <MetaData title={'Update Product'} />
    <div className='flex '>
      <Sidebar />

      <div className=' w-full p-5'>

      {/* Create New Product */}

      <h1
      className='text-2xl ml-[5em] font-semibold text-gray-600 my-4 text-center'
      >
        Update Product
      </h1>

      <div
      className='flex justify-center items-center'
      >



<form
onSubmit={updateProductSubmitHandler}
class="w-full max-w-sm mt-10">
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
       Name
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text"
      placeholder='Product Name'
        value={name}
        onChange={(e) => setName(e.target.value)}

      />
    </div>
  </div> 
  
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
       Price
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" 
        type="number"
        placeholder='Price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      
      />
    </div>
  </div> 
  
  
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
         Description
      </label>
    </div>
    <div class="md:w-2/3">
     
        <textarea
        className='w-full p-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500  '
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        >

        </textarea>

    </div>
  </div>

  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            Category
      </label>
    </div>
    <div class="md:w-2/3">

        <select
        className='w-full p-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500  '
        placeholder='Category'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        >

        <option value='Electronics'>Electronics</option>
        <option value='Cameras'>Cameras</option>
        <option value='Laptop'>Laptop</option>
        <option value='Accessories'>Accessories</option>
        <option value='Headphones'>Headphones</option>
        <option value='Food'>Food</option>
        <option value='Books'>Books</option>
        <option value='Clothes/Shoes'>Clothes/Shoes</option>
        <option value='Beauty/Health'>Beauty/Health</option>
        <option value='Sports'>Sports</option>
        <option value='Outdoor'>Outdoor</option>
        <option value='Home'>Home</option>
        </select>


      
    </div>
  </div> 

  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
       Quantity
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" 
        type="number"
        placeholder='Quantity'
        value={ quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </div>
  </div> 

  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
         Images
      </label>
    </div>
    <div class="md:w-2/3">
     
        <input
        className='w-full p-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500  '
        type='file'
        placeholder='Image'
        name='avatar'
        accept='image/*'
        multiple
        onChange={createProductImageChangeHandler}
        
        >

        </input>
    </div>
  </div> 


  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">

      <button class=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    
      type="submit"
      disabled={loading? true : false}
      >
       Submit
      </button>
    </div>
  </div>
</form>


</div>


      </div>

      </div>

     
    </>
  )
}

export default Updateproduct
