import { useSelector, useDispatch } from 'react-redux'
import { updateInput } from './SearchSlice'
import styles from "./search.module.css"

export default function Search() {
    const searchInput = useSelector((state) => state.searchInput.value)
    const dispatch = useDispatch()
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log("onEnter:", event.target.value)
            dispatch(updateInput(event.target.value))
        }
    }
    return (
        <input className={styles.input} placeholder="search by name..." onKeyDown={handleKeyDown} />
    )
}