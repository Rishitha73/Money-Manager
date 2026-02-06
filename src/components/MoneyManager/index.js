import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {optionId: 'INCOME', displayText: 'Income'},
  {optionId: 'EXPENSES', displayText: 'Expenses'},
]

class MoneyManager extends Component {
  state = {
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: 'INCOME',
    transactionsList: [],
  }

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateAmount = event => {
    this.setState({amount: event.target.value})
  }

  updateType = event => {
    this.setState({type: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()

    const {title, amount, type} = this.state

    if (title === '' || amount === '') return

    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }

    this.setState(prev => ({
      transactionsList: [...prev.transactionsList, newTransaction],
      income: type === 'INCOME' ? prev.income + Number(amount) : prev.income,
      expenses:
        type === 'EXPENSES' ? prev.expenses + Number(amount) : prev.expenses,
      title: '',
      amount: '',
      type: 'INCOME',
    }))
  }

  deleteTransaction = id => {
    this.setState(prev => {
      const deletedItem = prev.transactionsList.find(each => each.id === id)

      const updatedList = prev.transactionsList.filter(each => each.id !== id)

      return {
        transactionsList: updatedList,
        income:
          deletedItem.type === 'INCOME'
            ? prev.income - Number(deletedItem.amount)
            : prev.income,
        expenses:
          deletedItem.type === 'EXPENSES'
            ? prev.expenses - Number(deletedItem.amount)
            : prev.expenses,
      }
    })
  }

  render() {
    const {income, expenses, title, amount, type, transactionsList} = this.state

    const balance = income - expenses

    return (
      <div className="app-container">
        <div className="header-card">
          <h1>Hi, Richard</h1>
          <p>Welcome back to your Money Manager</p>
        </div>

        <MoneyDetails income={income} expenses={expenses} balance={balance} />

        <div className="bottom-container">
          <form className="form" onSubmit={this.addTransaction}>
            <h2>Add Transaction</h2>

            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={this.updateTitle}
            />

            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={this.updateAmount}
            />

            <label htmlFor="type">TYPE</label>
            <select id="type" value={type} onChange={this.updateType}>
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>

            <button type="submit">Add</button>
          </form>

          <div className="history">
            <h2>History</h2>

            <div className="history-header">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>

            <ul>
              {transactionsList.map(each => (
                <TransactionItem
                  key={each.id}
                  transactionDetails={each}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
