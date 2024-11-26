import React from 'react';
import { FaChevronDown } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";

const reviews = [
  {
    id: 1,
    rating: 4.5,
    title: "Perfectly Refreshing and Guilt-Free!",
    content: "I absolutely love this healthy juice! The natural sweetness from the fruit shines through without any artificial additives or sugar. It's refreshing and light, making it my go-to drink after workouts. Knowing it's 100% natural gives me peace of mind about what I'm putting into my body. Highly recommend it for anyone looking for a healthy alternative to sugary drinks!",
    isVerified: true
  },
  {
    id: 2,
    rating: 4.5,
    title: "A Taste of Pure Nature!",
    content: "This juice tastes like it's straight from the orchard! I'm amazed at how flavorful it is without any added sugar. It's a great option for someone like me who's trying to cut down on processed sugars but still craves something delicious. The packaging is convenient too—perfect for on-the-go. I'll definitely be ordering more!",
    isVerified: true
  },
  {
    id: 3,
    rating: 4.5,
    title: "Great Juice, But Pricey!",
    content: "I appreciate the effort to keep this juice all-natural and sugar-free. The taste is fantastic—fresh and vibrant, just like fruit should be! However, I find it a bit expensive compared to other options on the market. That said, the quality is worth it if you're looking for a truly healthy and delicious juice.",
    isVerified: true
  },
]

export default function ReviewSection() {

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalf key="half-star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar
          key={`empty-star-${i}`}
          className="w-4 h-4 text-gray-300"
        />
      )
    }

    return stars
  }

  const ReviewCard = ({ review }) => (
    <div className="flex flex-col gap-2 p-4 border-b last:border-b-0">
      <div className="flex gap-1">{renderStars(review.rating)}</div>
      <h3 className="font-bold text-lg">{review.title}</h3>
      <p className="text-gray-600 text-sm font-light">{review.content}</p>
      {review.isVerified && (
        <span className="text-gray-500 text-sm">Verified Buyer</span>
      )}
    </div>
  )

  return (
    <div className="w-full container mx-auto bg-white mt-3">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">
          Reviews <span className="text-gray-500">({reviews.length})</span>
        </h2>
        {/* <FaChevronDown className="w-6 h-6 text-gray-400" /> */}
      </div>

      <div className='overflow-auto h-[450px]'>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )

}