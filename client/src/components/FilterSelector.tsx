import React, {FC, useEffect, useRef} from 'react';

interface FilterSelectorProps {
    options: Array<[string, string]>,
    data: any[],
    setData: Function,
}

const FilterSelector: FC<FilterSelectorProps> = ({options, data, setData}) => {
    let selector: any =  document.querySelector(".filter-selector-list")
    let dataArray = useRef(data);
    let sortData = (e: any) => {
        let key = e.target.value;
        if(dataArray.current.length > 2)
        setData([...dataArray.current.sort((obj1: any, obj2: any) => {
                return obj1[key] > obj2[key] ? 1 : -1;
            }
        )])
    }

    useEffect(()=>{
        dataArray.current = data
    }, [data])
    useEffect(() => {
        selector?.addEventListener("change", (e: any) => sortData(e))
    }, [selector]);

    return (
        <div className={"filter-selector"}>
            <select className={"filter-selector-list"}>
                {options.map(option => <option key={option[0]} value={option[0]}>{option[1]}</option>)}
            </select>
        </div>
    );
};

export default FilterSelector;