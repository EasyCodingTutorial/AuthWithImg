"use client"
import React from 'react'

import styles from './UserInfo.module.css'

import { signOut, useSession } from 'next-auth/react'
import ParentLoading_Animation from '@/app/loading'

export const UserInfo = () => {

    const { data: session, status } = useSession()

    if (status === 'loading') {
        <ParentLoading_Animation />
    }

    if (status === 'authenticated') {
        return (
            <div className={styles.Info}>
                <div>
                    <img src={session?.user?.image || ""} alt="" />
                    <h6>Welcome : <span>{session?.user?.name}</span></h6>
                    <h6>Email : <span>{session?.user?.email}</span></h6>
                    <button className={styles.Btn} onClick={() => signOut()}>Logout</button>

                </div>
            </div>
        )
    }


}
