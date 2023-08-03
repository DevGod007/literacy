"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image'

import { OPENAI_API_KEY } from '@/lib/consts'

import SummaryModal from '@/components/SummaryModal'
import ListBox from '@/components/ListBox'

import Cartoons from '@/lib/json/cartoons.json';
import Characters from '@/lib/json/characters.json';
import Landscapes from '@/lib/json/landscapes.json';
import Paintings from '@/lib/json/paintings.json';
import NijiAnime from '@/lib/json/nijiAnime.json';
import V4Anime from '@/lib/json/v4anime.json';
import Scifi from '@/lib/json/sci-fi.json';
import Creatures from '@/lib/json/creatures.json';
import Misc from '@/lib/json/misc.json';

export default function GabinPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [description, setDescription] = useState<string>("");
	const [dimension, setDimension] = useState<string>("");
	const [stylise, setStylise] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>('');
	const [curCategory, setCurCategory] = useState<{data: {}}>({data: {}});
	const [artist, setArtist] = useState<string>("");
	const [artists, setArtists] = useState<string[]>([]);
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
						content: `act like you are a prompt engineer

						I want you to give me a prompt with the information I'll give you about the image in the next message.
						
						I want you to follow the instructions perfectly
						I want you to do the prompt for an AI, so use only the most useful keywords.
						Use the following commands to make the prompt
						Use (--ar and the resolution you can choose from (11 , 32 , 54 , 74 , 47 , 23 , 45 , 916 ) I'll give an example --ar 916 . do you again at the next post
						To write the desired artist use By and an the name of artist example Alien by picasso. 
						Add commas to separate is very important 
						You need to start with the subject, then the artist and then the commission.
						Always put , --stylise and the number requested in the next message
						You must always use this prompt structure  
						A surreal portrait of a woman with a melting face by Salvador Dali, --ar 11 --stylise 1 
						Do not put commas between the commands --ar and --stylise.
						
						Respects the style and artist requested 
						You must give me just one short sentence 
						You must never explain 
						Just give me the prompt
						Don't ask for the parameters to move forward, just make the choices you need to make
						You must always make the conversion between the next message and --ar
						The prompt must always be in English 
						You don't have to specify the prompt request, just make the conversion 
						
						IT'S SO YOU CAN BE MY PERSONAL PROMPT GENERATOR

						Here are the informations.
						artist: ${artist}
						style: ${category}
						stylise: ${stylise}
						resolution: ${dimension}
						`
					}
				]
			})
		});

		const resp = await response.json();

		console.log(resp);

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
		if (description != "" && dimension != "" && stylise != "" && category != "" && artist != "") {
			setContentLoading(true);
			fetchBookContent();
		}
	}

	const handleDescriptionChange = (value: string) => {
		setDescription(value);
	}

	const handleCategoryChange = (value: string) => {
		setCategory(value);
		setArtist("");
		
		let currentCategory : {data: {}} = {data: {}};

		switch (value) {
		case 'Characters':
			currentCategory = Characters;
			break;
		case 'LandScapes':
			currentCategory = Landscapes;
			break;
		case 'Cartoons, Comics':
			currentCategory = Cartoons;
			break;
		case 'Paintings':
			currentCategory = Paintings;
			break;
		case 'Niji Anime, Anthro':
			currentCategory = NijiAnime;
			break;
		case 'V4 Anime, Anthro':
			currentCategory = V4Anime;
			break;
		case 'Sci-fi':
			currentCategory = Scifi;
			break;
		case 'Creatures':
			currentCategory = Creatures;
			break;
		case 'Misc':
			currentCategory = Misc;
			break;
		}

		setCurCategory(currentCategory);
		
		setImageUrl("");
		setArtists(Object.keys(currentCategory.data));
	}
	
	const handleArtistChange = (value: string) => {
		setArtist(value);
		setImageUrl(Object(curCategory.data)[value]);

		console.log(Object(curCategory.data)[value]);
	}

	return (
		<main className="flex justify-center min-h-screen back-picasso">
			<div className='absolute flex justify-end items-center w-full h-full'>
				<div className='relative hidden lg:flex justify-center w-[25%] me-10'>
					<Image
						src={'/img/frame.png'}
						width={300}
						height={556}
						alt='frame'
						className={`w-full h-auto`}
					/>
					{
						imageUrl != "" && 
						<Image
							src={`${imageUrl}`}
							className={`absolute w-[72%] top-[10%] h-[82%]`}
							width={300}
							height={556}
							alt='image'
						/>
					}
				</div>
			</div>

			<div className="fixed flex flex-col items-center sm:top-[30px] md:top-[80px] md:w-96 sm:w-80">
				<div className='flex flex-col justify-center items-center man-picasso'>
					<Image src={'/img/man-picasso.png'} alt='man' width={400} height={400} className='sm: w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] mt-[-55px] md:mt-[-70px]' />
					<span className={`font-alkatra mt-[-30px] text-white font-semibold text-5xl sm:text-5xl md:text-6xl z-10`}>Smart Picasso</span>
				</div>
				<div className='my-3 mb-0 w-full'>
					<textarea
						className='w-full cursor-default overflow-hidden rounded-lg border-2 border-[#ffffff80] bg-[#ffffff30] text-center text-lg shadow-md focus:outline-none px-8 py-4 backdrop-blur-md leading-5 text-[#dddddd] outline-none focus:ring-0 placeholder-[#dddddd]'
						value={description}
						rows={2}
						placeholder='Give me a description off what you want'
						onChange={(event) => handleDescriptionChange(event.target.value)}
					/>
				</div>

				<div className='flex w-full justify-center mb-3'>
					<div className='w-1/2 pr-2'>
						<ListBox
							choices={[
								"1:1",
								"3:2",
								"5:4",
								"7:4",
								"4:7",
								"2:3",
								"4:5",
								"9:16"
							]}
							value={dimension}
							placeholder='Dimension'
							className='w-full text-lg z-30'
							handleChange={setDimension}
						/>
					</div>
					<div className='w-1/2 pl-2'>
						<ListBox
							choices={["100","200","300","400","500","600","700","800","900","1000"]}
							value={stylise}
							placeholder='Stylise'
							className='w-full text-lg z-30'
							handleChange={setStylise}
						/>
					</div>
				</div>
				
				<div className='flex justify-center w-full mb-3'>
					<ListBox
						choices={[
							'Characters',
							'LandScapes',
							'Cartoons, Comics',
							'Paintings',
							'Niji Anime, Anthro',
							'V4 Anime, Anthro',
							'Sci-fi',
							'Creatures',
							'Misc'
						]}
						value={category}
						placeholder='Category'
						className='w-full text-lg z-20'
						handleChange={handleCategoryChange}
					/>
				</div>

				<div className='flex justify-center w-full mb-3'>
					<ListBox
						choices={artists}
						value={artist}
						placeholder='Artist'
						className='w-full text-lg'
						handleChange={handleArtistChange}
					/>
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
			<SummaryModal page='picasso' visible={isOpen} setVisible={setIsOpen} title={`Summary: ${description}`} content={content} />
		</main>
	)
}
