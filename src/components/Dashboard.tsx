import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChevronDown, Download, Info, MoveDownLeft, MoveUpRight} from 'lucide-react';
import DatePicker from './DatePicker';
import MultiSelect from './MultiSelect';
import { getUser, getWallet, getTransactions, type User, type Wallet, type Transaction } from '../services/api';
import { ReceiptIcon } from '../assets/icons';

const Dashboard = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<string[]>([]);
  const [selectedTransactionStatus, setSelectedTransactionStatus] = useState<string[]>([]);

  const applyFilters = () => {
    let filtered = [...transactions];

    // Apply date range filter
    if (startDate && endDate) {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    // Apply transaction type filter
    if (selectedTransactionTypes.length > 0) {
      filtered = filtered.filter(transaction =>
        selectedTransactionTypes.includes(transaction.type)
      );
    }

    // Apply status filter
    if (selectedTransactionStatus.length > 0) {
      filtered = filtered.filter(transaction =>
        selectedTransactionStatus.includes(transaction.status)
      );
    }

    setFilteredTransactions(filtered);
    setIsFilterOpen(false);
  };

  console.log(user)

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedTransactionTypes([]);
    setSelectedTransactionStatus([]);
    setFilteredTransactions(transactions);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, walletData, transactionsData] = await Promise.all([
          getUser(),
          getWallet(),
          getTransactions()
        ]);
        setUser(userData);
        setWallet(walletData);
        setTransactions(transactionsData);
        setFilteredTransactions(transactionsData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card md:col-span-2">
          <div className="flex justify-start items-center mb-6 gap-[64px]">
            <div>
              <p className="text-sm text-gray-600 mb-[10px]">Available Balance</p>
              <h3 className="text-[36px] font-bold tracking-[-1.5px] mt-1">
                {isLoading ? 'Loading...' : wallet ? `USD ${wallet?.balance.toFixed(2)}` : 'N/A'}
              </h3>
            </div>
            <button className="btn-primary">Withdraw</button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactions}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  hide 
                  domain={['dataMin - 20000', 'dataMax + 20000']} 
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#F97316" 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="">
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 font-normal leading-[16px] mb-4">Ledger Balance</div>
              <Info size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-semibold mt-1">
              {isLoading ? 'Loading...' : wallet ? `USD ${wallet?.ledger_balance.toFixed(2)}` : 'N/A'}
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-[#56616B] font-normal leading-[16px] mb-4">Total Payout</div>
              <Info size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-semibold mt-1">{isLoading ? 'Loading...' : wallet ? `USD ${wallet?.total_payout.toFixed(2)}` : 'N/A'}</div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 font-normal leading-[16px] mb-4">Total Revenue</div>
              <Info size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-semibold mt-1">{isLoading ? 'Loading...' : wallet ? `USD ${wallet?.total_revenue.toFixed(2)}` : 'N/A'}</div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Pending Payout</div>
              <Info size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-semibold mt-1">
              {isLoading ? 'Loading...' : wallet ? `USD ${wallet?.pending_payout.toFixed(2)}` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">{filteredTransactions.length} Transactions</h2>
            <p className="text-sm text-gray-600">Your recent transactions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#EFF1F6] font-semibold"
              >
                Filter
                <ChevronDown size={18} />
              </button>
              {isFilterOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="fixed inset-0 bg-black"
                    onClick={() => setIsFilterOpen(false)}
                  />
                  <motion.div 
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="fixed top-5 right-5 h-[95vh] w-[520px] rounded-lg bg-white shadow-lg p-6 "
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Filter</h2>
                      <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-2 mb-6 overflow-x-auto">
                      <button className="px-4 py-2 text-sm rounded-full border hover:bg-gray-50 whitespace-nowrap">Today</button>
                      <button className="px-4 py-2 text-sm rounded-full border hover:bg-gray-50 whitespace-nowrap">Last 7 days</button>
                      <button className="px-4 py-2 text-sm rounded-full border hover:bg-gray-50 whitespace-nowrap">This month</button>
                      <button className="px-4 py-2 text-sm rounded-full border hover:bg-gray-50 whitespace-nowrap">Last 3 months</button>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-semibold leading-[24px] mb-4">Date Range</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <DatePicker
                            value={startDate}
                            onChange={setStartDate}
                            placeholder="17 Jul 2025"
                            isStart={false}
                          />
                          <DatePicker
                            value={endDate}
                            onChange={setEndDate}
                            placeholder="17 Aug 2025"
                            isStart={false}
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold leading-[24px] mb-4">Transaction Type</h3>
                        <div className="relative">
                          <MultiSelect
                            options={[
                              "Store Transactions",
                              "Get Tipped",
                              "Withdrawals",
                              "Chargebacks",
                              "Cashbacks",
                              "Refer & Earn"
                            ]}
                            value={selectedTransactionTypes}
                            onChange={setSelectedTransactionTypes}
                            placeholder="Store Transactions, Get Tipped, Withdrawals, Chargebacks, Cash..."
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold leading-[24px] mb-4">Transaction Status</h3>
                        <div className="relative">
                          <MultiSelect
                            options={[
                              "Successful",
                              "Pending",
                              "Failed"
                            ]}
                            value={selectedTransactionStatus}
                            onChange={setSelectedTransactionStatus}
                            placeholder="Successful, Pending, Failed"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="fixed w-[450px] bottom-6 p-6 bg-white">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={clearFilters}
                          className="flex-1 px-6 py-3 border rounded-full hover:bg-gray-50"
                        >
                          Clear
                        </button>
                        <button 
                          onClick={applyFilters}
                          className="flex-1 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#EFF1F6] font-semibold">
              Export list
              <Download size={18} color='#131316' />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody className="">
              {isLoading ? (
                <tr>
                  <td colSpan={2} className="py-4 text-center">Loading transactions...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={2} className="py-4 text-center text-red-600">{error}</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={2} className="py-4 text-center">No transactions found</td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={2} className="py-12 text-start">
                    <div className="flex flex-col justify-start items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#EFF1F6] flex items-center justify-center">
                        <ReceiptIcon />
                      </div>
                      <div className="text-start">
                        <h3 className="text-lg font-semibold mb-1">No matching transaction found for the selected filter</h3>
                        <p className="text-sm text-gray-600">Change your filters to see more results, or add a new product.</p>
                      </div>
                      <button onClick={clearFilters} className="px-6 py-3 bg-[#EFF1F6] rounded-full text-sm">
                        Clear Filter
                      </button>
                    </div>
                  </td>
                </tr>
              ) : filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="group hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction?.type === 'deposit' ? 'bg-green-100' : 'bg-orange-100'}`}>
                        {transaction?.type === 'deposit' ? (
                          <MoveDownLeft size={16} color='#075132cf' />
                        ) : (
                          <MoveUpRight size={18} color='#961100cc' />
                        )}
                      </div>
                      <div>
                        <p className="text-base text-[#131316] font-semibold leading-[16px] capitalize mb-2">{transaction?.metadata?.product_name || transaction?.type}</p>
                        <p className="text-[14px] text-[#56616B] font-normal leading-[16px]">{transaction?.metadata?.name || transaction?.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <h3 className="font-bold text-base ">USD {transaction?.amount.toFixed(2)}</h3>
                    <div className="text-sm text-gray-600">
                      {new Date(transaction?.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;