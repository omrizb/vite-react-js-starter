import { useRef } from 'react'

export function useTouchSwipe({
    onSwipeLeft,
    onSwipeRight,
    threshold = 50
}) {
    const startX = useRef(0)
    const endX = useRef(0)

    const onTouchStart = (ev) => {
        startX.current = ev.changedTouches[0].screenX
    }

    const onTouchEnd = (ev) => {
        endX.current = ev.changedTouches[0].screenX
        const distance = startX.current - endX.current

        if (distance > threshold && onSwipeLeft) {
            onSwipeLeft()
        } else if (distance < -threshold && onSwipeRight) {
            onSwipeRight()
        }
    }

    return {
        onTouchStart,
        onTouchEnd
    }
}
