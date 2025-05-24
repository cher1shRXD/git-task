import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { TaskProgressBarProps } from '@/types/props/TaskProgressBar';

const TaskProgressBar = ({
  totalTasks,
  completedTasks
}: TaskProgressBarProps) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const progressPercentage = Math.min((completedTasks / totalTasks) * 100, 100);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(progressPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  const getProgressGradient = () => {
    if (progressPercentage === 100) return 'from-green-400 to-green-600';
    if (progressPercentage >= 75) return 'from-blue-400 to-blue-600';
    if (progressPercentage >= 50) return 'from-yellow-400 to-yellow-600';
    if (progressPercentage >= 25) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="w-full pr-4 overflow-x-scroll">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-jetbrains text-gray-800">작업 진행률</p>
        <div className="flex items-center gap-2">
          {progressPercentage === 100 ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>

      <div className="relative mb-4">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getProgressGradient()} transition-all duration-1000 ease-out rounded-full relative`}
            style={{ width: `${animatedWidth}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            완료: <span className="font-semibold text-gray-800">{completedTasks}</span>
          </span>
          <span className="text-gray-600">
            전체: <span className="font-semibold text-gray-800">{totalTasks}</span>
          </span>
          <span className="text-gray-600">
            남은 작업: <span className="font-semibold text-gray-800">{totalTasks - completedTasks}</span>
          </span>
        </div>
        
        {progressPercentage === 100 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            완료! 🎉
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskProgressBar