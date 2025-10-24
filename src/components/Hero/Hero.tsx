import './Hero.scss';

export const Hero = () => {
  return (
    <section className="Hero">
      <h1 className="Hero__title">
        <span className='Hero__title--gradient'>Simple and powerful{" "}</span>
        <span className="Hero__title--white">portfolio tracker</span>
      </h1>
      <ul className="Hero__list">
        <li className="Hero__item">All your investments in one place</li>
        <li className="Hero__item">Know your real performance</li>
        <li className="Hero__item">Automate dividend tracking</li>
      </ul>
      <div className="Hero__links">
        <a href="#!" className="Hero__link Hero__link--start">
          Get started for free
        </a>
        <a href="#!" className="Hero__link Hero__link--demo">
          Live-demo
        </a>
      </div>
      <p className="Hero__trial-info">
        14-days free trial, no credit card required
      </p>
    </section>
  )
}