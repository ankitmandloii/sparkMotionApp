import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

// You would likely pass 'options' and 'status/setStatus' as props in a real app
const StatusSelector = () => {
    // 1. Define the possible options and the current state
    const options = [
        { id: 1, name: 'Active', value: 'active' },
        { id: 2, name: 'Inactive', value: 'inactive' },
    ];
    // Find the default active state
    const [selectedStatus, setSelectedStatus] = useState(options[0]);

    // Helper function for conditionally joining class names
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <Listbox value={selectedStatus} onChange={setSelectedStatus}>
            {({ open }) => (
                <div className="relative">
                    <label htmlFor="status" className="block text-sm font-bold text-[var(--color-text-base)]">
                        Status
                    </label>
                    <div className="mt-2">
                        {/* The Custom Button (replaces the <select> field) */}
                        <Listbox.Button
                            // Apply the same styling you had on the original <select>
                            className={classNames(
                                'relative w-full cursor-default rounded-md bg-[var(--color-surface-input)]',
                                'py-[6px] pl-[12px] pr-10 text-left text-sm text-[var(--color-text-base)]',
                                'outline-none border transition-colors duration-200',
                                // Match the focus/ring styling of your theme
                                'focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]'
                            )}
                        >
                            {/* Display the selected value */}
                            <span className="block truncate">{selectedStatus.name}</span>
                            {/* Icon for the dropdown arrow */}
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDown 
                                    className="h-5 w-5 text-gray-400" 
                                    aria-hidden="true" 
                                />
                            </span>
                        </Listbox.Button>

                        {/* The Options Menu (replaces the native dropdown) */}
                        <Listbox.Options
                            // Styling for the dropdown container/menu
                            className={classNames(
                                'absolute z-10 mt-1 w-full overflow-auto rounded-md shadow-lg',
                                'bg-[var(--color-surface-background)] border border-[var(--border-color)]',
                                'max-h-60 text-sm focus:outline-none'
                            )}
                        >
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.id}
                                    value={option}
                                    // Use the 'active' and 'selected' state for styling
                                    className={({ active }) =>
                                        classNames(
                                            // Base class for all options
                                            'relative cursor-default select-none py-2 pl-[12px] pr-4 text-sm',
                                            // Custom styling for the selected (blue) and hover (darker background) state
                                            active
                                                ? 'bg-orange-600 text-white' // Matches your blue highlight
                                                : 'text-[var(--color-text-base)] hover:bg-gray-800' // Dark base, subtle hover
                                        )
                                    }
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span 
                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
                                            >
                                                {option.name}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </div>
            )}
        </Listbox>
    );
};
export default StatusSelector