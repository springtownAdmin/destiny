import React from 'react';
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
  {
    id: 4,
    rating: 4,
    title: "Exactly what I needed after a long day!",
    content: "This drink is a lifesaver. I love that it has a natural flavor without tasting overly sweet. It's refreshing and helps me feel calm and centered—like a mini meditation in a bottle. Highly recommend it!",
    isVerified: true
  },
  {
    id: 5,
    rating: 4.5,
    title: "Natural goodness in every sip.",
    content: "It's so hard to find a drink with no artificial colors or sweeteners that actually tastes good. This one nails it! The natural sweetness is perfect, and it truly helps me unwind after work. My new favorite!",
    isVerified: true
  },
  {
    id: 6,
    rating: 4.5,
    title: "A mindful moment in a can.",
    content: "This drink is amazing! It feels like a spa day for your mind. The blend of natural flavors and calming effects makes it the ultimate relaxation beverage. Plus, no artificial junk—just pure bliss!",
    isVerified: true
  },
  {
    id: 7,
    rating: 4,
    title: "A guilt-free treat for your soul.",
    content: "I'm obsessed with this drink. The natural sweeteners give it just the right touch without being overpowering. It's my go-to when I need a break and want to feel refreshed and relaxed.",
    isVerified: true
  },
  {
    id: 8,
    rating: 4.5,
    title: "The perfect drink for mindfulness.",
    content: "I was skeptical at first, but this really is like drinking your meditation. The natural ingredients make me feel good about my choice, and it actually helps me stay calm during stressful moments. Love it!",
    isVerified: true
  },
  {
    id: 9,
    rating: 4,
    title: "Finally, a healthy drink that delivers!",
    content: "I've been looking for a drink with no artificial colors or flavors, and this one exceeded my expectations. It's so soothing, and the natural sweetness is spot-on. I feel so relaxed and refreshed after drinking it.",
    isVerified: true
  },
  {
    id: 10,
    rating: 4.5,
    title: "A zen moment in every sip.",
    content: "This drink is a game-changer for my afternoons. It's like pressing pause on life for a moment of calm. The natural flavor and sweetener make it taste fantastic without any guilt. I can't get enough!",
    isVerified: true
  }
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
    <div className="gap-2 space-y-2 p-4 border-b last:border-b-0">
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
          Reviews <span className="text-gray-500">(5,705)</span>
        </h2>
        {/* <FaChevronDown className="w-6 h-6 text-gray-400" /> */}
      </div>

      <div className=''>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )

}