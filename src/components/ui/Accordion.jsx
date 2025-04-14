import { useState } from 'react'
import PropTypes from 'prop-types'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import './Accordion.scss'

export function Accordion({ items, className = '', singleOpen = false }) {
    const [activeIndices, setActiveIndices] = useState([])

    const toggleAccordion = (index) => {
        if (singleOpen) {
            setActiveIndices(activeIndices.includes(index) ? [] : [index])
        } else {
            setActiveIndices(prev =>
                prev.includes(index)
                    ? prev.filter(i => i !== index)
                    : [...prev, index]
            )
        }
    }

    return (
        <div className={`accordion ${className}`}>
            {items.map((item, index) => (
                <div key={index} className="accordion-item">
                    <button
                        className="accordion-header"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={activeIndices.includes(index)}
                    >
                        <span>{item.title}</span>
                        {activeIndices.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    <div
                        className={`accordion-content ${activeIndices.includes(index) ? 'active' : ''}`}
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
    singleOpen: PropTypes.bool,
} 