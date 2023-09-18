import React, { useState } from 'react'
import FormUnique from './FormUnique'
import FormRepetitive from './FormRepetitive'

export default function ModalAddEvent({closeModal, employeeID}) {

    const [choiceFrequence, setChoiceFrequence] = useState(2)
    const componentChoiceFrequence = [
        {component: <FormUnique closeModal={closeModal} employeeID={employeeID} />},
        {component: <FormRepetitive closeModal={closeModal} employeeID={employeeID} />},
        {component: ""}
    ]

  return (
    <div className='modal'>
      <div 
        // onSubmit={handleSubmit}
        className="container-modal">

            <h3>Ajouter un événement</h3>

            <div className="container-radio">
                <div className="container-input-radio">
                    <input 
                    type="radio" 
                    id='event-unique' 
                    name='choice-freq-event' 
                    className='input-radio' 
                    onChange={() => setChoiceFrequence(0)}
                    // checked
                    />
                    <label className='label-radio' htmlFor="event-unique">Unique</label>
                </div>
                <div className="container-input-radio">
                    <input 
                    type="radio" 
                    id='event-repetitive' 
                    name='choice-freq-event' 
                    className='input-radio' 
                    onChange={() => setChoiceFrequence(1)}
                    />
                    <label className='label-radio' htmlFor="event-repetitive">Répétitif</label>                  
                </div>
            </div>

            {componentChoiceFrequence[choiceFrequence].component}

        </div>
    </div>
  )
}
