import Fetcher from 'utils/Fetcher';

export const fetcherGetMenuList = async (menuNo) => {
    const fetcher = new Fetcher().setUrl(`/getMenuList/${menuNo}`)
                                 .setMethod("GET")
    try {
        const result = fetcher.jsonFetch();
        return result;
    } catch (error) {
        console.error("menu Select Error!");
    }
};