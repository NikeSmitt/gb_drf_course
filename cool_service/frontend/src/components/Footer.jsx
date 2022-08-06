import React, {useState} from 'react';

const Footer = () => {
    return (
        <div className='footer'>
            Cool Service {(new Date().getFullYear())}
        </div>
    );
};

export default Footer;