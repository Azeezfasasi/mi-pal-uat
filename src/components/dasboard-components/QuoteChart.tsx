'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { TrendingUp, FileText, CheckCircle, Clock, AlertCircle, Loader } from 'lucide-react';

interface QuoteStatus {
  new: number;
  reviewed: number;
  inProgress: number;
  quoted: number;
  completed: number;
}

interface ChartDataPoint {
  name: string;
  value?: number;
  count?: number;
  status?: string;
  [key: string]: any;
}

const statusColors = {
  new: '#3b82f6',
  reviewed: '#8b5cf6',
  inProgress: '#f59e0b',
  quoted: '#10b981',
  completed: '#059669',
};

const statusIcons = {
  draft: FileText,
  pending: Clock,
  accepted: CheckCircle,
  rejected: AlertCircle,
  expired: TrendingUp,
};

const statusLabels = {
  new: 'New',
  reviewed: 'Reviewed',
  inProgress: 'In Progress',
  quoted: 'Quoted',
  completed: 'Completed',
};

export default function QuoteChart() {
  const [quoteStats, setQuoteStats] = useState<QuoteStatus>({
    new: 0,
    reviewed: 0,
    inProgress: 0,
    quoted: 0,
    completed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuoteStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Get the authentication token from localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        
        const headers: any = {
          'Content-Type': 'application/json',
        };

        // Add authorization header if token exists
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('/api/quote-requests', { headers });
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication required. Please log in again.');
          }
          throw new Error(`Failed to fetch quote statistics: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.success && data.data.quoteRequests) {
          const quoteRequests = data.data.quoteRequests;
          
          // Count quotes by status
          const stats = {
            new: quoteRequests.filter((q: any) => q.status === 'new').length,
            reviewed: quoteRequests.filter((q: any) => q.status === 'reviewed').length,
            inProgress: quoteRequests.filter((q: any) => q.status === 'in-progress').length,
            quoted: quoteRequests.filter((q: any) => q.status === 'quoted').length,
            completed: quoteRequests.filter((q: any) => q.status === 'completed').length,
          };
          
          setQuoteStats(stats);
        } else {
          throw new Error(data.message || 'Failed to parse quote data');
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to fetch quote statistics';
        console.error('Error fetching quote stats:', errorMsg);
        setError(errorMsg);
        
        // Set mock data on error for demonstration
        setQuoteStats({
          new: 12,
          reviewed: 8,
          inProgress: 15,
          quoted: 10,
          completed: 25,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuoteStats();
  }, []);

  const pieData: ChartDataPoint[] = [
    { name: statusLabels.new, value: quoteStats.new },
    { name: statusLabels.reviewed, value: quoteStats.reviewed },
    { name: statusLabels.inProgress, value: quoteStats.inProgress },
    { name: statusLabels.quoted, value: quoteStats.quoted },
    { name: statusLabels.completed, value: quoteStats.completed },
  ];

  const barData: ChartDataPoint[] = [
    { name: statusLabels.new, count: quoteStats.new, value: quoteStats.new, status: 'new' },
    { name: statusLabels.reviewed, count: quoteStats.reviewed, value: quoteStats.reviewed, status: 'reviewed' },
    { name: statusLabels.inProgress, count: quoteStats.inProgress, value: quoteStats.inProgress, status: 'inProgress' },
    { name: statusLabels.quoted, count: quoteStats.quoted, value: quoteStats.quoted, status: 'quoted' },
    { name: statusLabels.completed, count: quoteStats.completed, value: quoteStats.completed, status: 'completed' },
  ];

  const totalQuotes =
    quoteStats.new +
    quoteStats.reviewed +
    quoteStats.inProgress +
    quoteStats.quoted +
    quoteStats.completed;

  const acceptanceRate = totalQuotes > 0 ? ((quoteStats.completed / totalQuotes) * 100).toFixed(1) : 0;

  const getColorByStatus = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || '#6b7280';
  };

  const CustomPieLabel = (entry: any) => {
    return `${((entry.value / totalQuotes) * 100).toFixed(0)}%`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalQuotes) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">Count: {data.value}</p>
          <p className="text-sm font-medium text-blue-600">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-900">
          <span className="font-semibold">Error:</span> {error}
        </p>
        <p className="text-xs text-red-700 mt-2">Displaying sample data for demonstration purposes.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Quotes */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">{totalQuotes}</div>
            <FileText className="w-6 h-6 text-blue-400 opacity-60" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-blue-900">Total Quotes</p>
        </div>

        {/* Draft */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">{quoteStats.new}</div>
            <FileText className="w-6 h-6 text-blue-400 opacity-60" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-blue-900">New</p>
        </div>

        {/* Reviewed */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600">{quoteStats.reviewed}</div>
            <FileText className="w-6 h-6 text-purple-400 opacity-60" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-purple-900">Reviewed</p>
        </div>

        {/* In Progress */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl font-bold text-amber-600">{quoteStats.inProgress}</div>
            <Clock className="w-6 h-6 text-amber-400 opacity-60" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-amber-900">In Progress</p>
        </div>

        {/* Quoted */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl font-bold text-green-600">{quoteStats.quoted}</div>
            <CheckCircle className="w-6 h-6 text-green-400 opacity-60" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-green-900">Quoted</p>
        </div>

        {/* Completed */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600">{quoteStats.completed}</div>
            <CheckCircle className="w-6 h-6 text-emerald-400 opacity-60" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-emerald-900">Completed</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm sm:text-base font-semibold text-gray-700">Completion Rate</h3>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-emerald-600">{acceptanceRate}%</div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            {quoteStats.completed} out of {totalQuotes} quotes completed
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm sm:text-base font-semibold text-gray-700">In Progress</h3>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-amber-600">{quoteStats.inProgress}</div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Quotes being processed
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200">
        {/* Chart Type Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Quote Status Distribution</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('pie')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                chartType === 'pie'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pie
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                chartType === 'bar'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bar
            </button>
          </div>
        </div>

        {/* Charts */}
        {chartType === 'pie' ? (
          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomPieLabel}
                  outerRadius={window.innerWidth < 640 ? 80 : 120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getColorByStatus(entry.name.toLowerCase())}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  isAnimationActive={true}
                >
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getColorByStatus(entry.status || '')}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Chart Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-gray-200">
          {Object.entries(statusLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: getColorByStatus(key) }}
              />
              <span className="text-xs sm:text-sm text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs sm:text-sm text-blue-900">
          <span className="font-semibold">Note:</span> This chart displays real-time distribution of quote
          requests by status. Statuses: New (initial submission), Reviewed (evaluated), In Progress (being worked on),
          Quoted (sent to customer), and Completed (finalized). Regular monitoring helps optimize quote processing workflows.
        </p>
      </div>
    </div>
  );
}
