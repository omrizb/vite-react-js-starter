import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaChevronDown } from 'react-icons/fa'
import './Dropdown.scss'

export function Dropdown({
    trigger,
    children,
    position = 'bottom',
    className = '',
    onOpen,
    onClose
}) {

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
        if (isOpen) {
            onClose?.()
        } else {
            onOpen?.()
        }
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
            onClose?.()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div
            ref={dropdownRef}
            className={`dropdown ${className} ${position}`}
        >
            <div
                className="dropdown-trigger"
                onClick={toggleDropdown}
                role="button"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {trigger}
                <FaChevronDown className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
            </div>

            {isOpen && (
                <div className="dropdown-content">
                    {children}
                </div>
            )}
        </div>
    )
}

Dropdown.propTypes = {
    trigger: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    className: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
} 