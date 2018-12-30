import React from "react";

import "./about.css";

const aboutListItems = [
  "Our pools are safe and secure. At PoolPays we value safety with the utmost respect.",
  "PoolPays was created with the user in mind and was set up to be simple and easy to use.",
  "We value our community and intend to grow organically through feedback and community interaction.",
  "PoolPays is intended to be a long-term player in this field and support a variety of crypto currencies."
];

export default function About() {
  return (
    <section className="section__about .inner">
      <img src={require("./screenshot.png")} alt="about__graphic" />
      <div className="about__info">
        <h3>Info about the Pools</h3>
        <p>
          Poolpays was created as a joint investment project with{" "}
          <a
            target="_blank"
            href="https://interstellarcoin.com"
            rel="noopener noreferrer"
          >
            Interstellar Holdings
          </a>. The intention of this project was to fill the need for a safe
          and secure crypto pool website where individuals can safely store
          their cryptocurrencies to stake. Our vision is to make a low fee,
          multi-faceted pool that supports a variety of cryptocurrencies and is
          open to anyone interested.
        </p>
        <p>
          At PoolPays we created our infrastructure with the user in mind and
          focused to deliver on many aspects:
        </p>
        <ul>{aboutListItems.map((item, i) => <li key={i}>{item}</li>)}</ul>
      </div>
    </section>
  );
}
