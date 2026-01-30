interface PrizeCardProps {
  position: number
  amount: string
  description: string
  icon?: string
}

export function PrizeCard({ position, amount, description, icon }: PrizeCardProps) {
  const getPositionColor = (pos: number) => {
    switch (pos) {
      case 1:
        return "bg-gradient-to-br from-yellow-400 to-yellow-600"
      case 2:
        return "bg-gradient-to-br from-gray-300 to-gray-500"
      case 3:
        return "bg-gradient-to-br from-orange-400 to-orange-600"
      default:
        return "bg-gradient-to-br from-blue-400 to-blue-600"
    }
  }

  const getPositionIcon = (pos: number) => {
    switch (pos) {
      case 1:
        return "🏆"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return "🎖️"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
      <div className={`w-16 h-16 ${getPositionColor(position)} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}>
        {icon || getPositionIcon(position)}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{amount}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}