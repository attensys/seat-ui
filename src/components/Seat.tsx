import { useState } from 'react'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  AlignBottomIcon,
  SeatSelectorIcon,
  Unlink03Icon,
} from '@hugeicons/core-free-icons'

interface SeatProps {
  seatNumber: string
  isAvailable?: boolean
  capacitance?: number
  baseline?: number
}

export default function Seat({
  seatNumber,
  capacitance,
  baseline,
  isAvailable = true,
}: SeatProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-center p-4">
      <HugeiconsIcon
        icon={SeatSelectorIcon}
        size={110}
        strokeWidth={1.1}
        onClick={() => setIsOpen(!isOpen)}
        className={`text-black cursor-pointer ${isAvailable ? 'fill-green-500' : 'fill-red-500'}`}
      />
      <div className="text-black font-semibold text-3xl">{seatNumber}</div>
      {isOpen && (
        <div className="flex flex-col gap-1 mt-2">
          <div className="text-sm text-gray-400 font-medium">
            <span className="inline-flex items-center gap-2">
              <HugeiconsIcon icon={Unlink03Icon} size={15} />
              {capacitance !== undefined
                ? `${capacitance.toLocaleString()} pF`
                : '-'}
            </span>
          </div>
          <div className="text-sm text-gray-400 font-medium">
            <span className="inline-flex items-center gap-2">
              <HugeiconsIcon icon={AlignBottomIcon} size={15} />
              {baseline !== undefined ? `${baseline.toLocaleString()} pF` : '-'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
