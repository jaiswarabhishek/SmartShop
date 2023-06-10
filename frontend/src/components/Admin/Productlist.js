import React from 'react'
import Sidebar from './Sidebar'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAdminProducts, clearErrors } from '../../actions/productAction'
import {useAlert} from 'react-alert'
import MetaData from '../Layout/MetaData'
import { useState,useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../Layout/loader'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant'
import {deleteProduct} from '../../actions/productAction'
import { useParams } from 'react-router-dom'

function Productlist() {
    const {id} = useParams()

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, products } = useSelector(state => state.adminProducts)
    const { error: deleteError, isDeleted } = useSelector(state => state.product)

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }


    useEffect(() => {
        dispatch(getAdminProducts());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Product deleted successfully');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted])

    const columns = [
        {
            field: 'id', headerName: 'ID', minWidth: 200,
            headerClassName: 'text-lg font-semibold text-gray-600',
            flex: 1,
        },
        {
            field: 'name', headerName: 'Name', minWidth: 100,
            headerClassName: 'text-lg font-semibold text-gray-600',
            flex: 0.5,
        },
        {
            field: 'price', headerName: 'Price', minWidth: 150,
            headerClassName: 'text-lg font-semibold text-gray-600',
            flex: 0.5,
        },
        {
            field: 'stock', headerName: 'Stock', minWidth: 150,
            headerClassName: 'text-lg font-semibold text-gray-600',
            flex: 0.5,
        },
        {
            field: 'Actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: 0.5,
            headerClassName: 'text-lg font-semibold text-gray-600',
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.row.id}`}><EditIcon className='text-gray-600 hover:text-gray-900 cursor-pointer mx-2' /></Link>
                        <DeleteIcon
                        onClick={() => deleteProductHandler(params.row.id)}
                        className='text-gray-900 hover:text-red-500 cursor-pointer' />
                    </>
                )
            }
        },
    ];

    const rows = products?.map(product => {
        return {
            id: product._id,
            name: product.name,
            price: product.price,
            stock: product.quantity,
        }
    })






  return (<>

    <MetaData title={'All Products'}/>

    <div className='flex '>
      <Sidebar />

      <div className=' w-full p-5'>

        <h1 className='text-3xl font-medium text-center my-4'>All Products</h1>

        <div className='flex justify-center m-10'>
            {loading ? <Loader /> : (
                <DataGrid

                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                   
                    disableSelectionOnClick
                />
            )}
</div>
      </div>

      </div>
  </>)
}

export default Productlist
