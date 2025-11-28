import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const EasterEgg = () => {
    const [inputSequence, setInputSequence] = useState('');
    const secretCode = 'ericnacif';

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Pega a tecla digitada e converte para minúscula
            const key = e.key.toLowerCase();

            // Adiciona a nova tecla à sequência atual
            setInputSequence((prev) => {
                const newSequence = prev + key;

                // Se a sequência digitada for maior que o código, corta o excesso do começo
                // Ex: se digitar "aericnacif", ele mantém só o final
                if (newSequence.length > secretCode.length) {
                    return newSequence.slice(-secretCode.length);
                }
                return newSequence;
            });
        };

        window.addEventListener('keydown', handleKeyDown);

        // Limpeza do evento ao desmontar
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Monitora a sequência para disparar o efeito
    useEffect(() => {
        if (inputSequence === secretCode) {
            triggerConfetti();
            setInputSequence(''); // Reseta para poder fazer de novo
        }
    }, [inputSequence]);

    const triggerConfetti = () => {
        // Configuração para uma explosão caprichada
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

        var random = (min, max) => {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);

            // Lança confetes de dois pontos aleatórios
            confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return null; // Componente invisível
};

export default EasterEgg;