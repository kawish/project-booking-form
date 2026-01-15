import './App.css';
import { Link } from 'react-router-dom';
import MainMenu from "./MainMenu";

function App() {
  return (
    <div className="page">
      {/* HEADER / LOGO */}
      <header className="site-header">
        <div className="brand">
          <img className="brand__mark" src="/assets/Asset 14@4x.png" alt="Little Lemon logo" />
        </div>
      </header>

      {/* NAVIGATION */}
      <MainMenu />

      {/* HERO OFFER */}
      <section className="hero">
        <img
          className="hero__img"
          src="https://images.unsplash.com/photo-1516100882582-96c3a05fe590?q=80&w=1600&auto=format&fit=crop"
          alt="Fresh food on a table"
          loading="eager"
        />
        <div className="hero__overlay">
          <h2 className="hero__title">Welcome to Little Lemon</h2>
          <p className="hero__text">
            Experience the vibrant flavors of the Mediterranean at Little Lemon. Enjoy fresh, locally sourced ingredients, delicious seasonal dishes, and a warm, welcoming atmosphere perfect for family and friends. Discover our chef’s specialties and make every meal a memorable occasion.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <main className="cards">
        {/* Card 1 */}
        <article className="card">
          <h3 className="card__heading">Our New Menu</h3>
          <img
            className="card__img"
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
            alt="Grilled skewers on a barbecue"
            loading="lazy"
          />
          <p>
            Explore our exciting new menu, featuring chef-inspired Mediterranean dishes made with the freshest ingredients. From vibrant salads to savory grilled specialties, there’s something delicious for everyone to enjoy at Little Lemon.
          </p>
          <p><a className="text-link" href="/menu">See our new menu</a></p>
        </article>

        {/* Card 2 */}
        <article className="card">
          <h3 className="card__heading">Book a table</h3>
          <img
            className="card__img"
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
            alt="Grilled skewers on a barbecue"
            loading="lazy"
          />
          <p>
            Reserve your table with ease and enjoy a delightful dining experience at Little Lemon. Whether it’s a family gathering, a special celebration, or a casual meal, our team is ready to welcome you with friendly service and delicious food.
          </p>
          <p><Link className="text-link" to="/book">Book your table now</Link></p>
        </article>

        {/* Card 3 */}
        <article className="card">
          <h3 className="card__heading">Opening Hours</h3>
          <img
            className="card__img"
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop"
            alt="Chef preparing dishes in a kitchen"
            loading="lazy"
          />
          <ul className="hours">
            <li><strong>Mon – Fri:</strong> 2pm – 10pm</li>
            <li><strong>Sat:</strong> 2pm – 11pm</li>
            <li><strong>Sun:</strong> 2pm – 9pm</li>
          </ul>
        </article>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer__mark">
          <img src="/assets/Asset 18@4x.png" alt="Little Lemon mini logo" />
        </div>
        <div className="footer__rule"></div>
        <small className="footer__copy">Copyright Little Lemon</small>
      </footer>
    </div>
  );
}

export default App;
