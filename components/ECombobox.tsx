import { Fragment } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface EComboBoxProps {
	value: string;
	placeholder?: string;
	handleChange: (data: string) => void;
	choices: string[]
}

export default function EComobBox({ value, placeholder, handleChange, choices }: EComboBoxProps) {
	const handleInputChange = (data: string) => {
		handleChange(data);
	}

	return (
		<>
			<Combobox value={value} onChange={handleChange}>
				<div className="relative mt-1 z-10">
					<div className="relative w-full cursor-default overflow-hidden rounded-lg border-2 border-[#ffffff80] bg-[#ffffff30] text-left shadow-md focus:outline-none focus:border-none text-lg px-4 py-2 backdrop-blur-sm">
						<Combobox.Input
							className="w-full border-none bg-transparent py-2 px-2 leading-5 text-[#dddddd] outline-none focus:ring-0 text-center"
							displayValue={(val: string) => val}
							placeholder={placeholder ?? ""}
							onChange={(event) => handleInputChange(event.target.value)}
						/>
						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border-2 border-[#ffffff80] bg-[#ffffff30] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm backdrop-blur-sm">
							{choices.length === 0 ? (
								<div className="relative cursor-default select-none py-2 px-4 text-[#dddddd]">
									Nothing found.
								</div>
							) : (
								choices.filter((item) =>
									item.toLowerCase().replace(/\s+/g, '').includes(value.toLowerCase().replace(/\s+/g, ''))
								).map((choice: string, index: number) => (
									<Combobox.Option
										key={index}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-3 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-[#dddddd]'
											}`
										}
										value={choice}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${selected ? 'font-medium' : 'font-normal'
														}`}
												>
													{choice}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
															}`}
													>
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</>
	)
}