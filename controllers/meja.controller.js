import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllMeja = async (req, res) => {
  try {
    const result = await prisma.meja.findMany();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: message.error,
    });
  }
};

export const getMejaById = async (req, res) => {
  try {
    const result = await prisma.meja.findUnique({
      where: {
        id_meja: Number(req.params.id),
      },
    });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: message.error,
    });
  }
};

export const addMeja = async (req, res) => {
  try {
    const { nomor_meja } = req.body;
    const result = await prisma.meja.create({
      data: {
        nomor_meja : nomor_meja,
      },
    });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: message.error,
    });
  }
};

export const updateMeja = async (req, res) => {
  try {
    const {nomor_meja } = req.body;
    const result = await prisma.meja.update({
      where: {
        id_meja: Number(req.params.id),
      },
      data: {
        nomor_meja : nomor_meja
      },
    });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: message.error,
    });
  }
};

export const deleteMeja = async (req, res) => {
  try {
    const result = await prisma.meja.delete({
      where: {
        id_meja: Number(req.params.id),
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
