import { useState } from 'react'
import PropTypes from 'prop-types'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import './Accordion.scss'

export function Accordion({ items, className = '' }) {

    const [activeIndex, setActiveIndex] = useState(null)

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <div className={`accordion ${className}`}>
            {items.map((item, index) => (
                <div key={index} className="accordion-item">
                    <button
                        className="accordion-header"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={activeIndex === index}
                    >
                        <span>{item.title}</span>
                        {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    <div
                        className={`accordion-content ${activeIndex === index ? 'active' : ''}`}
                    >
                        {item.content}
                    </div>
                </div>
            ))}
        </div>
    )
}

Accordion.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.node.isRequired,
            content: PropTypes.node.isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
} 