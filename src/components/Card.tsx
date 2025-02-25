
import React, { useReducer } from 'react';
import { DeckItem } from "./GameController";
import "./Card.css";

type OnClick = {
    matchPair: () => void;
}

export const Card: React.FC<DeckItem & OnClick> = ({ clicked, country, capital, type, matchPair }) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log(event);
        matchPair(); 
    };
    return (
        <div className={`card ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
            <p>{type}</p>
            {type === 'country' ? <p>{country}</p> : null}
            {type === 'capital' ? capital ? <p>{capital}</p> : <p>No Capital</p> : null}
        </div>
    );
}
