import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import FormField from '../components/ui/FormField'
import { inputClass } from '../components/ui/formStyles'
import PageHeader from '../components/ui/PageHeader'
import { siteConfig } from '../config/site'
import { contactTopics, parseContactTopic } from '../data/contactTopics'
import type { ContactTopic } from '../data/contactTopics'
import { sendContactMessage } from '../services/contactService'
import { EMAIL_PATTERN } from '../utils/validation'

const contactDetails = [
  {
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: 'Phone',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
    icon: Phone,
  },
  { label: 'Address', value: siteConfig.address, icon: MapPin },
  { label: 'Opening hours', value: siteConfig.hours, icon: Clock },
]

interface ContactFormValues {
  name: string
  email: string
  topic: ContactTopic
  message: string
}

interface ContactFormProps {
  initialTopic: ContactTopic
  initialMessage: string
}

type SubmitStatus = 'idle' | 'success' | 'error'

function ContactForm({ initialTopic, initialMessage }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      topic: initialTopic,
      message: initialMessage,
    },
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const describe = (name: keyof ContactFormValues) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  })

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('idle')

    try {
      await sendContactMessage({
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      })
      reset({ name: '', email: '', topic: 'general', message: '' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="contact-name"
          label="Your name"
          error={errors.name?.message}
        >
          <input
            id="contact-name"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            {...describe('name')}
            {...register('name', { required: 'Enter your name' })}
          />
        </FormField>

        <FormField
          id="contact-email"
          label="Email address"
          error={errors.email?.message}
        >
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            {...describe('email')}
            {...register('email', {
              required: 'Enter your email address',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Enter a valid email address',
              },
            })}
          />
        </FormField>
      </div>

      <FormField id="contact-topic" label="Topic">
        <select
          id="contact-topic"
          className={inputClass()}
          {...register('topic')}
        >
          {contactTopics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="contact-message"
        label="Message"
        error={errors.message?.message}
      >
        <textarea
          id="contact-message"
          rows={6}
          className={`${inputClass(!!errors.message)} resize-y`}
          {...describe('message')}
          {...register('message', {
            required: 'Write your message',
            minLength: {
              value: 10,
              message: 'Write at least 10 characters',
            },
          })}
        />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>

      <p role="status" className="min-h-5 text-sm font-medium text-primary">
        {status === 'success'
          ? 'Thank you! Your message has been received.'
          : ''}
      </p>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600">
          We could not send your message. Please try again.
        </p>
      )}
    </form>
  )
}

function ContactPage() {
  const [searchParams] = useSearchParams()

  const topic = parseContactTopic(searchParams.get('topic'))
  const product = searchParams.get('product')?.slice(0, 100)

  const initialMessage =
    topic === 'bulk'
      ? `I would like to place a bulk order${product ? ` for ${product}` : ''}. Quantity needed: `
      : ''

  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Questions, bulk orders or feedback? Send us a message and we will get back to you."
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-8">
        <div>
          <h2 className="text-xl font-extrabold">Get in touch</h2>

          <ul className="mt-6 space-y-5">
            {contactDetails.map(({ label, value, href, icon: Icon }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-primary">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="text-sm">
                  <p className="font-semibold">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-ink/70 transition-colors hover:text-primary"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-ink/70">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-extrabold">Send us a message</h2>
          <div className="mt-6">
            {/* The key resets the form when the link's topic or product changes */}
            <ContactForm
              key={searchParams.toString()}
              initialTopic={topic}
              initialMessage={initialMessage}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage