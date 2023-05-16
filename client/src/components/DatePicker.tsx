import React, {useEffect, useRef} from 'react';
import $ from "jquery";


const DatePicker = () => {
    let inputref = useRef();
    useEffect(()=>{
        if (!inputref.current) return;
        // @ts-ignore
        $('.datepicker').datepicker();
    },[inputref.current])
    return (
        <div className="input-group date" data-provide="datepicker">
            <input onLoad={()=>{
                console.log(1)}} type="text" className="form-control"/>
                <div className="input-group-addon">
                    <span className="glyphicon glyphicon-th"></span>
                </div>
        </div>
    );
};

export default DatePicker;