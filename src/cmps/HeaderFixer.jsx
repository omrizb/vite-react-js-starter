import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export function HeaderFixer({ header, className, bgColor, showFromY, children }) {

    // OPACITY_SCALE is the scroll distance after showFromY during which opacity grows from 0 to 1
    const OPACITY_SCALE = 100

    const { containerRef: scrollableContainerRef } = useOutletContext()
    const [width, setWidth] = useState(0)
    const [opacity, setOpacity] = useState(0)

    useEffect(() => {
        if (!scrollableContainerRef.current) return

        updateWidth()
        const resizeObserver = new ResizeObserver(updateWidth)
        resizeObserver.observe(scrollableContainerRef.current)

        scrollableContainerRef.current.addEventListener('scroll', handleScroll)

        return () => {
            resizeObserver.disconnect()
            scrollableContainerRef.current.removeEventListener('scroll', handleScroll)
        }
    }, [])

    function updateWidth() {
        const containerWidth = scrollableContainerRef.current.getBoundingClientRect().width
        setWidth(containerWidth)
    }

    function handleScroll() {
        const scrollY = scrollableContainerRef.current.scrollTop
        if (scrollY > showFromY) {
            let newOpacity
            if (scrollY - showFromY < OPACITY_SCALE) {
                newOpacity = (scrollY - showFromY) / OPACITY_SCALE
            } else {
                newOpacity = 1
            }
            setOpacity(newOpacity)
        }
        else setOpacity(0)
    }

    const style = {
        width,
        opacity,
        zIndex: opacity ? 1000 : 0,
    }

    return (
        <>
            <div className="header-fixer">
                <div
                    className={`background ${className}`}
                    style={{ ...style, backgroundColor: bgColor }}
                ></div>
                <header className={className} style={{ ...style }}>
                    {header}
                </header>
            </div>
            {children}
        </>
    )
}