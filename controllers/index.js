const getData = (req, res) => {
  const data = {
    message: 'Hello from CSE341!',
    course: 'Web Services',
    lesson: 1,
    author: 'Enoch'
  };
  
  res.json(data);
};

module.exports = { getData };