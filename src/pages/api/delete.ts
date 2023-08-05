import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../prisma/client"


export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    if (req.method === "POST") {
        console.log("req is: ", req.body)
        
            try {
                
                const response = await prisma.accolade.findUnique({
                where: {
                    id: req.body
                }})
                res.status(200).json({response})

                const {id, name, institution, outcome, extSource, intSource, messaging, frequency, notifDate, 
                cmcontact, sourceatr, wherepubint, promotionlim,comments, imgurl1, imgurl2,imgurl3,imgurl4} = response

                
                await prisma.accoladeBackup.create({
                    data: {
                        institution, name, comments, outcome, extSource,
                        intSource, messaging, frequency, notifDate, cmcontact,
                        sourceatr, wherepubint, promotionlim, imgurl1, imgurl2,
                        imgurl3, imgurl4
                }})

                await prisma.accolade.delete({
                    where: {
                        id: id
                }})

            } catch {
                res.status(500).json({message: 'error in findUnique'})        
            }

    }}
