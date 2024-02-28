// ParallaxLayer.js
import '../ParallaxLayer.css';
import React, { useEffect, useState } from 'react';

interface ParallaxLayerProps {
    image?: string;
    speed: number;
    children?: React.ReactNode;

}
const ParallaxLayer = ({ image, speed, children }: ParallaxLayerProps) => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.scrollY);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const layerStyle = {
        backgroundImage: image ? `url(${image})` : undefined,
        transform: `translateY(${speed * offsetY}px)`
    };

    return (
        <div className="parallax-layer" style={layerStyle}>
            {children}
        </div>
    );
}

export default ParallaxLayer;
