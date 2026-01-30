interface JudgeCardProps {
  name: string
  role: string
  image?: string
  company?: string
}

export function JudgeCard({ name, role, image, company }: JudgeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
        {image ? (
          <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          "👤"
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-blue-600 font-medium mb-2">{role}</p>
      {company && <p className="text-gray-600 text-sm">{company}</p>}
    </div>
  )
}