const filterHelper = ({ router, gender }) => {
  const path = router.pathname;
  const query = router.query;

  if (gender) query.gender = gender;

  router.push({
    pathname: path,
    query: query,
  });
};

export default filterHelper;
