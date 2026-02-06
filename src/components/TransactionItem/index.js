import './index.css'

const TransactionItem = props => {
  const {transactionDetails} = props
  const {title, amount, type} = transactionDetails

  const displayType = type === 'INCOME' ? 'Income' : 'Expenses'

  return (
    <li className="transaction-item">
      <p>{title}</p>
      <p>₹{amount}</p>
      <p>{displayType}</p>
    </li>
  )
}

export default TransactionItem
