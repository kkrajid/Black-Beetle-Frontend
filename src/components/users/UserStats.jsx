import React, { useEffect, useState } from 'react'
import { Users, UserCheck, Building2, User } from 'lucide-react'
import { fetchUserStats } from '../../utils/api'

function BoxWrapper({ children }) {
  return (
    <div className="bg-background rounded-sm flex-1 p-4 border border-border text-text flex items-center shadow-[0_0_10px_rgba(215,178,87,0.1)]">
      {children}
    </div>
  )
}

export function UserStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchUserStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch user stats:', error)
      }
    }
    getStats()
  }, [])

  if (!stats) {
    return <div className="text-primary">Loading...</div>
  }

  const statItems = [
    { title: "Total Users", value: stats.totalUsers, icon: Users },
    { title: "B2B Admins", value: stats.b2bAdmins, icon: UserCheck },
    { title: "B2B Users", value: stats.b2bUsers, icon: Building2 },
    { title: "B2C Users", value: stats.b2cUsers, icon: User }
  ]

  return (
    <div className='flex gap-4 w-full'>
      {statItems.map((stat, index) => (
        <BoxWrapper key={index}>
          <div className="rounded-full bg-hover w-12 h-12 flex items-center justify-center">
            <stat.icon className='text-2xl text-primary' />
          </div>
          <div className='pl-4'>
            <span className='text-sm text-text/60 font-light'>{stat.title}</span>
            <div className='flex items-center'>
              <strong className='text-xl text-primary font-semibold'>{stat.value}</strong>
            </div>
          </div>
        </BoxWrapper>
      ))}
    </div>
  )
}

