import React from 'react'

import styles from './ButtonWrapper.module.css'


const ButtonWrapper = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div className={styles.ButtonWrapper}>
            <div></div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default ButtonWrapper