import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export const getAllTransaksi = async (req, res) => {
    try {
        const result = await prisma.transaksi.findMany({
            include: {
                user: {
                    select:{
                        nama_user: true
                    }
                },
                meja: {
                    select:{
                        nomor_meja: true
                    }
                },
                detail_transaksi:{
                    select:{
                        id_menu: true,
                        total_harga: true
                    }
                }
            }
        })

        const transaksiWithMenu = await Promise.all(
            result.map(async (transaksi) => {
                const detailTransaksiWithMenu = await Promise.all(
                    transaksi.detail_transaksi.map(async (detail) => {
                        const menu = await prisma.menu.findUnique({
                            where: {
                                id_menu: detail.id_menu
                            }
                        });
                        return {
                            ...detail,
                            nama_menu: menu ? menu.nama_menu : null // Tambahkan nama_menu ke setiap detail_transaksi
                        };
                    })
                );
    
                return {
                    ...transaksi, // Tambahkan semua data transaksi
                    detail_transaksi: detailTransaksiWithMenu// Ganti detail_transaksi dengan yang sudah ada nama_menu
                };
            })
        );

        res.status(200).json({
            data: transaksiWithMenu
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error.message})
    }
    
}
export const getTransaksiById = async (req, res) => {
    try {
        const result = await prisma.transaksi.findUnique({
            where:{
                id_transaksi : Number(req.params.id)
            } 
        })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error.message})
    }
}
export const addTransaksi = async (req, res) => {
    let {id_user, id_meja, id_menu, nama_pelanggan} = req.body

    const [getUserId, getMejaId, getMenuId] = await Promise.all([
        prisma.user.findUnique({ where: { id_user: Number(id_user) } }),
        prisma.meja.findUnique({ where: { id_meja: Number(id_meja) } }),
        prisma.menu.findUnique({ where: { id_menu: Number(id_menu) } })
    ]);
    if(getUserId && getMejaId && getMenuId){
        try { 
            const result = await prisma.transaksi.create({
                data:{
                    nama_pelanggan: nama_pelanggan,
                    user:{
                        connect:{
                            id_user: Number(id_user)
                        }
                    },
                    meja:{
                        connect:{
                            id_meja: Number(id_meja)
                        }
                    }
                }
            })
            if(result){
                const createDetail = await prisma.detail_Transaksi.create({
                    data:{
                        transaksi:{
                            connect:{
                                id_transaksi: result.id_transaksi,
                            }
                        },
                        menu :{
                            connect:{
                                id_menu: Number(id_menu)
                            }
                        },
                        total_harga: getMenuId.harga
                    }
                })
                res.status(200).json({
                    success: true,
                    transaksi: result,
                    detail: createDetail
                });
            }else{
                res.status(400).json({msg: "transaksi gagal"})
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({msg: error.message})
        }
    }else{
        res.json({msg: "pilih user, meja, dan menu yg tersedia"})
    }

}
export const updateTransaksi = async (req, res) => {
    let {id_user, id_meja, id_menu, nama_pelanggan} = req.body

    const [getUserId, getMejaId, getMenuId] = await Promise.all([
        prisma.user.findUnique({ where: { id_user: Number(id_user) } }),
        prisma.meja.findUnique({ where: { id_meja: Number(id_meja) } }),
        prisma.menu.findUnique({ where: { id_menu: Number(id_menu) } })
    ]);
    if(getUserId && getMejaId && getMenuId){
        try { 
            const result = await prisma.transaksi.update({
                data:{
                    nama_pelanggan: nama_pelanggan,
                    status: 'bayar',
                    user:{
                        connect:{
                            id_user: Number(id_user)
                        }
                    },
                    meja:{
                        connect:{
                            id_meja: Number(id_meja)
                        }
                    }
                }
            })
            if(result){
                const createDetail = await prisma.detail_Transaksi.update({
                    data:{
                        transaksi:{
                            connect:{
                                id_transaksi: result.id_transaksi,
                            }
                        },
                        menu :{
                            connect:{
                                id_menu: Number(id_menu)
                            }
                        },
                        total_harga: getMenuId.harga
                    }
                })
                res.status(200).json({
                    success: true,
                    transaksi: result,
                    detail: createDetail
                });
            }else{
                res.status(400).json({msg: "transaksi gagal"})
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({msg: error.message})
        }
    }else{
        res.json({msg: "pilih user, meja, dan menu yg tersedia"})
    }

}
export const deleteTransaksi = async (req, res) => {

}