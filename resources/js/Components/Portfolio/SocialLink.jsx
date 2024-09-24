import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialLink = ({ href, icon, animation }) => (
    <a 
        data-aos={animation} 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mx-2 hover:text-gray-400 transition-all duration-300"
    >
        <FontAwesomeIcon icon={icon} size="2x" />
    </a>
);

export default SocialLink;
