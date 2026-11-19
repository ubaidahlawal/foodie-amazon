import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '../../types/product'
import ProductCard from './ProductCard'

interface ProductCarouselProps {
  products: Product[]
}

const arrowButtonClass =
  'flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-ink transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40'

function ProductCarousel({ products }: ProductCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [progress, setProgress] = useState({ start: 0, size: 1 })

  const updateProgress = useCallback(() => {
    const track = trackRef.current
    if (!track || track.scrollWidth === 0) return

    setProgress({
      start: track.scrollLeft / track.scrollWidth,
      size: track.clientWidth / track.scrollWidth,
    })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new ResizeObserver(updateProgress)
    observer.observe(track)

    return () => observer.disconnect()
  }, [updateProgress])

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return

    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
  }

  const isAtStart = progress.start < 0.01
  const isAtEnd = progress.start + progress.size > 0.99

  return (
    <div>
      <ul
        ref={trackRef}
        onScroll={updateProgress}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [scrollbar-none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <li
            key={product.id}
            className="w-full shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center gap-4">
        <div className="relative h-0.5 flex-1 bg-neutral-200" aria-hidden="true">
          <div
            className="absolute inset-y-0 bg-ink transition-[left,width] duration-200"
            style={{
              left: `${progress.start * 100}%`,
              width: `${progress.size * 100}%`,
            }}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous products"
            className={arrowButtonClass}
            disabled={isAtStart}
            onClick={() => scrollByPage(-1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next products"
            className={arrowButtonClass}
            disabled={isAtEnd}
            onClick={() => scrollByPage(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCarousel