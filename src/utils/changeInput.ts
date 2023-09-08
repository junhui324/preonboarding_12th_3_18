import React from 'react';
import { SearchWordType } from '../types/SearchWord.interface';

export default function handleInputChange(
	e: React.ChangeEvent<HTMLInputElement>,
	setInput: React.Dispatch<React.SetStateAction<string>>,
	setSearchResults: React.Dispatch<React.SetStateAction<SearchWordType[]>>,
) {
	const inputValue = e.target.value;
	setInput(inputValue);
	if (!inputValue) {
		setSearchResults([]);
	}
}
