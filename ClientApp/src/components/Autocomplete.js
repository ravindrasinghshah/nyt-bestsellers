import { useEffect, useState } from 'react';

export default function Autocomplete(props) {
    const books = props;
    console.log(books)
    // The active selection's index
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    // The suggestions that match the user's input
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    // Whether or not the suggestion list is shown
    const [showSuggestions, setShowSuggestions] = useState(false);
    // What the user has entered
    const [userInput, setUserInput] = useState('');

    const onChange = e => {
        const { suggestions } = books;
        const userInput = e.currentTarget.value;
         console.log(suggestions.history);

        var filteredMatches = [];
        suggestions.history.forEach(book => {
            if (book.title.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
                filteredMatches.push(book.title);
        });

        setActiveSuggestion(0);
        setFilteredSuggestions(filteredMatches);
        setUserInput(e.currentTarget.value);
        setShowSuggestions(true);
    };

    const onClick = e => {
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setUserInput(e.currentTarget.innerText);
        setShowSuggestions(false);
    };

    const onKeyDown = e => {
        // User pressed the enter key
        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setFilteredSuggestions([]);
            setUserInput(filteredSuggestions[activeSuggestion]);
            setShowSuggestions(false);
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestion(activeSuggestion + 1);
        }
    };


    let suggestionsListComponent;

    if (showSuggestions && userInput.length > 1) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul className="m-2">
                    {filteredSuggestions.map((suggestion, index) => {
                        let className = style.suggestions;
                        // Flag the active suggestion with a class
                        if (index === activeSuggestion) {
                            className += style.activeSuggestion;
                        }

                        return (
                            <li className={className} key={index} value={suggestion} onClick={onClick}>
                                {suggestion}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            suggestionsListComponent = (
                <div className={style.noSuggestions}>
                    <em>No suggestions, you're on your own!</em>
                </div>
            );
        }
    }

    return (
        <>
            <div className={style.wrapper}>
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    className={style.input}
                    placeholder="For e.g. Education, Fiction etc."
                />
                {suggestionsListComponent}
            </div>
        </>
    );

}


const style = {
    wrapper: `bg-white border h-[200]`,
    input: `w-full rounded-sm h-10 py-1 px-2`,
    suggestions: `p-2 hover:bg-gray-200 cursor-pointer`,
    activeSuggestion: ` bg-gray-300`,
    noSuggestions: `mx-2 py-2`
}