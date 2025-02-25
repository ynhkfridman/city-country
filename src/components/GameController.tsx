import { useEffect, useState } from "react";
import { Card as CardComponent } from "./Card";


export type DeckItem =
    | {
        index: number;
        country: string;
        type: string;
        capital?: never;
        clicked: boolean;
    }
    | {
        index: number;
        capital?: string;
        type: string;
        country?: never;
        clicked: boolean;
    };



export const GameController: React.FC<{}> = () => {
    const [deck, setDeck] = useState<DeckItem[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("start");
        const fetchData = async () => {
            try {
                let response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital");
                console.log(response);
                let data = await response.json();
                console.log(data);
                let deckCountries = data.sort(() => 0.5 - Math.random()).slice(0, 10).flatMap((counrty: any, i: number) => {
                    let countryCard = { index: i , country: counrty.name.common, type: 'country', clicked: false };
                    let capitalCard = { index: i , capital: counrty.capital?.[0], type: 'capital', clicked: false };
                    return [countryCard, capitalCard];
                }
                );
                console.log(deckCountries);

                setDeck(shuffleDeac(deckCountries));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

        }
        fetchData();
    }, []);

    const shuffleDeac = (currDeck: DeckItem[]) => {
        currDeck = currDeck.sort(() => 0.5 - Math.random());
        return currDeck;
    }
    const matchPair = (index: number) => {
        setDeck((prevDeck) =>
            prevDeck.map((item) =>
                ({ ...item, clicked: item.index === index })
            )
        );
    };

    return <>
        {loading ? (<h1>loading</h1>) : (
            <div>
                {deck.map((item, index) => (<CardComponent key={index + item.type} {...item} matchPair={() => matchPair(item.index)}/>))}
            </div>
        )
        }
    </>
}

// 