import Select, { Props as SelectProps } from 'react-select';

interface CustomSelectProps extends SelectProps {
    label: string;
    id: string;
}

export default function CustomSelect({ label, id, ...props }: CustomSelectProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Select
                id={id}
                className="mt-1"
                {...props}
            />
        </div>
    );
};
