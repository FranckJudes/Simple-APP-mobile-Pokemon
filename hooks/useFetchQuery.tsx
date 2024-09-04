import {useInfiniteQuery, useQuery } from '@tanstack/react-query';


const endpoint = "https://pokeapi.co/api/v2"
export default function useFetchQuery(path:string) {
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            await wait(1);
            return fetch(endpoint + path)
                                        .then(r => r.json())
        }
    })
}

export function useInfiniteFetchQuery(path:String) {
    return useInfiniteQuery({
        queryKey : [path],
        initialPageParam: endpoint + path,
        queryFn: async ({pageParam}) => {
            await wait(1)
            return fetch(pageParam,{
                headers:{
                    accept: 'application/json'
                }
            }).then(r => r.json())
        },
        getNextPageParam : (lastpage) => {

            if ("next" in lastpage) {

                return lastpage.next
            }
            return null
        }

    }) 
}


function wait (duration:number){
    return new Promise (resolve => setTimeout(resolve, duration * 1000));
}