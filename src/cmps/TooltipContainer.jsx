import { useEffect, useRef, useState } from 'react'
import { showTooltip } from '../services/event-bus.service'

export function TooltipContainer({ txt, children, screenMargin = 10 }) {

    const timeOutId = useRef(null)
    const tooltipRef = useRef(null)
    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    const minX = screenMargin
    const maxX = window.innerWidth - screenMargin
    const minY = screenMargin

    useEffect(() => {
        if (!tooltipRef.current || !containerRef.current) return

        const xOffset = getHorizontalOffset()
        const yOffset = getVerticalOffset()

        const style = {
            ...xOffset,
            ...yOffset,
            opacity: 1
        }

        showTooltip({
            isVisible,
            txt,
            style
        })

    }, [isVisible])

    function getHorizontalOffset() {
        const containerRect = containerRef.current.getBoundingClientRect()
        const containerWidth = containerRef.current.offsetWidth
        const tooltipWidth = tooltipRef.current.offsetWidth

        const leftOffset = (containerWidth - tooltipWidth) / 2

        if (containerRect.x + leftOffset < minX) {
            return { left: `${containerRect.x + leftOffset}px` }
        } else if (containerRect.x + leftOffset + tooltipWidth > maxX) {
            return { right: screenMargin }
        } else {
            return { left: `${containerRect.x + leftOffset}px` }
        }
    }

    function getVerticalOffset() {
        const containerRect = containerRef.current.getBoundingClientRect()
        const tooltipHeight = tooltipRef.current.offsetHeight

        if (containerRect.y - tooltipHeight > minY) {
            return { top: `${containerRect.y - tooltipHeight - 10}px` }
        } else {
            return { top: `${containerRect.y + tooltipHeight + 30}px` }
        }
    }

    function handleMouseEnter() {
        timeOutId.current = setTimeout(() => setIsVisible(true), 800)
    }

    function handleMouseLeave() {
        clearTimeout(timeOutId.current)
        setIsVisible(false)
    }

    return (
        <div
            ref={containerRef}
            className="tooltip-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {<div ref={tooltipRef} className="tooltip-ref" style={{ visibility: 'hidden' }}>{txt}</div>}
        </div>
    )
}