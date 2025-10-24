import React, { useState, useEffect } from 'react';
import './Cursor.css';

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Limpa o evento quando o componente é desmontado
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []); // Array vazio garante que o efeito rode apenas uma vez

    return (
        <div
            className="custom-cursor"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        />
    );
};

export default Cursor;