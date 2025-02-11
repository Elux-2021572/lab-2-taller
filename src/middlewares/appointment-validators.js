import { body, check } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const createAppointmentValidator = [
    body("date").notEmpty().withMessage("La fecha es requerida"),
    body("pet").notEmpty().withMessage("La mascota es requerida"),
    body("pet").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

export const getAppointmentValidator = [
    body("uidUser").notEmpty().withMessage("El ID del usuario es requerido"),
    body("uidUser").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]

export const updateAppointmentValidator = [
    check("uid").notEmpty().isMongoId().withMessage("El ID de la cita es requerido"),
    check("pet").notEmpty().isMongoId().withMessage("El ID de la mascota es requerido"),
    check("user").notEmpty().isMongoId().withMessage("El ID del usuario es requerido"),
    validarCampos,
    handleErrors

]

export const cancelAppointmentValidator = [
    check("uid").notEmpty().isMongoId().withMessage("El ID de la cita es requerido"),
    validarCampos,
    handleErrors
]