import { useEffect, useRef, useState } from 'react'

export function Tooltip({ txt, children, screenMargin = 10 }) {

    const Y_OFFSET = -30

    const timeOutId = useRef(null)
    const tooltipRef = useRef(null)
    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [style, setStyle] = useState()

    const minX = screenMargin
    const maxX = window.innerWidth - screenMargin
    const minY = screenMargin

    useEffect(() => {
        if (!tooltipRef.current || !containerRef.current) return

        const xOffset = getHorizontalOffset()
        const yOffset = getVerticalOffset()

        setStyle({
            ...xOffset,
            ...yOffset,
            opacity: 1
        })
    }, [isVisible])

    function getHorizontalOffset() {
        const containerRect = containerRef.current.getBoundingClientRect()
        const containerWidth = containerRef.current.offsetWidth
        const tooltipWidth = tooltipRef.current.offsetWidth

        const leftOffset = (containerWidth - tooltipWidth) / 2

        if (containerRect.x + leftOffset < minX) {
            return { left: 0 }
        } else if (containerRect.x + leftOffset + tooltipWidth > maxX) {
            return { right: 0 }
        } else {
            return { left: `${leftOffset}px` }
        }
    }

    function getVerticalOffset() {
        const containerRect = containerRef.current.getBoundingClientRect()

        if (containerRect.y + Y_OFFSET > minY) {
            return { top: `${Y_OFFSET}px` }
        } else {
            return { bottom: `${Y_OFFSET / 2}px` }
        }
    }

    function handleMouseEnter() {
        timeOutId.current = setTimeout(() => setIsVisible(true), 500)
    }

    function handleMouseLeave() {
        clearTimeout(timeOutId.current)
        setIsVisible(false)
        setStyle({})
    }

    return (
        <div
            ref={containerRef}
            className="tooltip-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isVisible && <div ref={tooltipRef} className="tooltip" style={style}>{txt}</div>}
        </div>
    )
}