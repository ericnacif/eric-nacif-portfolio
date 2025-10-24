import React from 'react';
import './SkillCard.css';

const SkillCard = ({ icon, title, description }) => { // Remove 'items'
    return (
        <div className="skill-card">
            <div className="skill-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{description}</p> {/* Nova prop para descrição */}
        </div>
    );
};

export default SkillCard;