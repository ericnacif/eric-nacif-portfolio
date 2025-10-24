import React from 'react';
import './ExperienceList.css';

const ExperienceList = ({ title, items }) => {
    return (
        <div className="experience-list-card">
            <h4>{title}</h4>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExperienceList;