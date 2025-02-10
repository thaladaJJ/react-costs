import styles from '../layout/Message.module.css'
import { useState, useEffect, use } from 'react'

function Message({ type, msg }) {
    const [visible, setVisible] = useState (false)

    useEffect (() => {

        if (!msg) {
            setVisible (false)
            return
        }

        setVisible (true)

        const timer = setTimeout (() => {
            setVisible (false)
        }, 4000)

        return () => clearTimeout (timer)
    }, [msg])

    return <>
        {visible && (
            <div className={`${styles.message} ${styles[type]}`}> {msg} </div>
        )}
    </>
       
    
}

export default Message