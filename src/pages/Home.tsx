import Seat from '../components/Seat'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Seat Selection</h1>

      <div className="w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Available Seats</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            <Seat seatNumber="A1" isAvailable={true} />
            <Seat seatNumber="A2" isAvailable={true} />
            <Seat seatNumber="A3" isAvailable={false} />
            <Seat seatNumber="A4" isAvailable={true} />
          </div>

          <div className="mt-8 flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span className="text-gray-900 font-medium">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span className="text-gray-900 font-medium">Selected</span>
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
