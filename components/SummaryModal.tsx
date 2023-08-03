import { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'

interface SummaryModalProps {
	page?: string,
	title: string,
	content: string,
	visible: boolean,
	setVisible: (data: boolean) => void
}

export default function SummaryModal({ page, visible, title, content, setVisible }: SummaryModalProps) {
	return (
		<>
			<Transition appear show={visible} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => setVisible(false)}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-[6px]" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className={`w-full max-w-4xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-[#ffffffa0] parchment-${page}`}>
									<Dialog.Title
										as="h3"
										className="text-2xl mt-2 leading-6 text-brown-800 pl-[80px]"
									>
										{title}
									</Dialog.Title>
									<div className="mt-2 pl-[80px]">
										<div className="parchment-content text-2xl text-brown-800 min-h-[500px] max-h-[600px] md:max-h-[600px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: content }}>
										</div>
									</div>

									<div className="mt-4 flex justify-center">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-transparent px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2  text-brown-800 font-bold text-3xl pl-[40px]"
											onClick={() => setVisible(false)}
										>
											Close
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}