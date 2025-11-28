import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

// Importe seus currículos
import cvPt from '../../assets/docs/cv-pt.pdf';
import cvEn from '../../assets/docs/cv-en.pdf';

const PrintRedirect = () => {
    const { language } = useLanguage();

    useEffect(() => {
        const handlePrintRequest = (e) => {
            // Detecta Ctrl+P (Windows/Linux) ou Command+P (Mac)
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault(); // Impede a janela de impressão do navegador de abrir

                // Define qual PDF abrir
                const pdfToOpen = language === 'pt' ? cvPt : cvEn;

                // Abre o PDF em nova aba
                window.open(pdfToOpen, '_blank');
            }
        };

        window.addEventListener('keydown', handlePrintRequest);

        return () => {
            window.removeEventListener('keydown', handlePrintRequest);
        };
    }, [language]); // Recria o listener se a língua mudar

    return null; // Componente invisível
};

export default PrintRedirect;