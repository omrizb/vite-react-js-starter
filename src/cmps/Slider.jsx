import { useEffect, useRef, useState } from 'react'

export function Slider({ value = 50, min = 0, max = 100, setOnMouseup = false, onChange }) {

    const nonActiveBarRef = useRef(null)
    const pointerRef = useRef(null)
    const [sliderWidth, setSliderWidth] = useState(null)
    const [sliderValue, setSliderValue] = useState(value)
    const [pointerOffset, setPointerOffset] = useState(null)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        if (!nonActiveBarRef.current || !pointerRef.current) return

        updateWidth()
        const resizeObserver = new ResizeObserver(updateWidth)
        resizeObserver.observe(nonActiveBarRef.current)

        return () => resizeObserver.disconnect()
    }, [])

    useEffect(() => {
        onSetPointerOffset(sliderValue)
    }, [sliderWidth])

    useEffect(() => {
        if (!isDragging) setPointerOffset(value)
    }, [value])

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])

    useEffect(() => {
        if (!onChange) return

        if (!setOnMouseup) {
            onChange(sliderValue)
        }
    }, [sliderValue])

    function updateWidth() {
        const nonActiveBarWidth = nonActiveBarRef.current.offsetWidth
        const pointerWidth = pointerRef.current.offsetWidth
        setSliderWidth(nonActiveBarWidth - pointerWidth)
    }

    function onSetPointerOffset(value) {
        const newOffset = sliderWidth * (value - min) / (max - min)

        if (newOffset > sliderWidth) {
            setSliderValue(max)
            setPointerOffset(sliderWidth)
        }
        else if (newOffset < 0 || isNaN(newOffset)) {
            setSliderValue(min)
            setPointerOffset(0)
        }
        else {
            setSliderValue(value)
            setPointerOffset(newOffset)
        }
    }

    function calcNewValue(ev) {
        const sliderRect = nonActiveBarRef.current.getBoundingClientRect()
        const pointerXOffset = ev.clientX - sliderRect.left
        return min + pointerXOffset / sliderWidth * (max - min)
    }

    function handleMouseDown(ev) {
        ev.preventDefault()
        const newValue = calcNewValue(ev)
        onSetPointerOffset(newValue)
        setIsDragging(true)
    }

    function handleMouseMove(ev) {
        ev.preventDefault()
        const newValue = calcNewValue(ev)
        onSetPointerOffset(newValue)
    }

    function handleMouseUp(ev) {
        ev.preventDefault()
        setIsDragging(false)
        if (setOnMouseup) {
            const finalValue = calcNewValue(ev)
            onSetPointerOffset(finalValue)
            setSliderValue(finalValue)
            onChange(finalValue)
        }
    }

    return (
        <div className="slider" onMouseDown={handleMouseDown}>
            <div ref={nonActiveBarRef} className="non-active-bar"></div>
            <div className="active-bar" style={{ width: pointerOffset }}></div>
            <div ref={pointerRef} className="pointer" style={{ left: pointerOffset }}></div>
        </div>
    )
}