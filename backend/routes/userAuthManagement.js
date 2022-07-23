import User from '../models/User';
export const register = async (req, res) => {
  const user = new User(req.body);
  try {
    user.setPassword(req.body.password);
    await user.save();
    const token = await user.generateJWT();
    res.status(201).send({ user, message: 'User created successfully', token });
  } catch (error) {
    res.status(400).send(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = await user.generateJWT();
    res.set('Authorization', `Token ${token}`);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).send();
  }
};
