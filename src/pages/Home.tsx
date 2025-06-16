import { Key } from 'react'
import Seat from '../components/Seat'
import useDevices from '../hooks/useDevices'

interface HomeProps {
  host: string
}

interface SeatType {
  id: Key | null | undefined
  operatorId: string
  cushionCategory: number
  cushionTopCapacitance?: number
  baseline?: number
}

export default function Home({ host }: HomeProps) {
  const [seats] = useDevices({
    host,
    query: `where type="seat"`,
  })

  return (
    <div className="text-center">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 justify-items-center">
            {seats.map((seat: SeatType) => (
              <Seat
                key={seat.id}
                seatNumber={seat.operatorId}
                isAvailable={seat.cushionCategory === 0}
                capacitance={seat.cushionTopCapacitance}
                baseline={seat.baseline}
              />
            ))}
          </div>

          <div className="mt-2 flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span className="text-gray-900 font-medium">Available</span>
            </div>

            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span className="text-gray-900 font-medium">Occupied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
