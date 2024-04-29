import House from "../models/House";
import User from "../models/User";


class HouseController{

  async store(req, res){
    const {filename} = req.file;
    const {description, location, price, status} = req.body;
    const { user_id } = req.headers;
    
    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status
    })

    return res.json(house);
  }

  async index(req, res){
    const {status} = req.query;

    const houses = await House.find({status});

    return res.json(houses);
  }

  async update(req, res){
    const {filename} = req.file;
    const {house_id} = req.params;
    const {description, location, price, status} = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if(String(user._id) !== String(houses.user)){
      return res.status(401).json({error: "Não autorizado."});
    }

    await House.updateOne({_id: house_id}, {
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status
    })

    return res.send();
  }

  async delete(req, res){
    const {house_id} = req.body;
    const {user_id} = req.headers;

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if(String(user._id) !== String(houses.user)){
      return res.status(401).json({error: "Não autorizado."});
    }

    await House.findByIdAndDelete({_id: house_id});

    return res.json({message: "Excluído com sucesso."});
  }
}

export default new HouseController(); 