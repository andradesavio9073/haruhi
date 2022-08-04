import React, { useEffect, useState } from 'react'
import makeQuery from '../misc/makeQuery';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
const SearchStudio = ({ searchString, setDialogOpen, setSearchQuery }) => {
    const [searchResults, setSearchResults] = useState({ "studios": [] })

    useEffect(() => {
        const search = async () => {
            const query = `query Search($searchString: String) {
              Page(perPage:6) {
                studios(search: $searchString, sort:[SEARCH_MATCH]){
                  id
                  name
                }
              }
            }`;
            const variables = {
                searchString
            };
            const data = await makeQuery(query, variables);
            setSearchResults(data.data.Page)
        }
        search()

    }, [searchString])
    return (
        <>
    {searchResults.studios.length ? <div className='bg-offWhite-500'>
        <div className='text-lg px-4'>Studios</div>
        <ul className="flex flex-col gap-4 justify-center p-4">
            {searchResults.studios.map((studio) => (<Link to={`/studio/${studio.id}`} key={studio.id} onClick={() => { setDialogOpen(false); setSearchQuery("") }}><li className=' w-auto h-16'><ButtonBase sx={{ justifyContent: "flex-start" }} className='flex text-sm sm:text-md gap-4 w-full h-full bg-offWhite-600'><div className=''>{studio.name}</div></ButtonBase></li></Link>))}
        </ul>
    </div> : <></>}
    </>
    )
}

export default SearchStudio