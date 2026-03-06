import React from 'react';

const defaultSize = 52;
const defaultColor = '#14b8a6';

// toothImg restored - using the new realistic 3D icon
import toothImg from '../assets/tooth.png';

export function IconDentalImplant({ size = defaultSize, color = defaultColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 10C18 6 24 4 32 4C40 4 46 6 46 10V24C46 32 40 36 32 36C24 36 18 32 18 24V10Z" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.1" />
            <path d="M32 36V58M24 44H40M26 50H38M28 56H36" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M22 14H42" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
        </svg>
    );
}

export function IconBraces({ size = defaultSize, color = defaultColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 10C16 6 22 4 32 4C42 4 48 6 48 10V36C48 52 32 60 32 60C32 60 16 52 16 36V10Z" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.1" />
            <rect x="24" y="24" width="16" height="12" rx="2" stroke={color} strokeWidth="3.5" />
            <path d="M8 30H56" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M28 24V36M36 24V36" stroke={color} strokeWidth="1.5" />
        </svg>
    );
}

export function IconRootCanal({ size = defaultSize, color = defaultColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 10C18 6 24 4 32 4C40 4 46 6 46 10C46 24 44 32 42 42C41 46 38 48 36 44C34 40 33 36 32 36C31 36 30 40 28 44C26 48 23 46 22 42C20 32 18 24 18 10Z" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.1" />
            <path d="M32 12V36" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M26 12L28 34M38 12L36 34" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
    );
}

export function IconSmileDesign({ size = defaultSize, color = defaultColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 28C12 20 20 16 32 16C44 16 52 20 52 28C52 40 44 48 32 48C20 48 12 40 12 28Z" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.1" />
            <path d="M18 30C22 34 28 36 32 36C36 36 42 34 46 30" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <path d="M12 28L4 52" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="4" cy="52" r="3.5" fill={color} />
        </svg>
    );
}

export function IconTeethWhitening({ size = defaultSize, color = defaultColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12C20 8 26 6 32 6C38 6 44 8 44 12V32C44 48 32 56 32 56C32 56 20 48 20 32V12Z" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.2" />
            <path d="M52 12L56 8M58 18H62M52 24L56 28" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M12 12L8 8M6 18H2M12 24L8 28" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="22" r="4" fill="white" />
        </svg>
    );
}

export function IconWisdomTooth({ size = defaultSize, color = defaultColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 24C16 20 22 16 32 16C42 16 48 20 48 24C48 36 44 42 42 50C41 54 38 56 36 52C34 48 33 44 32 44C31 44 30 48 28 52C26 56 23 54 22 50C20 42 16 36 16 24Z" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.1" transform="rotate(-20, 32, 32)" />
            <path d="M10 44V56M54 10V22" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.2" />
        </svg>
    );
}

export function IconLaserDentistry({ size = defaultSize, color = defaultColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 10C18 6 24 4 32 4C40 4 46 6 46 10V32C46 48 32 56 32 56C32 56 18 48 18 32V10Z" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.1" />
            <path d="M58 8L36 28" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 3" />
            <circle cx="58" cy="8" r="3.5" fill="#dc2626" />
            <circle cx="36" cy="28" r="4.5" stroke="#dc2626" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
    );
}

export function IconDentalCheckup({ size = defaultSize }) {
    const [processedSrc, setProcessedSrc] = React.useState(toothImg);

    React.useEffect(() => {
        const img = new Image();
        img.src = toothImg;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Remove black/near-black background
            // Any pixel where R,G,B are all very low is treated as background
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                if (r < 30 && g < 30 && b < 30) {
                    data[i + 3] = 0;
                }
            }

            ctx.putImageData(imageData, 0, 0);
            setProcessedSrc(canvas.toDataURL());
        };
    }, []);

    return (
        <img
            src={processedSrc}
            alt="Tooth"
            style={{
                width: size,
                height: size,
                objectFit: 'contain',
                display: 'block'
            }}
        />
    );
}

export function IconCrown({ size = defaultSize, color = defaultColor }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 20C18 16 24 14 32 14C40 14 46 16 46 20V42C46 50 42 54 32 54C22 54 18 50 18 42V20Z" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.1" />
            <path d="M18 28H46" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <path d="M24 14L32 6L40 14" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill={color} fillOpacity="0.2" />
        </svg>
    );
}

// ── Icon Map: service name → component ──────────────────────────────────────
export const DentalIconMap = {
    'Dental Checkup': IconDentalCheckup,
    'Root Canal Treatment': IconRootCanal,
    'Root Canal': IconRootCanal,
    'Dental Implants': IconDentalImplant,
    'Smile Designing': IconSmileDesign,
    'Smile Makeovers': IconSmileDesign,
    'Wisdom Tooth Extraction': IconWisdomTooth,
    'Laser Dentistry': IconLaserDentistry,
    'Teeth Whitening': IconTeethWhitening,
    'Braces / Aligners': IconBraces,
    'Crown': IconCrown,
    'Crowns & Veneers': IconCrown,
    'Other': IconDentalCheckup,
};

export default DentalIconMap;
