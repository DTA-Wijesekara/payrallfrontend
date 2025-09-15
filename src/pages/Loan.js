import React, { useEffect, useState } from "react";

export default function Loan() {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [repayments, setRepayments] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState("");

  // ✅ Load all loans
  useEffect(() => {
    fetch("/api/loan")
      .then((res) => res.json())
      .then(setLoans)
      .catch((err) => console.error("Error fetching loans", err));
  }, []);

  // ✅ Fetch repayments when a loan is selected
  const fetchRepayments = (loanId) => {
    fetch(`/api/LoanRepayment/${loanId}/repayments`)
      .then((res) => res.json())
      .then(setRepayments)
      .catch((err) => console.error("Error fetching repayments", err));
  };

  // ✅ Handle loan click
  const handleSelectLoan = (loan) => {
    setSelectedLoan(loan);
    fetchRepayments(loan.id);
  };

  // ✅ Add repayment
  const handleRepayment = async (e) => {
    e.preventDefault();
    if (!paymentAmount || paymentAmount <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      const res = await fetch(`/api/LoanRepayment/${selectedLoan.id}/repayments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentAmount: parseFloat(paymentAmount),
          paymentDate: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to add repayment");

      const newRepayment = await res.json();
      setRepayments([...repayments, newRepayment]);
      setSelectedLoan({
        ...selectedLoan,
        remainingBalance: newRepayment.remainingBalance,
      });
      setPaymentAmount("");
    } catch (err) {
      console.error(err);
      alert("Error while adding repayment");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Loan List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-bold mb-3">Loans</h2>
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Employee ID</th>
              <th className="p-2 border">Principal</th>
              <th className="p-2 border">Rate (%)</th>
              <th className="p-2 border">Term (months)</th>
              <th className="p-2 border">Balance</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-gray-50">
                <td className="p-2 border">{loan.id}</td>
                <td className="p-2 border">{loan.employeID}</td>
                <td className="p-2 border">{loan.principalAmount}</td>
                <td className="p-2 border">{loan.interestRate}</td>
                <td className="p-2 border">{loan.termMonths}</td>
                <td className="p-2 border">{loan.remainingBalance}</td>
                <td className="p-2 border">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => handleSelectLoan(loan)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loan Details + Repayments */}
      {selectedLoan && (
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold mb-3">
            Loan #{selectedLoan.id} Details
          </h2>
          <p>Employee ID: {selectedLoan.employeID}</p>
          <p>Principal: {selectedLoan.principalAmount}</p>
          <p>Interest Rate: {selectedLoan.interestRate}%</p>
          <p>Monthly Installment: {selectedLoan.monthlyInstallment}</p>
          <p className="font-semibold">
            Remaining Balance: {selectedLoan.remainingBalance}
          </p>

          {/* Repayments Table */}
          <h3 className="text-md font-bold mt-4 mb-2">Repayments</h3>
          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Month</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Principal</th>
                <th className="p-2 border">Interest</th>
                <th className="p-2 border">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {repayments.length > 0 ? (
                repayments.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{r.monthNo}</td>
                    <td className="p-2 border">
                      {new Date(r.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border">{r.installmentAmount}</td>
                    <td className="p-2 border">{r.principalPaid}</td>
                    <td className="p-2 border">{r.interestPaid}</td>
                    <td className="p-2 border">{r.remainingBalance}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-2 border text-center text-gray-500">
                    No repayments yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Repayment Form */}
          <form onSubmit={handleRepayment} className="mt-4 flex gap-2">
            <input
              type="number"
              step="0.01"
              className="border p-2 rounded w-40"
              placeholder="Payment amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Make Repayment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
