import { useState, useEffect } from 'react'
import { PlanStats } from '../components/plans/plan-stats'
import { PlanFilters } from '../components/plans/plan-filters'
import { PlanGrid } from '../components/plans/plan-grid'
import { AddPlanModal } from '../components/plans/add-plan-modal'

const mockPlans = [
    {
        id: "1",
        name: "Basic",
        code: "BASIC",
        description: "Perfect for beginners",
        price: 999,
        duration_days: 30,
        trade_limit: 5,
        features: {
            real_time_data: true,
            advanced_charts: false,
            ai_predictions: false,
        },
        is_visible: true
    },
    {
        id: "2",
        name: "Pro",
        code: "PRO",
        description: "For serious traders",
        price: 2999,
        duration_days: 30,
        trade_limit: 20,
        features: {
            real_time_data: true,
            advanced_charts: true,
            ai_predictions: false,
        },
        is_visible: true
    },
    {
        id: "3",
        name: "Elite",
        code: "ELITE",
        description: "Ultimate trading experience",
        price: 5999,
        duration_days: 30,
        trade_limit: 50,
        features: {
            real_time_data: true,
            advanced_charts: true,
            ai_predictions: true,
        },
        is_visible: true
    }
]

export function PlansPage() {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({})
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    useEffect(() => {
        const filteredPlans = mockPlans.filter(plan => {
            const searchMatch = plan.name.toLowerCase().includes(filters.search?.toLowerCase() || '')
            const durationMatch = !filters.duration || plan.duration_days.toString() === filters.duration
            return searchMatch && durationMatch
        })
        setPlans(filteredPlans)
        setLoading(false)
    }, [filters])

    const handleAddPlan = (newPlan) => {
        setPlans(prev => [...prev, newPlan])
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="space-y-8 p-8">
                <PlanStats />
                <div className="flex justify-end items-center">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-4 py-2 bg-sky-600 text-white rounded-md"
                    >
                        Add New Plan
                    </button>
                </div>

                <div className="space-y-4">
                    {/* <PlanFilters onFilterChange={setFilters} /> */}
                    <PlanGrid plans={plans} loading={loading} />
                </div>
            </div>

            <AddPlanModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddPlan}
            />
        </div>
    )
}