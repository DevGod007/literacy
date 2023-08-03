"use client"

import { useState } from 'react'
import Image from 'next/image'

import { OPENAI_API_KEY } from '@/lib/consts'

import LanguageBox from '@/components/LanguageBox'
import SummaryModal from '@/components/SummaryModal'

import { FiPlusCircle } from 'react-icons/fi'
import Modal from '@/components/Modal'

export default function ElonPage() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isNOpen, setIsNOpen] = useState<number>(0);
	const [newValue, setNewValue] = useState<string>('');

	const [tasks, setTasks] = useState<string[]>([]);
	const [steps, setSteps] = useState<string[]>([]);
	const [contexts, setContexts] = useState<string[]>([]);

	const [persona, setPersona] = useState<string>("");
	const [goal, setGoal] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [language, setLanguage] = useState<string>("English");
	const [contentLoading, setContentLoading] = useState(false);

	const fetchBookContent = async () => {
		let prompt = `
			Act as ${persona}
			Write me ${goal}
		`;

		tasks.map(item => {
			prompt += item;
		});
		steps.map(item => {
			prompt += item;
		});
		contexts.map(item => {
			prompt += item;
		});

		prompt += `
			Reply in this language: ${language}
		`

		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${OPENAI_API_KEY}`
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'user',
						content: prompt
					}
				]
			})
		});

		const resp = await response.json();

		try {
			if (resp?.choices[0]?.message.content) {
				let message = resp?.choices[0]?.message.content as string;
				const convertedMessage = message.replaceAll('\n', '<br />');
				console.log(resp);
				setContent(convertedMessage);
				setContentLoading(false);
				setIsOpen(true);
			}
		} catch(error) {
			setContentLoading(false);
		}
	}

	// Handle when user clicks generate button
	const handleGenerate = () => {
		if (persona != "" && goal != "" && tasks.length) {
			setContentLoading(true);
			fetchBookContent();
		}
	}

	const handleAddTask = () => {
		setNewValue('');
		setIsNOpen(1);
	}

	const handleAddStep = () => {
		setNewValue('');
		setIsNOpen(2);
	}

	const handleAddContext = () => {
		setNewValue('');
		setIsNOpen(3);
	}

	const addNewData = () => {
		const value = newValue;
		if(isNOpen == 1) {
			setTasks([
				...tasks,
				value
			]);
		} else if(isNOpen == 2) {
			setSteps([
				...steps,
				value
			]);
		} else if(isNOpen == 3) {
			setContexts([
				...contexts,
				value
			]);
		}
		setIsNOpen(0);
	}

	return (
		<main className="flex justify-center min-h-screen back-elon">
			{/* <Header /> */}
			<div className="fixed flex flex-col items-center sm:top-[30px] md:top-[50px] lg:w-[480px] md:w-96 sm:w-80">
				<div className='flex flex-col justify-center items-center man-elon'>
					<Image src={'/img/man-elon.png'} alt='man' width={400} height={400} className='sm: w-[250px] sm:h-[250px] md:w-[320px] md:h-[320px] mt-[-55px] md:mt-[-70px]' />
					<span className={`font-alkatra mt-[-30px] text-white font-semibold text-5xl sm:text-5xl md:text-6xl z-10`}>Smart Elon</span>
				</div>
				<div className='my-1 w-full flex gap-2'>
					<input
						className='w-full cursor-default overflow-hidden rounded-md border-2 border-[#ffffff80] bg-[#00000030] text-center text-xl shadow-md focus:outline-none px-6 py-2 backdrop-blur-[6px] leading-5 text-[#dddddd] outline-none focus:ring-0 placeholder-blue-gray-100'
						value={persona}
						placeholder='Simule un Persona'
						onChange={(event) => setPersona(event.target.value)}
					/>
					<input
						className='w-full cursor-default overflow-hidden rounded-md border-2 border-[#ffffff80] bg-[#00000030] text-center text-xl shadow-md focus:outline-none px-6 py-2 backdrop-blur-[6px] leading-5 text-[#dddddd] outline-none focus:ring-0 placeholder-blue-gray-100'
						value={goal}
						placeholder='YOUR GOAL'
						onChange={(event) => setGoal(event.target.value)}
					/>
				</div>

				{/*  */}
				<div className='my-1 w-full grid grid-cols-3 gap-2'>
					<div className='flex justify-center items-center text-center rounded-md bg-[#00000030] text-[#dddddd] border-2 border-[#ffffff80] backdrop-blur-[6px]'>
						GIVE SPECIFIC TASKS
					</div>
					<div className='flex justify-center items-center text-center rounded-md bg-[#00000030] text-[#dddddd] border-2 border-[#ffffff80] backdrop-blur-[6px]'>
						BREAK THE PROMPT IN STEPS
					</div>
					<div className='flex justify-center items-center text-center rounded-md bg-[#00000030] text-[#dddddd] border-2 border-[#ffffff80] backdrop-blur-[6px]'>
						GIVE CONTEXT
					</div>
				</div>

				{/*  */}
				<div className='my-1 w-full grid grid-cols-3 gap-2'>
					<div className='w-full flex flex-col gap-1 max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-50/50 scrollbar-thumb-rounded-md'>
						{
							tasks.map((item, index) => {
								return (
									<div key={index} className='w-max min-w-full flex py-1 px-1 justify-center items-center text-center rounded-md bg-[#00000030] text-[#dddddd] border-2 border-[#ffffff80]'>
										{item}
									</div>
								)
							})
						}
					</div>
					
					<div className='w-full flex flex-col gap-1 max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-50/50 scrollbar-thumb-rounded-md'>
						{
							steps.map((item, index) => {
								return (
									<div key={index} className='w-max min-w-full flex py-1 px-1 justify-center items-center text-center rounded-md bg-[#00000030] text-[#dddddd] border-2 border-[#ffffff80]'>
										{item}
									</div>
								)
							})
						}
					</div>

					<div className='w-full flex flex-col gap-1 max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-50/50 scrollbar-thumb-rounded-md'>
						{
							contexts.map((item, index) => {
								return (
									<div key={index} className='w-max min-w-full flex py-1 px-1 justify-center items-center text-center rounded-md bg-[#00000030] text-[#dddddd] border-2 border-[#ffffff80]'>
										{item}
									</div>
								)
							})
						}
					</div>
				</div>

				{/* + buttons */}
				<div className='my-1 w-full grid grid-cols-3 gap-2'>
					<div className='w-full flex py-1 justify-center items-center text-center rounded-md bg-[#00000030] text-[#dddddd] border-2 border-[#ffffff80] backdrop-blur-[6px]'
						onClick={handleAddTask}
					>
						<FiPlusCircle />
					</div>
					<div className='w-full flex py-1 justify-center items-center text-center rounded-md bg-[#00000030] text-[#dddddd] border-2 border-[#ffffff80] backdrop-blur-[6px]'
						onClick={handleAddStep}
					>
						<FiPlusCircle />
					</div>
					<div className='w-full flex py-1 justify-center items-center text-center rounded-md bg-[#00000030] text-[#dddddd] border-2 border-[#ffffff80] backdrop-blur-[6px]'
						onClick={handleAddContext}
					>
						<FiPlusCircle />
					</div>
				</div>

				<div className='flex w-full justify-center items-center text-center rounded-md bg-[#00000030] text-[#dddddd] border-2 border-[#ffffff80] backdrop-blur-[6px]'>
					OUTPUT OF YOUR PROMPT
				</div>

				<div className='grid grid-cols-10 w-full g-2 my-1'>
					<div className='col-span-2'>
						<button
							type="button"
							className="inline-flex justify-center rounded-md border-2 border-[#ffffff80] bg-[#ffffff30] px-1 py-1 text-md font-medium text-[#dddddd] active:bg-blue-200/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full "
						>
							Traduct in en
						</button>
					</div>
					<div className='col-span-4 col-end-8'>
						<LanguageBox value={language} handleChange={setLanguage} />						
					</div>
				</div>

				<div className='flex justify-center w-60'>
					<button
						type="button"
						className="inline-flex justify-center rounded-md border-2 border-[#ffffff80] bg-[#ffffff30] px-10 py-4 text-xl font-medium text-[#dddddd] active:bg-blue-200/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full "
						onClick={() => handleGenerate()}
					>
						Generate
					</button>
				</div>

				<div className='flex justify-center'>
					{
						contentLoading ? (
							<Image src={'/img/hourglass.png'} width={200} height={200} alt='hourglass' className='hourglass w-[150px] h-[150px] md:w-[200px] md:h-[200px]' />
						) : (
							<></>
						)
					}
				</div>
			</div>

			{/* ------------- Modal ------------ */}
			<Modal
				isOpen={isNOpen}
				title='Add New'
				closeModal={() => setIsNOpen(0)}
				takeAction={() => addNewData()}
				value={newValue}
				onChange={setNewValue}
			/>
			<SummaryModal page='elon' visible={isOpen} setVisible={setIsOpen} title={`${persona}`} content={content} />
		</main>
	)
}
