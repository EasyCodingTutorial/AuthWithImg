import React from 'react'

export const metadata = {
    title: "Home - Easy Coding Tutorial"
}

// For Components
import { UserInfo } from '@/Components/UserInfo/UserInfo'


const HomePage = () => {
    return (
        <UserInfo />
    )
}

export default HomePage