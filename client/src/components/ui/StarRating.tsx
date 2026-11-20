import { Star } from 'lucide-react'

interface StarRatingProps {
  value: number
  size?: number
}

function StarRating({ value, size = 16 }: StarRatingProps) {
  const rounded = Math.round(value * 10) / 10

  return (
    <span
      role="img"
      aria-label={`Rated ${rounded} out of 5`}
      className="flex gap-0.5"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          aria-hidden="true"
          className={
            index < Math.round(value)
              ? 'fill-accent text-accent'
              : 'text-neutral-300'
          }
        />
      ))}
    </span>
  )
}

export default StarRating