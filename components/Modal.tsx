import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function Modal({
	title,
	value,
	isOpen,
	onChange,
	closeModal,
	takeAction
} : {
	value: string,
	title: string,
	isOpen: number,
	onChange: (value: string) => void,
	closeModal: () => void,
	takeAction: () => void
}) {

  return (
    <>
      <Transition appear show={isOpen > 0} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#ffffff50] p-6 text-left align-middle shadow-xl transition-all">
					<Dialog.Title
						as="h3"
						className="text-lg font-medium leading-6 text-white"
					>
						{title}
					</Dialog.Title>
					<div className='flex justify-between gap-5'>
						<input
							className='w-full cursor-default overflow-hidden rounded-md border-2 border-[#ffffff80] bg-[#ffffff30] text-left text-xl shadow-md focus:outline-none px-6 py-2 backdrop-blur-[6px] leading-5 text-[#dddddd] outline-none focus:ring-0 placeholder-blue-gray-100'
							value={value}
							onChange={(e) => onChange(e.target.value)}
						/>
						<button
							type="button"
							className="inline-flex justify-center rounded-md border-2 border-[#ffffff80] bg-[#ffffff30] px-2 py-1 text-xl font-medium text-[#dddddd] active:bg-blue-200/20 focus:bg-[#ffffff30] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-20 "
							onClick={() => takeAction()}
						>
							OK
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
