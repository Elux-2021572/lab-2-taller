import Pet from "../pet/pet.model.js";
import Appointment from "../appointment/appointment.model.js";
import { parse } from "date-fns";

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;

    const isoDate = new Date(data.date);

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Fecha inválida",
      });
    }

    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        msg: "No se encontró la mascota" 
      });
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });

    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "El usuario y la mascota ya tienen una cita para este día",
      });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: `Cita creada exitosamente en fecha ${data.date}`,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      msg: "Error al crear la cita", 
      error 
    }); 
  }
};

export const getAppointment = async (req, res) => {
  try {
      const {uidUser} = req.body;
      const query = { user: uidUser };

      const [total, appointment] = await Promise.all([
          Appointment.countDocuments(query),
          Appointment.find(query).populate('pet').populate('user')  
      ]);

      return res.status(200).json({
          success: true,
          message: "Las citas fueron obtenidas exitosamente",
          total,
          appointment
      });

  } catch (err) {
      return res.status(500).json({
          success: false,
          message: "Hubo un problema al recuperar las citas",
          error: err
      });
  }
};

export const updateAppointment = async (req, res) => {
  try {
      const { uid } = req.params; 
      const data = req.body; 

      const appointment = await Appointment.findByIdAndUpdate(uid, data, { new: true }).populate("pet").populate("user");

      res.status(200).json({
          success: true,
          msg: "La cita ha sido actualizada exitosamente",
          appointment,
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          msg: "Se produjo un error al actualizar la cita",
          error: err.message
      });
  }
};


export const cancelAppointment = async(req,res) =>{
  try{
    const { uid } = req.params;
    
    const cancelAppointment = await Appointment.findByIdAndUpdate( uid, {status: "CANCELED"}, {new: true}).populate("pet").populate("user");

    res.status(200).json({
      success:true,
      msg: "La cita ha sido cancelada correctamente",
      cancelAppointment
    });
  }catch(err){
    res.status(500).json({
        success: false,
        msg: "Se ha producido un error al intentar cancelar la cita",
        error: err.message
    });
  }
};

