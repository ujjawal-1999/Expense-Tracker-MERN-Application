import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({ transaction }) => {
    const { deleteTransactions } = useContext(GlobalContext);

    const sign = transaction.amount < 0 ? '-' : '+';
    return (
        <li className={transaction.amount< 0 ? 'minus' : 'plus'}>
            {transaction.text} <span>{sign}&#8377;{numberWithCommas(Math.abs(transaction.amount))}</span>
            <button onClick={()=> deleteTransactions(transaction._id)} className="delete-btn">x</button>
        </li>
    )
}
