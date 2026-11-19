import veggiesPattern from '../../assets/images/veggies-pattern.png'
import CountUp from '../ui/CountUp'
import { stats } from '../../data/home'

function StatsBar() {
  return (
    <section className="relative -mt-10 overflow-hidden rounded-t-[3rem] bg-leaf px-4 pb-20 pt-16 text-white">
      <img
        src={veggiesPattern}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <ul className="relative mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">
        {stats.map(({ value, suffix, label }) => (
          <li key={label}>
            <p className="font-heading text-4xl font-extrabold tabular-nums sm:text-5xl">
              <CountUp end={value} suffix={suffix} />
            </p>
            <p className="mt-1 text-sm">{label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default StatsBar