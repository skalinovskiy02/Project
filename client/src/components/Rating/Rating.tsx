import React, {useEffect, useState} from 'react';
import './style.css'

const Rating = () => {

    return (
        <div className="rating">
            <input type="radio" name="rating" id="5"/><label htmlFor="5">☆</label>
            <input type="radio" name="rating" id="4"/><label htmlFor="4">☆</label>
            <input type="radio" name="rating" id="3"/><label htmlFor="3">☆</label>
            <input type="radio" name="rating" id="2"/><label htmlFor="2">☆</label>
            <input type="radio" name="rating" id="1"/><label htmlFor="1">☆</label>
        </div>
    );
};

export default Rating;