import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// TypeScript interfaces for data structures
interface SpendingDataItem {
  month: string;
  amount: number;
  income: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  amount: number;
  change: string;
  isPositive: boolean;
  delay: number;
}

// Sample data - replace with your RTK Query data
const spendingData: SpendingDataItem[] = [
  { month: 'Jan', amount: 2400, income: 3200 },
  { month: 'Feb', amount: 1398, income: 3200 },
  { month: 'Mar', amount: 2800, income: 3200 },
  { month: 'Apr', amount: 3908, income: 3200 },
  { month: 'May', amount: 4800, income: 3200 },
  { month: 'Jun', amount: 3490, income: 3200 },
  { month: 'Jul', amount: 2100, income: 3200 },
];

// Animation variants - memoized to prevent re-creation
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Memoized StatCard component for better performance
const StatCard: React.FC<StatCardProps> = React.memo(({ icon: Icon, title, amount, change, isPositive, delay }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    transition={{ delay }}
    className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow duration-300 min-h-[120px] flex flex-col justify-between"
  >
    <div className="flex items-center justify-between mb-2 sm:mb-3">
      <div className={`p-2 rounded-lg flex-shrink-0 ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
      </div>
      <div className={`flex items-center space-x-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        <span className="whitespace-nowrap">{change}</span>
      </div>
    </div>
    <div className="flex-1">
      <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1 leading-tight">{title}</h3>
      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
        ${amount.toLocaleString()}
      </p>
    </div>
  </motion.div>
));

StatCard.displayName = 'StatCard';

// Memoized CustomTooltip component
const CustomTooltip: React.FC<TooltipProps> = React.memo(({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg shadow-lg max-w-xs">
        <p className="text-gray-600 text-sm mb-2">{`Month: ${label}`}</p>
        <p className="text-green-600 font-semibold text-sm">
          {`Spending: $${payload[0].value.toLocaleString()}`}
        </p>
        {payload[1] && (
          <p className="text-gray-600 font-semibold text-sm">
            {`Income: $${payload[1].value.toLocaleString()}`}
          </p>
        )}
      </div>
    );
  }
  return null;
});

CustomTooltip.displayName = 'CustomTooltip';

// Memoized chart components
const ChartContainer: React.FC<{ chartType: 'area' | 'line' }> = React.memo(({ chartType }) => {
  const formatYAxisTick = useCallback((value: number) => `${(value / 1000).toFixed(0)}k`, []);

  return (
    <div className="h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'area' ? (
          <AreaChart data={spendingData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxisTick}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#16a34a"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSpending)"
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        ) : (
          <LineChart data={spendingData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxisTick}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#16a34a' }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
});

ChartContainer.displayName = 'ChartContainer';

export default function OverviewSection(): React.ReactNode {
  const [timeFilter, setTimeFilter] = useState<string>('6months');
  const [chartType, setChartType] = useState<'area' | 'line'>('area');

  // Memoized calculations for better performance
  const calculations = useMemo(() => {
    const totalSpending = spendingData.reduce((sum, item) => sum + item.amount, 0);
    const avgSpending = spendingData.length > 0 ? totalSpending / spendingData.length : 0;
    const lastMonth = spendingData.length > 0 ? spendingData[spendingData.length - 1] : null;
    const previousMonth = spendingData.length > 1 ? spendingData[spendingData.length - 2] : null;
    const monthlyChange = lastMonth && previousMonth && previousMonth.amount > 0 
      ? ((lastMonth.amount - previousMonth.amount) / previousMonth.amount * 100).toFixed(1) 
      : '0.0';

    return {
      totalSpending,
      avgSpending: Math.round(avgSpending),
      lastMonth,
      monthlyChange,
      remainingBudget: 3200 - (lastMonth?.amount || 0)
    };
  }, []);

  // Memoized callbacks
  const handleTimeFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFilter(e.target.value);
  }, []);

  const handleChartTypeChange = useCallback((type: 'area' | 'line') => {
    setChartType(type);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen w-full overflow-hidden"
    >
      {/* Header - Improved responsive layout */}
      <motion.div 
        variants={cardVariants} 
        className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between"
      >
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 leading-tight">
            Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Track your spending and financial health
          </p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <select
            value={timeFilter}
            onChange={handleTimeFilterChange}
            aria-label="Select time period"
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all w-full sm:w-auto"
          >
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
            <option value="3months">Last 3 Months</option>
          </select>
          <button 
            aria-label="Filter options"
            className="p-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors flex-shrink-0"
          >
            <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
        </div>
      </motion.div>

      {/* Stats Cards - Enhanced responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Spending"
          amount={calculations.totalSpending}
          change={`${Math.abs(parseFloat(calculations.monthlyChange))}%`}
          isPositive={parseFloat(calculations.monthlyChange) < 0}
          delay={0.1}
        />
        <StatCard
          icon={TrendingUp}
          title="Average Monthly"
          amount={calculations.avgSpending}
          change="12.5%"
          isPositive={true}
          delay={0.2}
        />
        <StatCard
          icon={CreditCard}
          title="This Month"
          amount={calculations.lastMonth?.amount || 0}
          change={`${Math.abs(parseFloat(calculations.monthlyChange))}%`}
          isPositive={parseFloat(calculations.monthlyChange) < 0}
          delay={0.3}
        />
        <StatCard
          icon={PiggyBank}
          title="Remaining Budget"
          amount={calculations.remainingBudget}
          change="8.2%"
          isPositive={true}
          delay={0.4}
        />
      </div>

      {/* Main Chart Section - Enhanced responsive design */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 overflow-hidden"
      >
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight">
              Spending Trends
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Track your monthly spending patterns
            </p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => handleChartTypeChange('area')}
              aria-label="Show area chart"
              aria-pressed={chartType === 'area'}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                chartType === 'area' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => handleChartTypeChange('line')}
              aria-label="Show line chart"
              aria-pressed={chartType === 'line'}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                chartType === 'line' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Line
            </button>
          </div>
        </div>

        <ChartContainer chartType={chartType} />

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
            <span className="text-xs sm:text-sm text-gray-600">Spending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-gray-400 flex-shrink-0"></div>
            <span className="text-xs sm:text-sm text-gray-600">Income Target</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

