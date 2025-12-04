import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ paddingTop: '120px', minHeight: '100vh', paddingLeft: '20px', paddingRight: '20px' }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--text-color)' }}>Meus Serviços</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                    Página dedicada aos serviços (Em construção).
                </p>

                {/* Adicione seu conteúdo de serviços aqui */}

            </div>
        </motion.div>
    );
};

export default Services;