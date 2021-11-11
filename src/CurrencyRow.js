import React from 'react'

const CurrencyRow = ({currencyOptions, selectCurrency, onChangeCurrency}) => {
    return (
        <div>
           <input type="number" className='input'/>
            <select value={selectCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>

                ))}
            </select>
        </div>
    )
}

export default CurrencyRow
