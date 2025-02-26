import {useEffect, useState} from "react";

const useLocalStorage = (itemName, initialValue) => {
    const [item, setItem] = useState(initialValue)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        try {
            const localStorageItem = localStorage.getItem(itemName)
            let parsedItem

            if (!localStorageItem) {
                localStorage.setItem(itemName, JSON.stringify(initialValue))
            } else {
                parsedItem = JSON.parse(localStorage.getItem(itemName))
                setItem(parsedItem)
            }
            setLoading(false)
        } catch (e) {
            setError(true)
            setLoading(false)
        }
    }, [initialValue, itemName]);


    const saveItem = (newItem) => {
        localStorage.setItem(itemName, JSON.stringify(newItem))
        setItem(newItem)
    }

    return {item, saveItem, loading, error}
}
export {useLocalStorage}