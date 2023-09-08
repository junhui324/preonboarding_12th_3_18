import React, { useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import handleInputChange from '../../utils/changeInput';
import SearchResults from '../../components/SearchResults/SearchResults';
import { getClinicalTrial } from '../../api/Api';
import { SearchWordType } from '../../types/SearchWord.interface';
import styles from './Main.module.scss';

export default function MainPage() {
	const [searchWord, setSearchWord] = useState('');
	const debouncedWord = useDebounce(searchWord, 500);
	const [recommendList, setRecommendList] = useState<SearchWordType[]>([]);
	const [showRecommendations, setShowRecommendations] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const resultRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const axiosSick = async () => {
			const data = await getClinicalTrial(debouncedWord);
			setRecommendList(data);
		};
		if (!debouncedWord) {
			return setRecommendList([]);
		}
		axiosSick();
	}, [debouncedWord]);

	useEffect(() => {
		resultRefs.current = Array(recommendList.length)
			.fill(null)
			.map((_, i) => resultRefs.current[i] || null);
	}, [recommendList]);

	useEffect(() => {
		if (focusedIndex >= 0 && focusedIndex < resultRefs.current.length) {
			resultRefs.current[focusedIndex]?.focus();
		}
	}, [focusedIndex]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (recommendList.length === 0) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (resultRefs.current[0]) {
				resultRefs.current[0].focus();
			}
			setFocusedIndex(0);
		}
	};

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.searchBar}>
					<input
						className={styles.input}
						value={searchWord}
						onChange={e => handleInputChange(e, setSearchWord, setRecommendList)}
						onKeyDown={e => handleKeyDown(e)}
						onFocus={() => setShowRecommendations(true)}
						onBlur={() => setShowRecommendations(false)}
						placeholder="검색어를 입력해주세요."
						ref={inputRef}
						autoFocus
					></input>
					<button className={styles.btn}>검색</button>
				</div>

				<SearchResults
					searchResults={recommendList}
					focusedIndex={focusedIndex}
					inputRef={inputRef}
					showRecommendations={showRecommendations}
					resultRefs={resultRefs}
					setFocusedIndex={setFocusedIndex}
					setInput={setSearchWord}
				/>
			</div>
		</div>
	);
}
