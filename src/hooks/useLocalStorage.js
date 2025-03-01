import {useEffect, useState, useCallback} from "react";

const useLocalStorage = (itemName, initialValue = null) => {
    // Lazy initial state to avoid parsing on every render
    const [item, setItem] = useState(() => {
        try {
            const storedItem = localStorage.getItem(itemName)
            return storedItem ? JSON.parse(storedItem) : initialValue
        } catch (error) {
            console.log('Error reading from localStorage', error)
            return initialValue
        }
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Memoize saveItem to avoid recreating on every render
    const saveItem = useCallback((newItem) => {
        try {
            const valueToStore = typeof newItem === 'function' ? newItem(item) : newItem
            localStorage.setItem(itemName, JSON.stringify(valueToStore))
            setItem(valueToStore)
            return true
        } catch (error) {
            console.log('Error saving to localStorage', error)
            setError(error)
            return false
        }
    }, [itemName, item])

    // Remove  item from localStorage
    const removeItem = useCallback(() => {
        try {
            localStorage.removeItem(itemName)
            setItem(initialValue)
            return true
        } catch (error) {
            console.log('Error removing localStorage', error)
            setError(error)
            return false
        }
    }, [itemName, initialValue])

    // Initialize on mount and when dependencies change
    useEffect(() => {
        const initialize = async () => {
            try {
                const storedItem = localStorage.getItem(itemName)

                if (!storedItem) {
                    localStorage.setItem(itemName, JSON.stringify(initialValue))
                    setItem(initialValue)
                } else {
                    setItem(JSON.parse(storedItem))
                }
                setError(null)
            } catch (error) {
                console.log('Error in localStorage initialization', error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        initialize().then()
    }, [itemName]);

    return {
        item,
        saveItem,
        removeItem,
        loading,
        error,
        reset: useCallback(() => saveItem(initialValue), [saveItem, initialValue])
    }
}
export {useLocalStorage}