import { useState } from 'react'
import PropTypes from 'prop-types'
import './Tabs.scss'

export function Tabs({ tabs, defaultActiveTab = 0, className = '' }) {

    const [activeTab, setActiveTab] = useState(defaultActiveTab)

    return (
        <div className={`tabs ${className}`}>
            <div className="tabs-header">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab-button ${activeTab === index ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                        role="tab"
                        aria-selected={activeTab === index}
                        aria-controls={`tabpanel-${index}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tabs-content">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        id={`tabpanel-${index}`}
                        className={`tab-panel ${activeTab === index ? 'active' : ''}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${index}`}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    )
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node.isRequired,
            content: PropTypes.node.isRequired,
        })
    ).isRequired,
    defaultActiveTab: PropTypes.number,
    className: PropTypes.string,
} 