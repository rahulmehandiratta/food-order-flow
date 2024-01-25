import React, {useRef} from 'react';
import {useReactToPrint} from 'react-to-print';
import {ComponentToPrint} from './componentToPrint';

const Example = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <div style={{display: "none"}}>
                <ComponentToPrint ref={componentRef}/>
            </div>
            <button onClick={handlePrint}>Print this out!</button>
        </div>
    );
};
export default Example
