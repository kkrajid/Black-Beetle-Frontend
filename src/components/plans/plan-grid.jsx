import { useState } from 'react'
import { Check, X, Pencil, Trash2, X as CloseIcon } from 'lucide-react'

export function PlanGrid({ plans = [], loading, onEdit, onDelete }) {
    const [editPlan, setEditPlan] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [editedValues, setEditedValues] = useState({})

    const handleEditSubmit = (e) => {
        e.preventDefault()
        onEdit({ ...editPlan, ...editedValues })
        setEditPlan(null)
        setEditedValues({})
    }

    const handleDeleteConfirm = () => {
        onDelete(deleteId)
        setDeleteId(null)
    }

    if (loading) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse bg-white rounded-xl border border-gray-200 p-6">
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
                        <div className="h-4 bg-gray-200 rounded w-full mb-8" />
                        <div className="h-12 bg-gray-200 rounded w-1/2 mb-8" />
                        {[1, 2, 3, 4].map(j => (
                            <div key={j} className="h-6 bg-gray-200 rounded w-full mb-4" />
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    if (!plans?.length) {
        return (
            <div className="text-center py-24 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Plans Available</h3>
                <p className="text-gray-500">Start by adding your first plan.</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.id} className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 p-6 flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                            <p className="text-gray-600">{plan.description}</p>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-bold text-gray-900">₹{plan.price.toLocaleString()}</span>
                                <span className="text-sm text-gray-500">/{plan.duration_days} days</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                                    <span className="text-gray-700">Up to {plan.trade_limit} trades per day</span>
                                </div>
                                {Object.entries(plan.features).map(([feature, value]) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        {value ? (
                                            <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                                        ) : (
                                            <X className="h-5 w-5 text-red-500 shrink-0" />
                                        )}
                                        <span className="text-gray-700">
                                            {feature.split('_').map(word =>
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                            ).join(' ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 
                  bg-blue-50 text-blue-600 rounded-lg font-medium border border-blue-200
                  hover:bg-blue-100 hover:border-blue-300 
                  active:bg-blue-200 active:border-blue-400
                  transition-all duration-200"
                                onClick={() => {
                                    setEditPlan(plan)
                                    setEditedValues({})
                                }}
                            >
                                <Pencil className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5
                  bg-red-50 text-red-600 rounded-lg font-medium border border-red-200
                  hover:bg-red-100 hover:border-red-300
                  active:bg-red-200 active:border-red-400
                  transition-all duration-200"
                                onClick={() => setDeleteId(plan.id)}
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editPlan && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Edit Plan</h3>
                            <button onClick={() => setEditPlan(null)} className="p-1 hover:bg-gray-100 rounded-full">
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        defaultValue={editPlan.name}
                                        onChange={e => setEditedValues({ ...editedValues, name: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <input
                                        type="text"
                                        defaultValue={editPlan.description}
                                        onChange={e => setEditedValues({ ...editedValues, description: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        defaultValue={editPlan.price}
                                        onChange={e => setEditedValues({ ...editedValues, price: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
                                    <input
                                        type="number"
                                        defaultValue={editPlan.duration_days}
                                        onChange={e => setEditedValues({ ...editedValues, duration_days: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Trade Limit</label>
                                    <input
                                        type="number"
                                        defaultValue={editPlan.trade_limit}
                                        onChange={e => setEditedValues({ ...editedValues, trade_limit: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {Object.entries(editPlan.features).map(([feature, value]) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            defaultChecked={value}
                                            onChange={e => setEditedValues({
                                                ...editedValues,
                                                features: { ...(editedValues.features || editPlan.features), [feature]: e.target.checked }
                                            })}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <label className="text-sm text-gray-700">
                                            {feature.split('_').map(word =>
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                            ).join(' ')}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setEditPlan(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Delete Plan</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this plan? This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PlanGrid