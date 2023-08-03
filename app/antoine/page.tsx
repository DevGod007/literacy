"use client"

import { useState, useEffect, Fragment } from 'react'
import Image from 'next/image'

import { CATEGORIES, OPENAI_API_KEY, PERSONALITIES } from '@/lib/consts'

import EComobBox from '@/components/ECombobox'
import LanguageBox from '@/components/LanguageBox'
import SummaryModal from '@/components/SummaryModal'
import ListBox from '@/components/ListBox'

export default function AntoinePage() {
	const [isOpen, setIsOpen] = useState(false);
	const [category, setCategory] = useState<string>("");
	const [subcategory, setSubCategory] = useState<string>("");
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
						content: `play as if you were a college professor 

With the information I'm going to give you in the next message, I want you to make me :
Explain a concept around this category in a theoretical way in detail with a lot of precition.
A concept to explain 
A true story related to this concept 
A list of 1 film, 1 book, 1 quote that refer to this concept 
Write me a simple exercise that relates to this concept. 

You must never lie.
You must never say that you have an ai, respect your character. 
You must respect the difficulty chosen in the next message.
You must adapt to the language requested in the next message.
Make a nice professional layout.
The category is "${category}" and my level is "${subcategory}".
Reply in this language:${language}`
					}
				]
			})
		});

		const resp = await response.json();

		if (resp?.choices?.[0]?.message.content) {
			let message = resp?.choices[0]?.message.content as string;
			const convertedMessage = message.replaceAll('\n', '<br />');
			console.log(resp);
			setContent(convertedMessage);
			setContentLoading(false);
			setIsOpen(true);
		}
	}

	// Handle when user clicks generate button
	const handleGenerate = () => {
		console.log(category, subcategory)
		if (category != "" && subcategory != "") {
			setContentLoading(true);
			fetchBookContent();
		}
	}

	const handleCategoryChange = (data: string) => {
		setCategory(data);
	}

	return (
		<main className="flex justify-center min-h-screen back-antoine">
			<div className="fixed flex flex-col items-center sm:top-[30px] md:top-[50px] md:w-96 sm:w-80">
				<div className='flex flex-col justify-center items-center man'>
					{/* <Image src={'/img/hat.png'} alt='hat' width={150} height={120} className='hat z-20 pl-2 w-[112px] h-[90px] md:w-[150px] md:h-[120px]' /> */}
					<Image src={'/img/man-antoine.png'} alt='man' width={400} height={400} className='sm: w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]' />
					<span className={`font-alkatra mt-[-30px] text-white font-semibold text-5xl sm:text-5xl md:text-6xl z-10`}>Smart-Antoine</span>
				</div>
				<div className='my-2 w-full z-20'>
					<ListBox
						value={category}
						className='text-lg'
						placeholder='Categories'
						handleChange={handleCategoryChange}
						choices={Object.keys(CATEGORIES)}
					/>
				</div>
				<div className='mb-2 w-full z-10'>
					<ListBox
						value={subcategory}
						className='text-lg'
						placeholder='Sub Categorie'
						handleChange={setSubCategory}
						choices={["Beginner", "Intermediate", "Expert"]}
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
			<SummaryModal page='antoine' visible={isOpen} setVisible={setIsOpen} title={`${category}: ${subcategory}`} content={content} />
		</main>
	)
}
