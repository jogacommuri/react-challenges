import React, { useState } from 'react'
const tradelines = [
    { date: "2015-10-10", code: "10", subcode: "12", monthlyPayment: 1470.31, balance: 659218.0 },
    { date: "2015-10-10", code: "5", subcode: "1", monthlyPayment: 431.98, balance: 51028.0 },
    { date: "2015-10-10", code: "8", subcode: "15", monthlyPayment: 340.12, balance: 21223.2 },
    { date: "2015-10-10", code: "10", subcode: "15", monthlyPayment: 930.12, balance: 120413.0 },
    { date: "2015-10-10", code: "10", subcode: "5", monthlyPayment: 150.5, balance: 6421.21 },
  ];
const EarnestTradeline = () => {
    const [filteredCode, setFilteredCode] = useState('')
    const [filteredTrades, setFilteredTrades] = useState(tradelines)

    const handleFilterChange = (code) =>{
        setFilteredCode(code);
        setFilteredTrades(
            code ? tradelines.filter((trade) => trade.code === code) : tradelines
        )
       
    }
    const totalMonthlyPayments = filteredTrades.reduce((sum, trade) => sum + trade.monthlyPayment , 0);
    const totalBalance = filteredTrades.reduce((sum, trade) => sum + trade.balance, 0)
  return (
    
    <div className='flex flex-col p-5 font-sans'>
        <h3 className='font-bold'>Earnest Tradeline</h3>
        <Filters onFilterChange = {handleFilterChange} />
        <div>
            <h3 className='font-bold'>Aggregate Information</h3>
            <p className='font-thin'>Total Monthly Payment: ${totalMonthlyPayments.toFixed(2)}</p>
            <p className='font-thin'>Total Balance: ${totalBalance.toFixed(2)}</p>
        </div>
        <TradelineTable tradelines={filteredTrades} />
    </div>
  )
}
const Filters = ({onFilterChange}) => {
    const handleFilterChange = (event) =>{
        onFilterChange(event.target.value)
    }
    return (
        <div className='flex flex-col p-5'>
            <label>Filter by Code :</label>
            <select onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="10">Mortgage (Code 10)</option>
                <option value="12">Credit Card (Code 12)</option>
                <option value="5">Auto Loan (Code 5)</option>
            </select>
        </div>
    )
}
const TradelineTable = ({tradelines}) =>(
    <table className='w-full border border-collapse mt-5 border-gray-400 rounded-md'>
        <thead>
            <tr>
                <th className='w-full border p-2 border-gray-400 text-sm bg-gray-100'>Date</th>
                <th className='w-full border p-2 border-gray-400 text-sm bg-gray-100'>Code</th>
                <th className='w-full border p-2 border-gray-400 text-sm bg-gray-100'>Subcode</th>
                <th className='w-full border p-2 border-gray-400 text-sm bg-gray-100'>Monthly Payment</th>
                <th className='w-full border p-2 border-gray-400 text-sm bg-gray-100'>Balance</th>
            </tr>
        </thead>
        <tbody>
            {tradelines.map((trade, i) =>(
                <tr key={i}>
                    <td className='w-full border p-2 border-gray-400 text-sm'>{trade.date}</td>
                    <td className='w-full border p-2 border-gray-400 text-sm'>{trade.code}</td>
                    <td className='w-full border p-2 border-gray-400 text-sm'>{trade.subcode}</td>
                    <td className='w-full border p-2 border-gray-400 text-sm'>{trade.monthlyPayment.toFixed(2)}</td>
                    <td className='w-full border p-2 border-gray-400 text-sm'>{trade.balance.toFixed(2)}</td>
                </tr>
            ))}
        </tbody>
    </table>
)
export default EarnestTradeline