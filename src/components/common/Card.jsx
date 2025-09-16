import React from 'react';
import styles from './Card.module.css';

// This component acts as a styled container.
// 'props.children' will render whatever you put inside the <Card> tags.
function Card(props) {
    return (
        <div className={styles.card}>
            {props.children}
        </div>
    );
}

export default Card;