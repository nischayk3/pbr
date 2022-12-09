import React, { useState, useEffect, useRef } from 'react';
import DesignTable from '../designForm/designTable';

function DesignForm() {
//     const [isDragging, setIsDragging] = useState(false)
//   const [position, setPosition] = useState([0, 0])
//   const stateRef = useRef(null)

//   useEffect(
//     () => {
//       stateRef.current = { position, isDragging }
//     },
//     [position, isDragging],
//   )

//   useEffect(() => {
//     function handleMouseMove(event) {
//       // Now we read the dragging/position state from the
//       // ref, which should always hold the latest state
//       const { isDragging, position } = stateRef.current
//       if (isDragging) {
//         const newX = position[0] + event.movementX
//         const newY = position[1] + event.movementY
//         setPosition([newX, newY])
//       }
//     }
//     window.addEventListener('mousemove', handleMouseMove)

//     function handleMouseUp() {
//       setIsDragging(false)
//     }
//     window.addEventListener('mouseup', handleMouseUp)

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove)
//       window.removeEventListener('mouseup', handleMouseUp)
//     }
//   }, [])


  return (
    <div>
       {/* <div
      style={{
        position: 'absolute',
        left: position[0],
        top: position[1],
      }}
      onMouseDown={() => setIsDragging(true)}
    >
      {isDragging ? 'I am dragging.' : 'I am not dragging.'}
    </div> */}
    <DesignTable />
    </div>
  )
}

export default DesignForm
