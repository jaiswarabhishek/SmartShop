import React from 'react'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { myOrders } from '../../actions/orderAction'
import MetaData from '../Layout/MetaData'
import Loader from '../Layout/loader'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import LaunchIcon from '@mui/icons-material/Launch';
import { Typography } from '@mui/material'
import { clearErrors } from '../../actions/userAction'


function Myorder() {

  const dispatch = useDispatch()
  const alert = useAlert()

    const { loading, error, orders } = useSelector(state => state.myOrders)
   const {isAuthenticated,user} = useSelector(state => state.user)

    const columns = [
      { 
    field: 'id', headerName: 'Order ID', minWidth: 300,
    headerClassName:'text-lg font-semibold text-gray-600',
    flex:1,
    },
      {
        field:'status',
        headerName:'Status',
        minWidth:150,
        flex:0.5,

        // Headername font size and color
        headerClassName:'text-lg font-semibold text-gray-600',

        renderCell:(params)=>{
          return(
            <Typography style={{color:params.row.status === 'Delivered' ? 'green' : 'red'}}>{params.row.status}</Typography>
          )
        }
  
      },
      {
        field:"ItemQuantity",
        headerName:"Item Quantity",
        headerClassName:'text-lg font-semibold text-gray-600',
        type:'number',
        minWidth:250,
        flex:0.3,
      },
      {
        field:"Amount",
        headerName:"Amount",
        headerClassName:'text-lg font-semibold text-gray-600',
        type:'number',
        minWidth:270,
        flex:0.5,
      },
      {
        field:"action",
        headerName:"Action",
        headerClassName:'text-lg font-semibold text-gray-600',
        minWidth:150,
        flex:0.1,
        type:'number',
        sortable:false,




        renderCell:(params)=>{
          return(
            //On Hovering over the icon it will show the link to the order and also add transition ease-in-out
            <Link     
            
            className=' hover:text-blue-600  transition duration-500 ease-in-out '

            to={`/orders/${params.row.id}`} 
            >
              <LaunchIcon />
            
            </Link>
          )
        }
        
      },
    ]


const rows = []

orders && orders.forEach(order => {
  rows.push({
    id:order._id,
    ItemQuantity:order.orderItems.length,
    status:order.orderStatus,
    Amount:order.totalPrice,
    action:<Link to={`/order/${order._id}`}><LaunchIcon /></Link>
  })
})



    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors())

      }
        dispatch(myOrders())
    }, [dispatch,error,alert])



  return (<>

    <MetaData title={'My Orders'} />

  

    { loading ? <Loader /> :
    
    <div className='flex justify-center items-center md:m-10 m-2 '>
      <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
  
      disableRowSelectionOnClick
      autoHeight



      sx={{
    marginTop: '2rem',
    marginBottom: '2rem',
    border: '1px solid #eee',
    boxShadow: '0 0 10px #eee',
    borderRadius: '10px',
    overflow: 'hidden',
    padding: '1rem',
    
    
   
  }}
/>
</div>
}


    </>)
}

export default Myorder
