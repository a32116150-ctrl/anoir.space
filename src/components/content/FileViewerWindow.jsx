import React from 'react';

export default function FileViewerWindow({ data }) {
  const content = data?.content || 'No content available.';
  
  return (
    <div className="flex flex-col h-full bg-white text-black p-4 overflow-auto font-sans">
      <div className="whitespace-pre-wrap">{content}</div>
    </div>
  );
}
