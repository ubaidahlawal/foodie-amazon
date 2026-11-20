import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Star } from 'lucide-react'
import type { NewReview, StarValue } from '../../types/review'
import FormField from '../ui/FormField'
import { inputClass } from '../ui/formStyles'

interface ReviewFormValues {
  rating: string
  author: string
  title: string
  body: string
}

interface ReviewFormProps {
  onSubmit: (review: NewReview) => void
}

type SubmitStatus = 'idle' | 'success' | 'error'

const STAR_VALUES = [1, 2, 3, 4, 5] as const

const defaultValues: ReviewFormValues = {
  rating: '',
  author: '',
  title: '',
  body: '',
}

function ReviewForm({ onSubmit }: ReviewFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({ mode: 'onTouched', defaultValues })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const selectedRating = Number(watch('rating'))

  const describe = (name: keyof ReviewFormValues, id: string) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-error` : undefined,
  })

  const submit = (values: ReviewFormValues) => {
    try {
      onSubmit({
        rating: Number(values.rating) as StarValue,
        author: values.author.trim(),
        title: values.title.trim(),
        body: values.body.trim(),
      })
      reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      onChange={() => setStatus('idle')}
      noValidate
      className="space-y-5"
    >
      <fieldset>
        <legend className="text-lg font-bold">How would you rate this?</legend>

        <div className="mt-3 flex gap-1">
          {STAR_VALUES.map((value) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                value={value}
                className="peer sr-only"
                aria-describedby={errors.rating ? 'rating-error' : undefined}
                {...register('rating', { required: 'Select a star rating' })}
              />
              <span className="sr-only">
                {value} {value === 1 ? 'star' : 'stars'}
              </span>
              <span className="block rounded p-0.5 peer-focus-visible:ring-2 peer-focus-visible:ring-primary">
                <Star
                  size={28}
                  aria-hidden="true"
                  className={
                    value <= selectedRating
                      ? 'fill-accent text-accent'
                      : 'text-neutral-300'
                  }
                />
              </span>
            </label>
          ))}
        </div>

        {errors.rating && (
          <p id="rating-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.rating.message}
          </p>
        )}
      </fieldset>

      <FormField
        id="review-author"
        label="Your name"
        error={errors.author?.message}
      >
        <input
          id="review-author"
          autoComplete="name"
          className={inputClass(!!errors.author)}
          {...describe('author', 'review-author')}
          {...register('author', { required: 'Enter your name' })}
        />
      </FormField>

      <FormField
        id="review-title"
        label="Add a headline"
        error={errors.title?.message}
      >
        <input
          id="review-title"
          placeholder="Write a summary of your review"
          className={inputClass(!!errors.title)}
          {...describe('title', 'review-title')}
          {...register('title', { required: 'Add a short headline' })}
        />
      </FormField>

      <FormField
        id="review-body"
        label="Write a review"
        error={errors.body?.message}
      >
        <textarea
          id="review-body"
          rows={5}
          placeholder="Tell us what you think"
          className={`${inputClass(!!errors.body)} resize-y`}
          {...describe('body', 'review-body')}
          {...register('body', {
            required: 'Write your review',
            minLength: {
              value: 10,
              message: 'Write at least 10 characters',
            },
          })}
        />
      </FormField>

      <button
        type="submit"
        className="rounded-md bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Submit Review
      </button>

      <p role="status" className="min-h-5 text-sm font-medium text-primary">
        {status === 'success' ? 'Thank you! Your review has been added.' : ''}
      </p>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600">
          We could not save your review. Please try again.
        </p>
      )}
    </form>
  )
}

export default ReviewForm