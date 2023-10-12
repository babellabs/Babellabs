import React, { useState } from 'react'
import { Multiselect } from "multiselect-react-dropdown"

const Advanced = () => {
    const data = [
        { Feature: "Voice Cloning", "id": 1 },
        { Feature: "Lip Sync", "id": 2 },
        
      
    ]

    const [options] = useState(data);
  return (
    <div>
        <Multiselect options={options} displayValue='Feature' />
      
    </div>
  )
}

export default Advanced
