import Fetcher from 'utils/Fetcher';

export const fetcherGetTreeMenuList = async (data) => {
      const fetcher = new Fetcher().setUrl("/admin/menuMng/getTreeMenuList")
                                   .setMethod("GET");
      try {
        const result = await fetcher.jsonFetch();
        return result;
      } catch (error) {
        console.error('treeMenuSelect Error:', error);
      }
};

export const fetcherSaveTreeMenuList = async (data) => {
  const fetcher = new Fetcher().setUrl("/admin/menuMng/saveTreeMenuList")
                               .setMethod("POST")
                               .setData(data);

  try {
    const result = fetcher.jsonFetch();
    return result;
  } catch (error) {
    console.error('treeNodeSave Error:', error);
  }
}