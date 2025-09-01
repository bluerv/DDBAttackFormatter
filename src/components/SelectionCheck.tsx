import { Checkbox } from "primereact/checkbox";
import { Dispatch, SetStateAction } from "react";

interface props {
    display: string;
    isChecked: boolean;
    setIsChecked: Dispatch<SetStateAction<boolean>>
}

function SelectionCheck({display, isChecked, setIsChecked}: props) {
    return (
        <>
            <label className="col-6 justify-content-end">
                {display}:
            </label>
            <div className="col-6 justify-content-start">
                <Checkbox
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.checked ? true : false)}
                    className="w-4"
                />
            </div>
        </>
    );
}

export default SelectionCheck;
