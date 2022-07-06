import React from 'react';
import '../index.css';

function Card(props) {
    const card = props.card

    function handleClick() {
        props.onCardClick(card);
    }

    return (
        <div className="element">
            <img className="element__pic"
                alt={card.name}
                src={card.link}
                onClick={handleClick} />
            <button
                className="element__trash-button"
            />
            <div className="element__container">
                <h2 className="element__name">{card.name}</h2>
                <button aria-label="Нравится" className="element__like" type="button"></button>
                <span className="element__likes-counter">0</span>
            </div>
        </div>
    )
}
export default Card;