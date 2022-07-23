import { useEffect, useState, createRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setLoading } from '../features/loading';
import makeQuery from '../misc/makeQuery';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
const Character = () => {

    const params = useParams();
    const dispatch = useDispatch()
    const [onList,setOnList] = useState(null)

    const [character, setCharacter] = useState({
        id: 0, name: { userPreferred: "", alternative: [] }, description: "", image: { large: "" }, age: 0, bloodType: "", gender: "", dateOfBirth: {
            year: null,
            month: null,
            day: null
        }, media: { pageInfo: { hasNextPage: false }, nodes: [] }
    });

    useEffect(() => {
        const getCharacter = async () => {
            const query = `query getCharacterData($id: Int = 1, $page: Int = 1, $onList: Boolean) {
            Character(id: $id) {
              id
              name {
                userPreferred
                alternative
              }
              description
              image {
                large
              }
              age
              bloodType
              gender
              dateOfBirth {
                year
                month
                day
              }
              media(page: $page, onList: $onList) {
                pageInfo {
                  hasNextPage
                }
                nodes {
                    id
                  title {
                    userPreferred
                  }
                  coverImage{
                    large
                  }
                  episodes
                  mediaListEntry{
                    progress
                  }
                  airingSchedule {
                    edges {
                      node {
                        airingAt
                        timeUntilAiring
                        episode
                      }
                    }
                  }
                  startDate {
                    year
                    month
                    day
                  }
                }
              }
            }
          }          
        `;
            const variables = {
                id: params.id,
                page: 1,
                onList
            };

            let hasNextPage = true
            let _character = {};
            let accumalatedMedia = [];

            const getAiring = (media) => {
                const airingSchedule = media.airingSchedule;
                delete media.airingSchedule;
                const nextAiringIndex = airingSchedule.edges.findIndex(
                    (element) => element.node.timeUntilAiring > 0
                );
                media["nextAiring"] = airingSchedule.edges[nextAiringIndex];
                return media
            }

            while (hasNextPage) {
                const characterData = await makeQuery(query, variables);
                _character = characterData.data.Character
                document.title = `Haruhi - ${_character.name.userPreferred}`

                if (characterData.data.Character.media.nodes.length) {
                    variables["page"] = variables["page"] + 1
                    for (const media in characterData.data.Character.media.nodes) {
                        characterData.data.Character.media.nodes[media] = getAiring(characterData.data.Character.media.nodes[media])
                    }
                    accumalatedMedia = [...accumalatedMedia, ...characterData.data.Character.media.nodes]
                    setCharacter({ ..._character, media: { nodes: accumalatedMedia } })
                }
                else {
                    hasNextPage = false
                }
            }
            dispatch(setLoading(false));

        };
        getCharacter();
        //eslint-disable-next-line
    }, [onList])



    return (
        <div className='p-8'>
            <div className="flex justify-center">
                <LazyLoadImage
                    className='h-52'
                    src={character.image.large}
                    alt={`Character ${character.name.userPreferred}`} />
                <div className="flex flex-col p-4 justify-center">
                    <div className='text-3xl'>{character.name.userPreferred}</div>
                    <div className='text-lg'>{character.name.alternative.map((name) => (`| ${name} |`))}</div>
                </div>
            </div>
                <div className='text-md p-8' dangerouslySetInnerHTML={{ __html: character.description.replaceAll("\n", "<br />").replaceAll("~!", "<details><summary>Spoiler Click to Reveal</summary>").replaceAll("!~", "</details>") }}></div>
                <FormGroup className='p-8 ml-auto w-max'>
                  <FormControlLabel control={<Switch checked={onList} onClick={()=>{setOnList((state)=>(state ? null: true))}} />} label="On My List" />
                </FormGroup>
                <div className='flex flex-wrap gap-4'>
         
            {character.media.nodes.map((media)=>(<Link className='cardLink' to={`/anime/${media.id}`}><AnimeCard mediaTitle={media.title.userPreferred} mediaCover={media.coverImage.large} episodes={media.episodes} progress={media.mediaListEntry ? media.mediaListEntry.progress : null} nextAiringEpisode={media.nextAiring ? media.nextAiring.node.episode : 0} timeUntilAiring={media.nextAiring ? media.nextAiring.node.timeUntilAiring : 0}/></Link>))}
        </div>
        </div>
    )
}

export default Character