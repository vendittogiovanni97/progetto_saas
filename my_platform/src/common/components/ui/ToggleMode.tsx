'use client';

import React from 'react';
import { Switch } from '../ui-tailwind/Switch'; // Reusing the component the user likes

export default function ToggleMode() {
  const mode = 'dark';
  const toggleColorMode = () => {};
  
  return (
    <div className="flex items-center gap-2">
      <Switch 
        checked={mode === 'dark'} 
        onChange={toggleColorMode} 
        label={mode === 'dark' ? 'Dark' : 'Light'} 
      />
    </div>
  );
}
