import React from "react";

import "./overview.css";

const overviewItems = [
  {
    img: {
      src: require("./lock.png"),
      alt: "one"
    },
    title: "Safe and Secure",
    text: "Our Pools were crafted with safety in mind to protect our users."
  },
  {
    img: {
      src: require("./get-money.png"),
      alt: "two"
    },
    title: "Regular Payouts",
    text: "We pay out our users regularly without any hassle."
  },
  {
    img: {
      src: require("./network.png"),
      alt: "three"
    },
    title: "Multi Coin Support",
    text: "Several cryptocurrencies will be supported by PoolPays."
  },
  {
    img: {
      src: require("./in-love.png"),
      alt: "three"
    },
    title: "Easy to Use",
    text: "PoolPays is user friendly, simple, and easy to use."
  },
  {
    img: {
      src: require("./automation.png"),
      alt: "three"
    },
    title: "No More Worries!",
    text:
      "We'll take care of all the wallets, staking, and computer aspects for you."
  },
  {
    img: {
      src: require("./internet.png"),
      alt: "three"
    },
    title: "Community Support",
    text: "We value our community and intent to grow with it."
  }
];

export default function Overview() {
  return (
    <section className="section__overview inner">
      <div className="overview__items">
        {overviewItems.map(({ img, title, text }, i) => (
          <div key={i} className="overview__item">
            <img src={img.src} alt={img.alt} />
            <p className="item__title">{title}</p>
            <p className="item__text">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
