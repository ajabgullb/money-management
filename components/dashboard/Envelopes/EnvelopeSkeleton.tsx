import { motion } from 'framer-motion';

const EnvelopesSkeleton = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-4 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Skeleton Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            {/* Header Skeleton */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Amount Information Skeleton */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Progress Bar Skeleton */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 animate-pulse"></div>
            </div>

            {/* Spent Amount Skeleton */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EnvelopesSkeleton;

