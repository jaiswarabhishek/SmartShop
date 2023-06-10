import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import user from '../assets/user.png'


function ReviewCard({ review }) {
  return (
    
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <h3 className="text-lg font-semibold flex ">
<img src={user} className='block w-[15%] max-w-[15%]' alt="" />
  <h3 className='my-auto mx-2'>{review.name}</h3> 
      </h3>

      <p className="text-gray-500 mb-1">
      <StarRatingComponent
                 edit="false"
                 color= "gray"
                 activeColor= "yellow"
                 size= "window.innerWidth < 768 ? 20 : 30"
                 value= {review.rating}
                 isHalf= "true"
    />

      </p>
      <p className="text-gray-700">
        {review.comment}

      </p>
    </div>
  
  )
}

export default ReviewCard
