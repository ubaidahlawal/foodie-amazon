import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  name: string
}

const arrowClass =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:text-primary disabled:pointer-events-none disabled:text-neutral-300'

function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const lastIndex = images.length - 1

  return (
    <div>
      <img
        src={images[activeIndex]}
        alt={`${name}, photo ${activeIndex + 1} of ${images.length}`}
        className="aspect-square w-full rounded-lg bg-neutral-100 object-cover"
      />

      {images.length > 1 && (
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous photo"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
            className={arrowClass}
          >
            <ChevronLeft size={20} />
          </button>

          <ul className="flex flex-1 gap-3 overflow-x-auto p-1">
            {images.map((image, index) => (
              <li key={`${image}-${index}`} className="w-1/4 shrink-0">
                <button
                  type="button"
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  className={`block w-full overflow-hidden rounded-md border-2 transition-colors ${
                    index === activeIndex
                      ? 'border-primary'
                      : 'border-transparent hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="aspect-square w-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label="Next photo"
            disabled={activeIndex === lastIndex}
            onClick={() => setActiveIndex(activeIndex + 1)}
            className={arrowClass}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductGallery