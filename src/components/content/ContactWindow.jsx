import React from 'react';
import { personalInfo } from '../../data/content';

export default function ContactWindow() {
    return (
        <div className="text-base" style={{ fontFamily: 'inherit' }}>
            <p className="mb-4">For inquiries and collaborations:</p>
            <div className="bg-white border border-gray-400 p-4 shadow-inner mb-4">
                <div className="mb-2">
                    <span className="font-bold block">Email:</span> 
                    <a href={`mailto:${personalInfo.email}`} className="text-blue-800 underline hover:text-blue-600">{personalInfo.email}</a>
                </div>
                <div className="mb-2">
                    <span className="font-bold block">Phone:</span> 
                    <span>{personalInfo.phone}</span>
                </div>
                <div>
                    <span className="font-bold block">Location:</span> 
                    <span>{personalInfo.location}</span>
                </div>
            </div>
            <p className="text-sm text-gray-500 text-center">Available for freelance and full-time opportunities.</p>
        </div>
    )
}
