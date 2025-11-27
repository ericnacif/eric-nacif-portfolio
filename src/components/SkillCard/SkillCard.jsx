import React from 'react';
import './SkillCard.css';

// Componente simples para uso futuro ou seções extras
const SkillCard = ({ title, description, icon }) => {
    return (
        <div className="skill-card">
            <div className="skill-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
};

export default SkillCard;