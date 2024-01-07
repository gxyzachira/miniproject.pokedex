import styles from './Header.module.css'
import Link from 'next/link'
import { FaSearch } from "react-icons/fa";


export default function Header(){

    return(
        <>
            <div className={styles.container}>
                <Link href={'/'} className={styles.pokedex}>Pokedex</Link>
                <Link href={'/search'} className={styles.search}>
                    <FaSearch className={styles.pokeicon}/>
                    Search from Name or Pokemon Id
                </Link>              
            </div>
        </>
    )
}