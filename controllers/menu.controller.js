import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllMenu = async (req, res) => {
  try {
    const result = await prisma.menu.findMany();
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

export const getMenuById = async (req, res) => {
  try {
    const result = await prisma.menu.findUnique({
      where: {
        id_menu: req.params.id,
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

export const addMenu = async (req, res) => {
  try {
    const { nama_menu, deskripsi, jenis,harga} = req.body;
    const {fileName} = req.file
    const result = await prisma.menu.create({
      data: {
        nama_menu: nama_menu,
        deskripsi: deskripsi,
        jenis: jenis,
        harga: Number(harga),
        gambar: fileName
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

export const updateMenu = async (req, res) => {
  try {
    const { nama_menu,deskripsi,harga, jenis} = req.body;
    const result = await prisma.menu.update({
      where: {
        id_menu: req.params.id,
      },
      data: {
        nama_menu: nama_menu,
        deskripsi: deskripsi,
        jenis : jenis,
        harga: Number(harga)
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

export const deleteMenu = async (req, res) => {
  try {
    const result = await prisma.menu.delete({
      where: {
        id_menu: Number(req.params.id),
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
