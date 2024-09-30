import { useEffect, useState } from 'react'
import { eventBusService, SHOW_TOOLTIP } from '../services/event-bus.service'

export function Tooltip() {

    const [props, setProps] = useState(null)

    useEffect(() => {
        return eventBusService.on(SHOW_TOOLTIP, props => setProps(props))
    }, [])

    return (
        <>
            {props && props.isVisible &&
                <div className="tooltip" style={props.style}>{props.txt}</div>
            }
        </>
    )
}