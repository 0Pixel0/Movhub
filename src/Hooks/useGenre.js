const useGenre = (selGenres) => {
  if (selGenres.length < 1) {
    return "";
  }
  const selGenresId = selGenres.map((g) => g.id);
  return selGenresId.reduce((acc,cur)=>{return acc+','+cur});
};

export default useGenre;