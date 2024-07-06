app.put('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const changes = req.body;
  // Update user logic here
  await logUserAction(req.user._id, 'UPDATE_USER', `User:${userId}`, changes, req.ip);
  res.status(200).send('User updated');
});