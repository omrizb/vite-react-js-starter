import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Carousel.scss'

export function Carousel({
    items,
    autoPlay = true,
    interval = 5000,
    className = '',
    slideHeight = '400px',
    showTextOverlay = true,
    textOverlayPosition = 'bottom',
    textOverlayBackground = 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)',
    textOverlayColor = '#ffffff'
}) {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(autoPlay)

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
    }

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    useEffect(() => {
        let timer
        if (isPlaying && autoPlay) {
            timer = setInterval(nextSlide, interval)
        }
        return () => clearInterval(timer)
    }, [isPlaying, autoPlay, interval])

    return (
        <div
            className={`carousel ${className}`}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
        >
            <div className="carousel-container">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            height: slideHeight
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <button className="carousel-button prev" onClick={prevSlide} aria-label="Previous slide">
                <FaChevronLeft />
            </button>
            <button className="carousel-button next" onClick={nextSlide} aria-label="Next slide">
                <FaChevronRight />
            </button>

            <div className="carousel-indicators">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

Carousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.node).isRequired,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
    className: PropTypes.string,
    slideHeight: PropTypes.string,
    showTextOverlay: PropTypes.bool,
    textOverlayPosition: PropTypes.oneOf(['top', 'bottom']),
    textOverlayBackground: PropTypes.string,
    textOverlayColor: PropTypes.string
} 