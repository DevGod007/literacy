import { Fragment } from "react";
import langs from "langs"
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface LanguageBoxProps {
	value: string,
	handleChange: (data: string) => void
}

const languages = langs.all();

export default function LanguageBox({ value, handleChange }: LanguageBoxProps) {
	return (
		<>
			<Listbox value={value} onChange={handleChange} >
				<div className="relative mt-1 w-full">
					<Listbox.Button className="relative w-full cursor-default rounded-lg border-2 border-[#ffffff80] bg-[#ffffff30] py-2 pl-3 pr-5 text-center shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-[#dddddd] backdrop-blur-[6px]">
						<span className="block truncate">{value}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon className="h-5 w-5 text-[#dddddd]" aria-hidden />
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border-2 border-[#ffffff80] bg-[#ffffff30] py-1 text-[#dddddd] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm backdrop-blur-[6px]">
							{languages.map((lang, langIdx) => (
								<Listbox.Option
									key={langIdx}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-4 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-[#dddddd]'
										}`
									}
									value={lang.name}
								>
									{({ selected }) => (
										<>
											<span
												className={`block truncate ${selected ? 'font-medium' : 'font-normal'
													}`}
											>
												{lang.name}
											</span>
											{selected ? (
												<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</>
	)
}