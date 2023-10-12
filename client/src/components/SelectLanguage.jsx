import React, { useState } from 'react'
import { Multiselect } from "multiselect-react-dropdown"

const SelectLanguage = () => {
    const data = [
        { Language: "English", "id": 1 },
        { Language: "Spanish", "id": 2 },
        { Language: "French", "id": 3 },
        { Language: "German", "id": 4 },
        { Language: "Chinese", "id": 5 },
        { Language: "Japanese", "id": 6 },
        { Language: "Russian", "id": 7 },
        { Language: "Portuguese", "id": 8 },
        { Language: "Arabic", "id": 9 },
        { Language: "Korean", "id": 10 },
        { Language: "Italian", "id": 11 },
        { Language: "Dutch", "id": 12 },
        { Language: "Turkish", "id": 13 },
        { Language: "Swedish", "id": 14 },
        { Language: "Polish", "id": 15 },
        { Language: "Greek", "id": 16 },
        { Language: "Hindi", "id": 17 },
        { Language: "Bengali", "id": 18 },
        { Language: "Thai", "id": 19 },
        { Language: "Vietnamese", "id": 20 }
    ]

    const [options] = useState(data);
  return (
    <div>
        <Multiselect options={options} displayValue='Language'  />
      
    </div>
  )
}

export default SelectLanguage
