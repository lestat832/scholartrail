import React from 'react';

interface FounderCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin?: string;
}

const FounderCard: React.FC<FounderCardProps> = ({ name, title, bio, image, linkedin }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
      {/* Profile Image */}
      <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback for missing images
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /%3E%3C/svg%3E';
            e.currentTarget.className = 'w-full h-full p-8 text-gray-400';
          }}
        />
      </div>

      {/* Name and Title */}
      <h3 className="text-xl font-bold text-vault-blue mb-1">{name}</h3>
      <p className="text-privacy-teal font-medium mb-4">{title}</p>

      {/* Bio */}
      <p className="text-neutral-gray mb-4">{bio}</p>

      {/* LinkedIn Link */}
      {linkedin && (
        <a 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-info-blue hover:text-privacy-teal transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          Connect on LinkedIn
        </a>
      )}
    </div>
  );
};

export default FounderCard;