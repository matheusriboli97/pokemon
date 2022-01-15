import React from 'react';
import './MiniCard.css'

const MiniCard = ({ pk }) => {
    return (
        <div className="Card">
            <div className="Card-img">
                <img draggable='false' src={pk.sprites.front_default} alt="" />
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
        </div>
    );
}

export default MiniCard;