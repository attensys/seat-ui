import { useState } from 'react'

interface SeatProps {
  seatNumber: string
  isAvailable?: boolean
}

export default function Seat({ seatNumber, isAvailable = true }: SeatProps) {
  const [isSelected, setIsSelected] = useState(false)

  const handleSeatClick = () => {
    if (isAvailable) {
      setIsSelected(!isSelected)
    }
  }

  const getSeatStyle = () => {
    if (!isAvailable) {
      return 'bg-red-500 cursor-not-allowed'
    }
    if (isSelected) {
      return 'bg-green-500 hover:bg-green-600'
    }
    return 'bg-blue-500 hover:bg-blue-600'
  }

  const getSeatStatus = () => {
    if (!isAvailable) return 'Occupied'
    if (isSelected) return 'Selected'
    return 'Available'
  }

  return (
    <div className="flex flex-col items-center p-4">
      <button
        onClick={handleSeatClick}
        disabled={!isAvailable}
        className={`
          w-16 h-16 rounded-lg transition-colors duration-200
          flex items-center justify-center text-white font-semibold
          ${getSeatStyle()}
        `}
        title={`Seat ${seatNumber} - ${getSeatStatus()}`}
      >
        {seatNumber}
      </button>
      <span className="mt-2 text-sm text-gray-900 font-medium">
        {getSeatStatus()}
      </span>
    </div>
  )
}
