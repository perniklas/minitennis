import ReactSelect, { Options } from "react-select";

export interface OptionType {
    label: string;
    value: string;
}

export interface SelectProps {
    id?: string;
    options: OptionType[];
    value?: OptionType | OptionType[];
    placeholder: string;
    onChange?: (selected: OptionType | OptionType[]) => void;
    isOptionDisabled?: (option: OptionType, selectValue: Options<OptionType>) => boolean;
    isMulti?: boolean;
}

const Select = (props: SelectProps) => {
    const { id, options, value, onChange, isOptionDisabled, placeholder, isMulti } = props;
    const customStyles = {
        control: (base) => ({
            ...base,
            fontSize: '18px',
            border: 'solid #111d4a',
            borderRadius: '0.77rem',
            padding: '0.25rem'
        }),
        menu: (base) => ({
            ...base,
            fontSize: '18px',
        })
    };

    const handleSingleChange = (selected?: OptionType) => onChange(selected);
    const handleMultiChange = (selected?: OptionType[]) => onChange(selected);

    // ReactSelect didn't really like conditional props based on isMulti, so separate components if it is.
    if (isMulti) {
        return <ReactSelect
            id={id}
            styles={customStyles}
            options={options}
            value={value}
            onChange={handleMultiChange}
            isOptionDisabled={isOptionDisabled}
            isMulti
            closeMenuOnSelect={false}
            placeholder={placeholder}
            noOptionsMessage={() => 'No options available'}
        />;
    } else {
        return <ReactSelect
            id={id}
            styles={customStyles}
            options={options}
            value={value}
            onChange={handleSingleChange}
            isOptionDisabled={isOptionDisabled}
            placeholder={placeholder}
            noOptionsMessage={() => 'No options available'}
        />;
    }

};

export default Select;