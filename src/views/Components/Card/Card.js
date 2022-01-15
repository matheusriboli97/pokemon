import React from 'react';
import './Card.css'

const Card = ({ pk }) => {
    return (
        <div className="Card">
            <div className="Card-img">
                <img src={pk.sprites.front_default} alt="" />
            </div>
            <div className="Card-name">
                {pk.name}
            </div>
            <div className="Card-types">
                {
                    pk.types.map(type => {
                        return (
                            <div className="Card-type">
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="Card-info">
                <div className="Card-data Card-data--weight">
                    <p className="title">Weight</p>
                    <p>{pk.weight}</p>
                </div>
                <div className="Card-data Card-data--weight">
                    <p className="title">Height</p>
                    <p>{pk.height}</p>
                </div>
                <div className="Card-data Card-data--ability">
                    <p className="title">Ability</p>
                    <p>{pk.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;