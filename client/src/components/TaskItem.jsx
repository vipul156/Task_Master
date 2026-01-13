import React from 'react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
    return (
        <div className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${task.isCompleted
                ? 'bg-gray-50/50 border-gray-200 opacity-75'
                : 'bg-white border-gray-100 shadow-sm hover:border-indigo-100'
            }`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <button
                            onClick={() => onToggle(task._id)}
                            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.isCompleted
                                    ? 'bg-indigo-500 border-indigo-500 text-white'
                                    : 'border-gray-300 hover:border-indigo-400 text-transparent'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                        <h3 className={`text-lg font-semibold truncate transition-all ${task.isCompleted ? 'text-gray-500 line-through decoration-gray-400' : 'text-gray-800'
                            }`}>
                            {task.title}
                        </h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 pl-9">
                        {task.description || "No description provided."}
                    </p>
                    <div className="mt-3 pl-9 flex items-center gap-2 text-xs text-gray-400">
                        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
