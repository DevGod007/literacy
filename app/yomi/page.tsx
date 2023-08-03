"use client"

import { useState, useEffect, Fragment } from 'react'
import Image from 'next/image'

import { OPENAI_API_KEY, PERSONALITIES } from '@/lib/consts'

import EComobBox from '@/components/ECombobox'
import LanguageBox from '@/components/LanguageBox'
import SummaryModal from '@/components/SummaryModal'

export default function YomiPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [personality, setPersonality] = useState<string>("");
	const [question, setQuestion] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [language, setLanguage] = useState<string>("English");
	const [contentLoading, setContentLoading] = useState(false);

	const fetchBookContent = async () => {
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
						content: `I want you to play as if you were multipersonal 

I want you to answer the questions by pretending to be the person in the next message.

The person: ${personality}

You have to use all the knowledge you have about this character.
Respect the personality, the phrasing, the knowledge of this character.
You must never lie.
When you can't answer, write "Sorry, I don't know". 
Adapt to the language requested in the message. 
You have to give a long and detailed answer.
A very precise answer that goes into great detail
At the beginning of the message, don't explain anything, just give a brief presentation of the character you're playing.
Adapt the way you talk about your characters.

I want this so that I can ask any celebrity or historical figure a question.
The question is "${question}".
Reply in this language:${language}`
					}
				]
			})
		});

		const resp = await response.json();

		try {
			if (resp?.choices[0]?.message.content) {
				let message = resp?.choices[0]?.message.content as string;
				const convertedMessage = message.replaceAll('\n', '<br />');
				setContent(convertedMessage);
				setContentLoading(false);
				setIsOpen(true);
			}
		} catch {
			setContentLoading(false);
			console.log("Error occured");
		}
	}

	// Handle when user clicks generate button
	const handleGenerate = () => {
		if (question != "") {
			setContentLoading(true);
			fetchBookContent();
		}
	}

	const handleQuestionChange = (title: string) => {
		setQuestion(title);
	}

	return (
		<main className="flex justify-center min-h-screen back-yomi">
			<div className="fixed flex flex-col items-center sm:top-[30px] md:top-[50px] md:w-96 sm:w-80">
				<div className='flex flex-col justify-center items-center man'>
					{/* <Image src={'/img/hat.png'} alt='hat' width={150} height={120} className='hat z-20 pl-2 w-[112px] h-[90px] md:w-[150px] md:h-[120px]' /> */}
					<Image src={'/img/man-yomi.png'} alt='man' width={400} height={400} className='sm: w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]' />
					<span className={`font-alkatra mt-[-30px] text-white font-semibold text-5xl sm:text-5xl md:text-6xl z-10`}>Smart-Yomi</span>
				</div>
				<div className='my-2 w-full'>
					<EComobBox
						value={personality}
						placeholder='Choose your personality'
						handleChange={setPersonality}
						choices={PERSONALITIES}
					/>
				</div>
				<div className='mb-2 w-full'>
					<textarea
						className='w-full cursor-default overflow-hidden rounded-lg border-2 border-[#ffffff80] bg-[#ffffff30] text-center text-lg shadow-md focus:outline-none px-8 py-4 backdrop-blur-[6px] leading-5 text-[#dddddd] outline-none focus:ring-0'
						value={question}
						rows={2}
						placeholder='ASK YOUR QUESTION?'
						onChange={(event) => handleQuestionChange(event.target.value)}
					/>
				</div>

				<div className='flex justify-center w-52 mb-8'>
					<LanguageBox value={language} handleChange={setLanguage} />
				</div>

				<div className='flex justify-center w-60'>
					<button
						type="button"
						className="inline-flex justify-center rounded-md border-2 border-[#ffffff80] bg-[#ffffff30] px-10 py-4 text-xl font-medium text-[#dddddd] active:bg-blue-200/20 focus:bg-[#ffffff30] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full "
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
			<SummaryModal page='yomi' visible={isOpen} setVisible={setIsOpen} title={`${question}`} content={content} />
		</main>
	)
}
