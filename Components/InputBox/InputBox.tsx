import React from 'react'

import styles from './InputBox.module.css'

// For Props
interface InputBoxProps {
    labelText: string,
    Id: string,
    InputType: string,
    value: string,
    fieldValidation?: string,
    onchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = (
    {
        labelText,
        Id,
        InputType,
        value,
        fieldValidation,
        onchange
    }: InputBoxProps
) => {
    return (
        <div className={styles.InputBox}>
            <label htmlFor={Id}>{labelText}</label>
            {
                fieldValidation && (
                    <span className={styles.ErrorMessage}>{fieldValidation}</span>
                )
            }
            <br />
            <input
                type={InputType}
                id={Id}
                value={value}
                onChange={onchange}
                className={fieldValidation ? styles.InputError : ''}
            />
        </div>
    )
}
