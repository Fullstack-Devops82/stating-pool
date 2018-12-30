import React from "react";

import "./values.css";

const valueItems = [
  {
    img: {
      src: "http://www.placehold.it/200x200",
      alt: "bitcoin"
    },
    value: "$50.0b",
    text: "IN DIGITAL CURRENCIES EXCHANGED"
  },
  {
    img: {
      src: "http://www.placehold.it/200x200",
      alt: "countries"
    },
    value: "32",
    text: "COUNTRIES SUPPORTED"
  },
  {
    img: {
      src: "http://www.placehold.it/200x200",
      alt: "people"
    },
    value: "12.6m",
    text: "CUSTOMERS SERVED"
  }
];

export default function Values() {
  return (
    <section className="section__values">
      <div className="value__items inner">
        {valueItems.map(({ img, value, text }, i) => (
          <div key={i} className="value__item">
            <img src={img.src} alt={img.alt} />
            <p className="item__value">{value}</p>
            <p className="item__text">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
