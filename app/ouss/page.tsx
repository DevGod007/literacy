"use client"

import { useState } from 'react'
import Image from 'next/image'

import { OPENAI_API_KEY } from '@/lib/consts'

import LanguageBox from '@/components/LanguageBox'
import SummaryModal from '@/components/SummaryModal'

export default function OussPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [book, setBook] = useState<string>("");
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
						content: `I want you to play the role of a book reviewer

Start with a clear introduction, introducing the book's title, author and literary genre.
In the following paragraphs, summarize the book's plot concisely. Avoid superfluous details and concentrate on the key events that drive the story forward. Be sure to include the beginning, plot development and conclusion.
Identify the book's main characters and give a brief description of each. Mention their important character traits and their role in the story.
Add a list of minimum 5  key takeaway an explaint it  in detail. provide exercises to practice mastering concepts
I want you to put some tips on how to use these keys in your personal life.provide exercises to practice mastering concepts
Take the one big idea of the book an explain all about , the concept , the tips to improve, ect ...
3 most importante sentence in the book ( idea , tips )

You must never lie
I want you to start your response by getting to the heart of the matter. 
I don't want you to write before I give you the name of the book.
You must respect the language requested after the book title.
Don't apologize for being a "I just wrote what I asked you to." 
Create a professional layout
You must respect the language requested after the book title.

This review is for people who don't have time to read the book, but who, by reading this text, should understand all the concepts the author brings to us.

Add the sentence "Reading a summary will never replace the pleasure of reading a complete work".
The book title is ${book}
Reply in this language:${language}`
					}
				]
			})
		});

		const resp = await response.json();

		if (resp?.choices[0]?.message.content) {
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
		if (book != "") {
			setContentLoading(true);
			fetchBookContent();
		}
	}

	const handleBookChange = (title: string) => {
		setBook(title);
	}

	return (
		<main className="flex justify-center min-h-screen back-ouss">
			{/* <Header /> */}
			<div className="fixed flex flex-col items-center sm:top-[30px] md:top-[80px] md:w-96 sm:w-80">
				<div className='flex flex-col justify-center items-center man-ouss'>
					<Image src={'/img/hat.png'} alt='hat' width={150} height={120} className='hat z-20 pl-2 w-[112px] h-[90px] md:w-[150px] md:h-[120px]' />
					<Image src={'/img/man-ouss.png'} alt='man' width={400} height={400} className='sm: w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] mt-[-55px] md:mt-[-70px]' />
					<span className={`font-alkatra mt-[-30px] text-white font-semibold text-5xl sm:text-5xl md:text-6xl z-10`}>Smart-Ouss</span>
				</div>
				<div className='my-3 w-full'>
					<input
						className='w-full cursor-default overflow-hidden rounded-full border-2 border-[#ffffff80] bg-[#ffffff30] text-center text-xl shadow-md focus:outline-none px-8 py-4 backdrop-blur-[6px] leading-5 text-[#dddddd] outline-none focus:ring-0'
						value={book}
						placeholder='NAME OF THE BOOK'
						onChange={(event) => handleBookChange(event.target.value)}
					/>
				</div>

				<div className='flex justify-center w-52 mb-12'>
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
			<SummaryModal page='ouss' visible={isOpen} setVisible={setIsOpen} title={`Summary ${book}`} content={content} />
		</main>
	)
}
