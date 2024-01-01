import styles from './Header.module.css'
import Link from 'next/link'
import Home from '@/app/page'

export default function Header(){

    return(
        <>
            <div className={styles.container}>
                <Link href={'/'} className={styles.home}>Home</Link>
                <Link href={'/'} className={styles.pokedex}>PokeDex</Link>              
            </div>
        </>
    )
}