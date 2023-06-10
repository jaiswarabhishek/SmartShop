import React from 'react'
import { Link } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'

// const options = {
//     edit: false,
//     color: "gray",
//     activeColor: "yellow",
//     size: window.innerWidth < 768 ? 20 : 30,
//     value: 3.5,
//     isHalf: true,
    
// }



function Product({id,name,price,image,rating,reviewsCount,ratings}) {
  
  return (
    <Link to={`/product/${id} `} >
        
    <div key={id} className="bg-white h-full min-height: 20em   rounded-lg shadow-lg  overflow-hidden hover:scale-105 transition-transform duration-300">

              <img src={image[0].url} alt={name} className="block mx-auto md:w-[45%] w-[40%]  object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{name}</h3>
                <StarRatingComponent
                 edit="false"
                 color= "gray"
                 activeColor= "yellow"
                 size= "window.innerWidth < 768 ? 20 : 30"
                 value= {ratings}
                 isHalf= "true"
                />
                {/* number of reviews */}
                <p className="text-gray-600 mb-1">{reviewsCount} reviews</p>
                <p className="text-gray-600">${price.toFixed(2)}</p>
              </div>
              
              
      </div>
    </Link>
  )
}

export default Product
