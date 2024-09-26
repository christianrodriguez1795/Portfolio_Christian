import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialLink = ({ href, icon, animation }) => (
    <a 
        data-aos={animation} 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:text-[#b6b6b6c2] dark:hover:text-[#e7e7e7c2] transition-all duration-300"
    >
        <FontAwesomeIcon icon={icon} size="2x" />
    </a>
);

export default SocialLink;
