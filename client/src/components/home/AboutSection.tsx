
import aboutSnacks from '../../assets/images/about-snacks.png'
import signature from '../../assets/images/signature.png'

const paragraphs = [
  'At Foodie Amazon, we believe in the power of nature to provide wholesome, delicious snacks. Our journey began with a simple mission: to bring the pure taste of nature to your doorstep. We are dedicated to creating snacks that are not only delicious but also healthy and free from artificial additives. Our major focus is on providing organic snacks that are made with the finest ingredients sourced from sustainable farms.',
  "Our commitment to quality means that you won't find any gums, preservatives, or artificial sugars in our products. Instead, we use natural sweeteners and preservatives to ensure that every bite is as healthy as it is tasty.",
]

function AboutSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-lg">
          <img
            src={aboutSnacks}
            alt="Cookies, nut mixes and snack bags from Foodie Amazon"
            loading="lazy"
            className="w-full"
          />
          <p className="mx-auto mt-6 w-fit rounded-full bg-primary px-8 py-3 font-medium text-white shadow-lg">
            100% Organic
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-extrabold uppercase leading-none sm:text-6xl lg:text-7xl">
            <span className="block text-leaf">High Quality</span>
            <span className="block text-accent">Organic Snacks</span>
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-7 text-ink/80">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <blockquote className="mt-6 border-l-2 border-primary pl-3 text-xs italic text-ink/70">
            Our vision is to become a household name in organic snacks, known
            for our commitment to quality and sustainability.
          </blockquote>

          <div className="mt-6">
            <img src={signature} alt="John Doe" className="h-10 w-auto" />
            <p className="text-xs text-ink/70">Chief Executive Officer</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection